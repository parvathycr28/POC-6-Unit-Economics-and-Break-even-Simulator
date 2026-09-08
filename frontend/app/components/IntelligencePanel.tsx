"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import {
  IntelligenceType,
  Scenario,
  SimulationResult,
} from "@/lib/types";

type Props = {
  intelligence: IntelligenceType;
  simulation: SimulationResult;
  scenario: Scenario;
  onClose: () => void;
};

export default function IntelligencePanel({
  intelligence,
  simulation,
  scenario,
  onClose,
}: Props) {
  useEffect(() => {
    if (!intelligence) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [intelligence, onClose]);

  if (!intelligence) {
    return null;
  }

  const content = {
    waterfall: {
      kicker: "MARGIN ENGINE",
      title: "Contribution waterfall",

      description:
        simulation.operatingProfit >= 0
          ? "The current scenario generates enough contribution to absorb the fixed-cost base and produce operating profit."
          : "The current contribution pool does not fully absorb the fixed-cost base.",

      stats: [
        [
          "Contribution / unit",
          `₹${simulation.contributionPerUnit.toLocaleString(
            "en-IN"
          )}`,
        ],
        [
          "Contribution margin",
          `${simulation.contributionMarginPercent.toFixed(
            1
          )}%`,
        ],
        [
          "Operating profit",
          `₹${Math.round(
            simulation.operatingProfit
          ).toLocaleString("en-IN")}`,
        ],
      ],
    },

    breakEven: {
      kicker: "VOLUME ABSORPTION",
      title: "Break-even intelligence",

      description:
        simulation.breakEvenUnits !== null
          ? `The scenario requires approximately ${Math.ceil(
              simulation.breakEvenUnits
            ).toLocaleString(
              "en-IN"
            )} units per month before contribution fully absorbs fixed costs.`
          : "Break-even is unavailable because contribution per unit is not positive.",

      stats: [
        [
          "Current volume",
          scenario.units.toLocaleString("en-IN"),
        ],
        [
          "Break-even units",
          simulation.breakEvenUnits !== null
            ? Math.ceil(
                simulation.breakEvenUnits
              ).toLocaleString("en-IN")
            : "N/A",
        ],
        [
          "Safety margin",
          simulation.safetyMarginPercent !== null
            ? `${simulation.safetyMarginPercent.toFixed(
                1
              )}%`
            : "N/A",
        ],
      ],
    },

    cacLtv: {
      kicker: "CUSTOMER ECONOMICS",
      title: "CAC / LTV intelligence",

      description:
        simulation.ltvCacRatio !== null
          ? `The current scenario generates an estimated LTV to CAC ratio of ${simulation.ltvCacRatio.toFixed(
              1
            )}×.`
          : "LTV / CAC cannot be calculated from the current assumptions.",

      stats: [
        [
          "CAC",
          `₹${scenario.cac.toLocaleString(
            "en-IN"
          )}`,
        ],
        [
          "LTV",
          simulation.ltv !== null
            ? `₹${Math.round(
                simulation.ltv
              ).toLocaleString("en-IN")}`
            : "N/A",
        ],
        [
          "LTV : CAC",
          simulation.ltvCacRatio !== null
            ? `${simulation.ltvCacRatio.toFixed(
                1
              )}×`
            : "N/A",
        ],
      ],
    },

    sensitivity: {
      kicker: "DRIVER ANALYSIS",
      title: "Sensitivity intelligence",

      description:
        "Each driver is stress-tested by ±10% and measured by its effect on operating profit.",

      stats: [
        ["Price", "Revenue leverage"],
        [
          "Variable cost",
          "Direct margin pressure",
        ],
        ["Fixed cost", "Scale absorption"],
        ["CAC", "Acquisition efficiency"],
        ["Retention", "LTV expansion"],
      ],
    },
  }[intelligence];

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <button
        type="button"
        aria-label="Close intelligence panel"
        onClick={onClose}
        className="intelligence-backdrop"
      />


      {/* =====================================================
          SLIDE OVER
      ===================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Intelligence panel"
        className="intelligence-panel"
      >

        {/* HEADER */}

        <div className="intelligence-header">

          <div>

            <div className="intelligence-kicker">
              {content.kicker}
            </div>

            <h2>
              {content.title}
            </h2>

          </div>


          {/* CLOSE BUTTON — TOP RIGHT */}

          <button
            type="button"
            aria-label="Close intelligence panel"
            onClick={onClose}
            className="intelligence-close"
          >
            <X size={18} strokeWidth={1.8} />
          </button>

        </div>


        {/* HEADER DIVIDER */}

        <div className="intelligence-divider" />


        {/* DESCRIPTION */}

        <section className="intelligence-description">

          <div className="intelligence-section-label">
            ANALYSIS
          </div>

          <p>
            {content.description}
          </p>

        </section>


        {/* OUTPUTS */}

        <section className="intelligence-section">

          <div className="intelligence-section-label">
            KEY OUTPUTS
          </div>

          <div className="intelligence-stats">

            {content.stats.map(
              ([label, value], index) => (
                <div
                  key={label}
                  className="intelligence-stat"
                >

                  <div className="intelligence-stat-index">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="intelligence-stat-content">

                    <span>
                      {label}
                    </span>

                    <strong>
                      {value}
                    </strong>

                  </div>

                </div>
              )
            )}

          </div>

        </section>


        {/* MANAGEMENT QUESTION */}

        <section className="management-question">

          <div className="intelligence-section-label">
            MANAGEMENT QUESTION
          </div>

          <h3>
            Which assumption would you challenge first?
          </h3>

          <p>
            If the scenario misses plan, identify the
            operating assumption with the greatest impact
            before changing the entire model.
          </p>

        </section>


        {/* FOOTER */}

        <div className="intelligence-footer">

          <span className="footer-pulse" />

          <span>
            Click another visualization to switch intelligence
          </span>

        </div>

      </aside>
    </>
  );
}