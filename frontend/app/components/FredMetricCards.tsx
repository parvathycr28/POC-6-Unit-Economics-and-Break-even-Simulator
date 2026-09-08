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
  valueColor,
}: {
  label: string;
  value: string;
  description: string;
  valueColor: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-label">
        {label}
      </div>

      <div className={`metric-value ${valueColor}`}>
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

      <Metric
        label="Operating profit"
        value={`₹${compactMoney(simulation.operatingProfit)}`}
        description="monthly scenario"
        valueColor="metric-green"
      />

      <Metric
        label="Contribution margin"
        value={`${simulation.contributionMarginPercent.toFixed(1)}%`}
        description="per-unit economics"
        valueColor="metric-yellow"
      />

      <Metric
        label="Break-even"
        value={
          simulation.breakEvenUnits !== null
            ? Math.ceil(simulation.breakEvenUnits).toLocaleString("en-IN")
            : "N/A"
        }
        description="units / month"
        valueColor="metric-orange"
      />

      <Metric
        label="LTV : CAC"
        value={
          simulation.ltvCacRatio !== null
            ? `${simulation.ltvCacRatio.toFixed(1)}×`
            : "N/A"
        }
        description="customer economics"
        valueColor="metric-red"
      />

    </div>
  );
}