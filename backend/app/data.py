from pathlib import Path

import pandas as pd


BASE_DIR = Path(
    __file__
).resolve().parents[2]

DATA_DIR = (
    BASE_DIR.parent /
    "data"
)


def read_products() -> pd.DataFrame:
    return pd.read_csv(
        DATA_DIR /
        "products.csv"
    )


def read_customers() -> pd.DataFrame:
    return pd.read_csv(
        DATA_DIR /
        "customers.csv"
    )


def read_costs() -> pd.DataFrame:
    return pd.read_csv(
        DATA_DIR /
        "costs.csv"
    )