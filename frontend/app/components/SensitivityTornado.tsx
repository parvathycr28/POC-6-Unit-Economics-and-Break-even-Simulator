"use client";

import { Scenario, SimulationResult } from "@/lib/types";

function money(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.abs(value));
}

export default function SensitivityTornado({
  scenario,
  simulation,
  onClick,
}: {
  scenario: Scenario;
  simulation: SimulationResult;
  onClick: () => void;
}) {
  /*
   * Sensitivity is expressed as the change in operating
   * profit when each driver is stressed by +10%.
   *
   * These are kept separate from the main simulation so
   * the existing calculation engine is untouched.
   */

  const priceImpact =
    scenario.units *
    scenario.price *
    0.10;

  const variableCostImpact =
    scenario.units *
    scenario.variableCost *
    0.10;

  const fixedCostImpact =
    scenario.fixedCost *
    0.10;

  /*
   * CAC and retention are customer-economic drivers.
   * They are displayed as directional risk indicators
   * rather than altering the operating-profit calculation.
   */
  const cacImpact =
    scenario.cac *
    scenario.units *
    0.10 *
    0.6;

  const retentionImpact =
    simulation.ltv !== null
      ? simulation.ltv * 0.10 * 0.25
      : 0;

  const drivers = [
    {
      number: "01",
      label: "Price",
      stress: "+10%",
      impact: priceImpact,
      positive: true,
    },
    {
      number: "02",
      label: "Variable cost",
      stress: "+10%",
      impact: variableCostImpact,
      positive: false,
    },
    {
      number: "03",
      label: "Fixed cost",
      stress: "+10%",
      impact: fixedCostImpact,
      positive: false,
    },
    {
      number: "04",
      label: "CAC",
      stress: "+10%",
      impact: cacImpact,
      positive: false,
    },
    {
      number: "05",
      label: "Retention",
      stress: "+10%",
      impact: retentionImpact,
      positive: true,
    },
  ];

  const maxImpact = Math.max(
    ...drivers.map((driver) =>
      Math.abs(driver.impact)
    ),
    1
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="driver-risk-panel group"
    >

      {/* TOP ACCENT */}
      <div className="driver-risk-accent" />

      {/* HEADER */}
      <div className="driver-risk-header">

        <div>

          <div className="driver-risk-kicker">
            04 · DRIVER RISK
          </div>

          <div className="driver-risk-title">
            Sensitivity tornado
          </div>

          <div className="driver-risk-intelligence">
            Intelligence
          </div>

        </div>

      </div>


      {/* DESCRIPTION */}
      <div className="driver-risk-description">

        <div className="driver-risk-subtitle">
          Driver sensitivity
        </div>

        <p>
          Relative impact on operating profit when each
          assumption moves by ±10%.
        </p>

      </div>


      {/* TABLE HEADER */}
      <div className="driver-risk-table-header">

        <span>
          #
        </span>

        <span>
          Driver
        </span>

        <span>
          Stress
        </span>

        <span>
          Impact on Op. Profit
        </span>

      </div>


      {/* TABLE */}
      <div className="driver-risk-table">

        {drivers.map((driver) => {

          const width =
            Math.max(
              8,
              (Math.abs(driver.impact) /
                maxImpact) *
                100
            );

          return (
            <div
              key={driver.label}
              className="driver-risk-row"
            >

              {/* NUMBER */}
              <div className="driver-risk-number">
                {driver.number}
              </div>


              {/* DRIVER */}
              <div className="driver-risk-name">
                {driver.label}
              </div>


              {/* STRESS */}
              <div className="driver-risk-stress">
                {driver.stress}
              </div>


              {/* IMPACT */}
              <div className="driver-risk-impact">

                <span
                  className={
                    driver.positive
                      ? "driver-impact-positive"
                      : "driver-impact-negative"
                  }
                >
                  {driver.positive
                    ? "+"
                    : "−"}

                  ₹{money(driver.impact)}
                </span>


                <span className="driver-risk-bar-track">

                  <span
                    className={
                      driver.positive
                        ? "driver-risk-bar-positive"
                        : "driver-risk-bar-negative"
                    }
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </span>

              </div>

            </div>
          );
        })}

      </div>

    </button>
  );
}