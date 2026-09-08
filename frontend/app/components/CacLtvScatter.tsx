"use client";

import dynamic from "next/dynamic";

import {
  Customer,
  SimulationResult
} from "@/lib/types";

const ReactECharts =
  dynamic(
    () =>
      import(
        "echarts-for-react"
      ),
    {
      ssr: false
    }
  );

const syntheticCustomers: Customer[] = [
  {
    customer_id: "C001",
    segment: "SMB",
    acquisition_channel:
      "Paid Search",
    cac: 780,
    monthly_revenue: 2500,
    retention_months: 18
  },

  {
    customer_id: "C002",
    segment: "SMB",
    acquisition_channel:
      "Partner",
    cac: 520,
    monthly_revenue: 2500,
    retention_months: 27
  },

  {
    customer_id: "C003",
    segment: "Mid-Market",
    acquisition_channel:
      "Outbound",
    cac: 1850,
    monthly_revenue: 7500,
    retention_months: 31
  },

  {
    customer_id: "C004",
    segment: "Enterprise",
    acquisition_channel:
      "Enterprise Partner",
    cac: 6200,
    monthly_revenue: 25000,
    retention_months: 42
  }
];

export default function CacLtvScatter({
  simulation,
  onClick
}: {
  simulation: SimulationResult;
  onClick: () => void;
}) {
  const points =
    syntheticCustomers.map(
      (customer) => {
        const grossMargin =
          simulation.contributionMarginPercent /
          100;

        const ltv =
          customer.monthly_revenue *
          grossMargin *
          customer.retention_months;

        return {
          name:
            customer.acquisition_channel,

          value: [
            customer.cac,
            ltv
          ]
        };
      }
    );

  const option = {
    backgroundColor: "transparent",

    grid: {
      left: 50,
      right: 18,
      top: 20,
      bottom: 38
    },

    tooltip: {
      trigger: "item",

      formatter: (params: any) => {
        const value =
          params.value;

        return `
          <strong>${params.name}</strong>
          <br/>
          CAC: ₹${Number(
            value[0]
          ).toLocaleString("en-IN")}
          <br/>
          LTV: ₹${Number(
            value[1]
          ).toLocaleString("en-IN")}
        `;
      }
    },

    xAxis: {
      type: "value",

      name: "CAC",

      nameTextStyle: {
        color: "#77738a",
        fontSize: 9
      },

      axisLabel: {
        color: "#77738a",
        fontSize: 9
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.05)"
        }
      }
    },

    yAxis: {
      type: "value",

      name: "LTV",

      nameTextStyle: {
        color: "#77738a",
        fontSize: 9
      },

      axisLabel: {
        color: "#77738a",
        fontSize: 9
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.05)"
        }
      }
    },

    series: [
      {
        type: "scatter",

        data: points,

        symbolSize: (
          value: number[]
        ) =>
          Math.max(
            10,
            Math.min(
              26,
              value[1] / 2500
            )
          ),

        itemStyle: {
          color: "#818CF8",
          opacity: 0.85
        }
      }
    ]
  };

return (
  <button
    type="button"
    onClick={onClick}
    className="dashboard-panel chart-panel"
  >
    <div className="panel-top-line" />

    <div className="chart-section-kicker">
  03 · CUSTOMER ECONOMICS
</div>

<div className="chart-section-title">
  CAC / LTV scatter
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
          minHeight: 260,
        }}
      />
    </div>
  </button>
);
}