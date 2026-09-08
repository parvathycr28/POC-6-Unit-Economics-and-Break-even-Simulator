"use client";

import dynamic from "next/dynamic";
import { FredObservation } from "@/lib/types";

const ReactECharts = dynamic(
  () => import("echarts-for-react"),
  { ssr: false }
);

type Props = {
  title: string;
  subtitle: string;
  observations: FredObservation[];
  unit: string;
};

export default function FredChart({
  title,
  subtitle,
  observations,
  unit,
}: Props) {
  const option = {
    backgroundColor: "transparent",

    grid: {
      left: 48,
      right: 20,
      top: 35,
      bottom: 35,
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "#0B1117",
      borderColor: "#1F2937",
      textStyle: {
        color: "#E5E7EB",
        fontSize: 11,
      },
      formatter: (params: any) => {
        const point = params?.[0];

        if (!point) return "";

        return `
          <div style="font-weight:600">
            ${point.axisValue}
          </div>
          <div style="margin-top:4px">
            ${Number(point.value).toFixed(2)} ${unit}
          </div>
        `;
      },
    },

    xAxis: {
      type: "category",
      data: observations.map((item) => item.date),
      boundaryGap: false,

      axisLabel: {
        color: "#64748B",
        fontSize: 9,
      },

      axisLine: {
        lineStyle: {
          color: "#1F2937",
        },
      },

      axisTick: {
        show: false,
      },
    },

    yAxis: {
      type: "value",

      axisLabel: {
        color: "#64748B",
        fontSize: 9,
      },

      splitLine: {
        lineStyle: {
          color: "rgba(31,41,55,.55)",
        },
      },
    },

    series: [
      {
        name: title,
        type: "line",
        smooth: true,
        symbol: "none",

        data: observations.map(
          (item) => item.value
        ),

        lineStyle: {
          color: "#38BDF8",
          width: 2,
        },

        areaStyle: {
          color: "rgba(56,189,248,.10)",
        },
      },
    ],
  };

  return (
    <section className="terminal-card min-h-[330px]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="terminal-kicker">
            FRED · MACRO SERIES
          </div>

          <h2 className="mt-1 text-sm font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 text-[10px] text-slate-500">
            {subtitle}
          </p>
        </div>

        <span className="status-dot">
          LIVE
        </span>
      </div>

      <div className="h-[270px]">
        <ReactECharts
          option={option}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </section>
  );
}