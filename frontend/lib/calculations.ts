import {
  Scenario,
  SimulationResult
} from "./types";

export function calculateSimulation(
  scenario: Scenario
): SimulationResult {
  const price = Math.max(0, scenario.price);

  const variableCost = Math.max(
    0,
    scenario.variableCost
  );

  const fixedCost = Math.max(
    0,
    scenario.fixedCost
  );

  const units = Math.max(
    0,
    scenario.units
  );

  const cac = Math.max(
    0,
    scenario.cac
  );

  const monthlyRevenue = Math.max(
    0,
    scenario.monthlyRevenue
  );

  const retentionMonths = Math.max(
    0,
    scenario.retentionMonths
  );

  const grossMarginPercent = Math.max(
    0,
    Math.min(1, scenario.grossMarginPercent)
  );

  const contributionPerUnit =
    price - variableCost;

  const revenue =
    units * price;

  const variableCostTotal =
    units * variableCost;

  const contribution =
    units * contributionPerUnit;

  const contributionMarginPercent =
    price > 0
      ? (contributionPerUnit / price) * 100
      : 0;

  const breakEvenUnits =
    contributionPerUnit > 0
      ? fixedCost / contributionPerUnit
      : null;

  const breakEvenRevenue =
    breakEvenUnits !== null
      ? breakEvenUnits * price
      : null;

  const operatingProfit =
    contribution - fixedCost;

  const safetyUnits =
    breakEvenUnits !== null
      ? units - breakEvenUnits
      : null;

  const safetyMarginPercent =
    breakEvenUnits !== null && units > 0
      ? ((units - breakEvenUnits) / units) * 100
      : null;

  const ltv =
    monthlyRevenue *
    grossMarginPercent *
    retentionMonths;

  const ltvCacRatio =
    cac > 0
      ? ltv / cac
      : null;

  return {
    revenue,

    variableCostTotal,

    contribution,

    contributionPerUnit,

    contributionMarginPercent,

    fixedCost,

    operatingProfit,

    breakEvenUnits,

    breakEvenRevenue,

    safetyUnits,

    safetyMarginPercent,

    ltv,

    cac,

    ltvCacRatio
  };
}

export type SensitivityResult = {
  label: string;

  key: keyof Scenario;

  impact: number;

  positiveDirection: boolean;
};

export function calculateSensitivity(
  scenario: Scenario
): SensitivityResult[] {
  const drivers: Array<{
    label: string;
    key: keyof Scenario;
  }> = [
    {
      label: "Price",
      key: "price"
    },
    {
      label: "Variable cost",
      key: "variableCost"
    },
    {
      label: "Fixed cost",
      key: "fixedCost"
    },
    {
      label: "CAC",
      key: "cac"
    },
    {
      label: "Retention",
      key: "retentionMonths"
    }
  ];

  return drivers
    .map((driver) => {
      const baseValue =
        Number(scenario[driver.key]);

      const increaseScenario = {
        ...scenario,
        [driver.key]:
          baseValue * 1.1
      };

      const decreaseScenario = {
        ...scenario,
        [driver.key]:
          baseValue * 0.9
      };

      const increaseProfit =
        calculateSimulation(
          increaseScenario
        ).operatingProfit;

      const decreaseProfit =
        calculateSimulation(
          decreaseScenario
        ).operatingProfit;

      return {
        label: driver.label,

        key: driver.key,

        impact:
          Math.abs(
            increaseProfit -
              decreaseProfit
          ) / 2,

        positiveDirection:
          increaseProfit >=
          decreaseProfit
      };
    })
    .sort(
      (a, b) =>
        b.impact - a.impact
    );
}