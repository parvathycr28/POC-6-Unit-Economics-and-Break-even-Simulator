from .models import Scenario


def simulate(scenario: Scenario) -> dict:
    contribution_per_unit = (
        scenario.price -
        scenario.variable_cost
    )

    revenue = (
        scenario.units *
        scenario.price
    )

    variable_cost_total = (
        scenario.units *
        scenario.variable_cost
    )

    contribution = (
        scenario.units *
        contribution_per_unit
    )

    contribution_margin_percent = (
        contribution_per_unit /
        scenario.price *
        100
        if scenario.price > 0
        else 0
    )

    if contribution_per_unit > 0:
        break_even_units = (
            scenario.fixed_cost /
            contribution_per_unit
        )
    else:
        break_even_units = None

    if break_even_units is not None:
        break_even_revenue = (
            break_even_units *
            scenario.price
        )
    else:
        break_even_revenue = None

    operating_profit = (
        contribution -
        scenario.fixed_cost
    )

    if break_even_units is not None:
        safety_units = (
            scenario.units -
            break_even_units
        )
    else:
        safety_units = None

    if (
        break_even_units is not None
        and scenario.units > 0
    ):
        safety_margin_percent = (
            (
                scenario.units -
                break_even_units
            )
            /
            scenario.units
            *
            100
        )
    else:
        safety_margin_percent = None

    ltv = (
        scenario.monthly_revenue *
        scenario.gross_margin_percent *
        scenario.retention_months
    )

    if scenario.cac > 0:
        ltv_cac_ratio = (
            ltv /
            scenario.cac
        )
    else:
        ltv_cac_ratio = None

    return {
        "data_status": "synthetic",

        "revenue": revenue,

        "variable_cost_total":
            variable_cost_total,

        "contribution":
            contribution,

        "contribution_per_unit":
            contribution_per_unit,

        "contribution_margin_percent":
            contribution_margin_percent,

        "fixed_cost":
            scenario.fixed_cost,

        "operating_profit":
            operating_profit,

        "break_even_units":
            break_even_units,

        "break_even_revenue":
            break_even_revenue,

        "safety_units":
            safety_units,

        "safety_margin_percent":
            safety_margin_percent,

        "ltv":
            ltv,

        "cac":
            scenario.cac,

        "ltv_cac_ratio":
            ltv_cac_ratio
    }