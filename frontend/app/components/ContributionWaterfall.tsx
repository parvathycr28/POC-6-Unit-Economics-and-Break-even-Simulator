"use client";

import { SimulationResult } from "@/lib/types";

function money(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function ContributionWaterfall({
  simulation,
  onClick,
}: {
  simulation: SimulationResult;
  onClick: () => void;
}) {
  const rows = [
    {
      number: "01",
      label: "Revenue",
      value: simulation.revenue,
      color: "#34D399",
    },
    {
      number: "02",
      label: "Variable cost",
      value: simulation.variableCostTotal,
      color: "#FBBF24",
    },
    {
      number: "03",
      label: "Contribution",
      value: simulation.contribution,
      color: "#FB923C",
    },
    {
      number: "04",
      label: "Fixed cost",
      value: simulation.fixedCost,
      color: "#FB7185",
    },
    {
      number: "05",
      label: "Operating profit",
      value: Math.abs(simulation.operatingProfit),
      color: "#818CF8",
    },
  ];

  return (
    <button
      type="button"
      onClick={onClick}
      className="margin-panel group"
    >
      {/* TOP ACCENT */}
      <div className="margin-panel-accent" />

      {/* HEADER */}
      <div className="margin-panel-header">

        <div>
          <div className="margin-panel-kicker">
            01 · MARGIN
          </div>

          <div className="margin-panel-title">
            Contribution waterfall
          </div>

          <div className="margin-panel-intelligence">
            Intelligence
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="margin-panel-divider" />

      {/* ROWS */}
      <div className="margin-rows">

        {rows.map((row) => (
          <div
            key={row.label}
            className="margin-row"
          >

            {/* NUMBER */}
            <div className="margin-number">
              {row.number}
            </div>

            {/* LABEL */}
            <div className="margin-label">
              {row.label}
            </div>

            {/* VALUE */}
            <div
              className="margin-value"
              style={{
                color: row.color,
              }}
            >
              {row.number !== "01" &&
                row.number !== "03" &&
                row.number !== "05"
                ? "−"
                : ""}

              ₹{money(row.value)}
            </div>

          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="margin-footer">

        <span>
          Monthly economics
        </span>

        <span>
          Live scenario
        </span>

      </div>

    </button>
  );
}