"use client";

import { FredSeries } from "@/lib/types";

function signal(
  treasury: FredSeries,
  unemployment: FredSeries
) {
  const rate =
    treasury.latest ?? 0;

  const unemploymentRate =
    unemployment.latest ?? 0;

  if (
    rate >= 4.5 ||
    unemploymentRate >= 5
  ) {
    return {
      label: "HIGH",
      description:
        "Macro conditions indicate elevated financing and demand pressure.",
    };
  }

  if (
    rate >= 3.5 ||
    unemploymentRate >= 4.5
  ) {
    return {
      label: "MEDIUM",
      description:
        "Macro conditions remain restrictive but manageable.",
    };
  }

  return {
    label: "LOW",
    description:
      "Macro conditions are relatively supportive.",
  };
}

export default function MacroIntelligencePanel({
  treasury10y,
  unemployment,
}: {
  treasury10y: FredSeries;
  unemployment: FredSeries;
}) {
  const currentSignal = signal(
    treasury10y,
    unemployment
  );

  return (
    <aside className="space-y-3">
      <section className="terminal-card p-4">
        <div className="terminal-kicker">
          MACRO SIGNAL
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl font-semibold text-white">
            {currentSignal.label}
          </div>

          <div className="signal-pulse" />
        </div>

        <p className="mt-3 text-[11px] leading-5 text-slate-400">
          {currentSignal.description}
        </p>
      </section>

      <section className="terminal-card p-4">
        <div className="terminal-kicker">
          WHY THIS MATTERS
        </div>

        <p className="mt-3 text-[11px] leading-5 text-slate-400">
          Interest rates, inflation and labor-market
          conditions influence financing costs,
          demand assumptions and revenue planning.
        </p>
      </section>

      <section className="terminal-card p-4">
        <div className="terminal-kicker">
          FRED DATA SOURCE
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-[10px] text-slate-500">
              Treasury
            </span>

            <span className="text-[10px] text-cyan-400">
              DGS10
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[10px] text-slate-500">
              Fed Funds
            </span>

            <span className="text-[10px] text-cyan-400">
              DFF
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[10px] text-slate-500">
              CPI
            </span>

            <span className="text-[10px] text-cyan-400">
              CPIAUCSL
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[10px] text-slate-500">
              Unemployment
            </span>

            <span className="text-[10px] text-cyan-400">
              UNRATE
            </span>
          </div>
        </div>
      </section>
    </aside>
  );
}