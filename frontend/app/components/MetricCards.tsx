"use client";

import { SimulationResult } from "@/lib/types";

function compactMoney(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function Metric({
  label,
  value,
  description,
  valueClass,
}: {
  label: string;
  value: string;
  description: string;
  valueClass: string;
}) {
  return (
    <div className="metric-card">

      <div className="metric-accent" />

      <div className="metric-label">
        {label}
      </div>

      <div
        className={`metric-value ${valueClass}`}
      >
        {value}
      </div>

      <div className="metric-description">
        {description}
      </div>

    </div>
  );
}

export default function MetricCards({
  simulation,
}: {
  simulation: SimulationResult;
}) {
  return (
    <div className="metrics-grid">


      {/* 01 OPERATING PROFIT */}

      <Metric
        label="Operating profit"
        value={`₹${compactMoney(
          simulation.operatingProfit
        )}`}
        description="monthly scenario"
        valueClass="metric-green"
      />


      {/* 02 CONTRIBUTION MARGIN */}

      <Metric
        label="Contribution margin"
        value={`${simulation.contributionMarginPercent.toFixed(
          1
        )}%`}
        description="per-unit economics"
        valueClass="metric-yellow"
      />


      {/* 03 BREAK-EVEN */}

      <Metric
        label="Break-even"
        value={
          simulation.breakEvenUnits !== null
            ? simulation.breakEvenUnits.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )
            : "N/A"
        }
        description="units / month"
        valueClass="metric-orange"
      />


      {/* 04 LTV : CAC */}

      <Metric
        label="LTV : CAC"
        value={
          simulation.ltvCacRatio !== null
            ? `${simulation.ltvCacRatio.toFixed(
                1
              )}×`
            : "N/A"
        }
        description="customer economics"
        valueClass="metric-red"
      />

    </div>
  );
}