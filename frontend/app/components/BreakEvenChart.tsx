"use client";

import dynamic from "next/dynamic";
import { SimulationResult } from "@/lib/types";

const ReactECharts = dynamic(
  () => import("echarts-for-react"),
  {
    ssr: false,
  }
);

export default function BreakEvenChart({
  simulation,
  units,
  onClick,
}: {
  simulation: SimulationResult;
  units: number;
  onClick: () => void;
}) {
  const maxUnits = Math.max(
    units * 1.8,
    simulation.breakEvenUnits
      ? simulation.breakEvenUnits * 1.4
      : units * 1.8
  );

  const points = Array.from(
    { length: 12 },
    (_, index) =>
      Math.round((maxUnits / 11) * index)
  );

  const option = {
    backgroundColor: "transparent",

    grid: {
      left: 55,
      right: 20,
      top: 20,
      bottom: 40,
    },

    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      type: "value",

      axisLabel: {
        color: "#64748B",
        fontSize: 10,
      },

      axisLine: {
        lineStyle: {
          color: "#334155",
        },
      },

      splitLine: {
        show: false,
      },
    },

    yAxis: {
      type: "value",

      axisLabel: {
        color: "#64748B",
        fontSize: 10,
      },

      axisLine: {
        lineStyle: {
          color: "#334155",
        },
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },

    series: [
      {
        name: "Contribution",

        type: "line",

        smooth: true,

        symbol: "none",

        data: points.map((volume) => [
          volume,
          volume *
            simulation.contributionPerUnit,
        ]),

        lineStyle: {
          color: "#22D3EE",
          width: 2,
        },
      },

      {
        name: "Fixed cost",

        type: "line",

        symbol: "none",

        data: points.map((volume) => [
          volume,
          simulation.fixedCost,
        ]),

        lineStyle: {
          color: "#FBBF24",
          width: 1,
          type: "dashed",
        },
      },

      ...(simulation.breakEvenUnits
        ? [
            {
              name: "Break-even",

              type: "scatter",

              data: [
                [
                  simulation.breakEvenUnits,
                  simulation.fixedCost,
                ],
              ],

              symbolSize: 10,

              itemStyle: {
                color: "#34D399",
              },
            },
          ]
        : []),
    ],
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="dashboard-panel chart-panel"
    >
      <div className="panel-top-line" />

      <div className="chart-section-kicker">
  02 · ABSORPTION
</div>

<div className="chart-section-title">
  Break-even curve
</div>
      <div className="chart-intelligence">
  Intelligence
</div>

      <div className="chart-container">
        <ReactECharts
          option={option}
          style={{
            width: "100%",
            height: "100%",
            minHeight: 280,
          }}
        />
      </div>
    </button>
  );
}