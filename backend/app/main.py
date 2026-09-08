import os

import httpx

from dotenv import load_dotenv

from fastapi import (
    FastAPI,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from .calculations import simulate

from .data import (
    read_costs,
    read_customers,
    read_products
)

from .models import (
    Scenario,
    SimulationResponse
)


load_dotenv()


app = FastAPI(
    title=(
        "Unit Economics & "
        "Break-Even Simulator"
    ),

    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


FRED_API_KEY = os.getenv(
    "FRED_API_KEY"
)

FRED_SERIES = os.getenv(
    "FRED_SERIES",
    "CPIAUCSL"
)

WORLD_BANK_COUNTRY = os.getenv(
    "WORLD_BANK_COUNTRY",
    "IND"
)


@app.get("/")
def health():
    return {
        "status": "ok",

        "application":
            "Unit Economics & "
            "Break-Even Simulator",

        "data_status":
            "synthetic"
    }


@app.get("/api/data")
def data_summary():
    return {
        "data_status":
            "synthetic",

        "products":
            read_products()
            .to_dict(
                orient="records"
            ),

        "customers":
            read_customers()
            .to_dict(
                orient="records"
            ),

        "costs":
            read_costs()
            .to_dict(
                orient="records"
            )
    }


@app.post(
    "/api/simulate",
    response_model=SimulationResponse
)
def simulate_scenario(
    scenario: Scenario
):
    if (
        scenario.variable_cost
        >= scenario.price
    ):
        raise HTTPException(
            status_code=400,

            detail=(
                "Variable cost must "
                "be lower than price "
                "to produce positive "
                "contribution."
            )
        )

    if scenario.cac <= 0:
        raise HTTPException(
            status_code=400,

            detail=(
                "CAC must be greater "
                "than zero."
            )
        )

    return simulate(
        scenario
    )


@app.get(
    "/api/context/world-bank"
)
async def world_bank_context():
    url = (
        "https://api.worldbank.org/"
        f"v2/country/"
        f"{WORLD_BANK_COUNTRY}/"
        "indicator/NY.GDP.MKTP.CD"
        "?format=json"
        "&per_page=1"
    )

    try:
        async with httpx.AsyncClient(
            timeout=15
        ) as client:
            response = await client.get(
                url
            )

            response.raise_for_status()

            payload = response.json()

        return {
            "source":
                "World Bank Indicators",

            "country":
                WORLD_BANK_COUNTRY,

            "payload":
                payload
        }

    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,

            detail=(
                "World Bank request "
                f"failed: {exc}"
            )
        ) from exc


@app.get(
    "/api/context/fred"
)
async def fred_context():
    if not FRED_API_KEY:
        return {
            "source": "FRED",

            "status":
                "not_configured",

            "message": (
                "Set FRED_API_KEY in "
                "backend/.env to enable "
                "live FRED context."
            )
        }

    url = (
        "https://api.stlouisfed.org/"
        "fred/series/observations"
    )

    params = {
        "series_id":
            FRED_SERIES,

        "api_key":
            FRED_API_KEY,

        "file_type":
            "json",

        "sort_order":
            "desc",

        "limit":
            1
    }

    try:
        async with httpx.AsyncClient(
            timeout=15
        ) as client:
            response = await client.get(
                url,
                params=params
            )

            response.raise_for_status()

            payload = response.json()

        return {
            "source": "FRED",

            "series":
                FRED_SERIES,

            "payload":
                payload
        }

    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,

            detail=(
                "FRED request "
                f"failed: {exc}"
            )
        ) from exc