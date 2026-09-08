from pydantic import BaseModel, Field


class Scenario(BaseModel):
    product: str = "Core Platform"

    price: float = Field(
        default=2500,
        ge=0
    )

    variable_cost: float = Field(
        default=850,
        ge=0
    )

    fixed_cost: float = Field(
        default=4200000,
        ge=0
    )

    units: float = Field(
        default=18200,
        ge=0
    )

    cac: float = Field(
        default=780,
        ge=0
    )

    monthly_revenue: float = Field(
        default=2500,
        ge=0
    )

    gross_margin_percent: float = Field(
        default=0.66,
        ge=0,
        le=1
    )

    retention_months: float = Field(
        default=24,
        ge=0
    )


class SimulationResponse(BaseModel):
    data_status: str

    revenue: float

    variable_cost_total: float

    contribution: float

    contribution_per_unit: float

    contribution_margin_percent: float

    fixed_cost: float

    operating_profit: float

    break_even_units: float | None

    break_even_revenue: float | None

    safety_units: float | None

    safety_margin_percent: float | None

    ltv: float

    cac: float

    ltv_cac_ratio: float | None