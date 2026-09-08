"use client";

import { useMemo, useState } from "react";

import ContributionWaterfall from "./ContributionWaterfall";
import BreakEvenChart from "./BreakEvenChart";
import CacLtvScatter from "./CacLtvScatter";
import SensitivityTornado from "./SensitivityTornado";
import MetricCards from "./MetricCards";
import ScenarioControls from "./ScenarioControls";
import IntelligencePanel from "./IntelligencePanel";

import {
  calculateSimulation
} from "@/lib/calculations";

import {
  defaultScenario
} from "@/lib/mockData";

import {
  IntelligenceType,
  Scenario
} from "@/lib/types";

export default function SimulatorShell({
  onInfo
}: {
  onInfo?: () => void;
}) {
  const [scenario, setScenario] =
    useState<Scenario>(defaultScenario);

  const [intelligence, setIntelligence] =
    useState<IntelligenceType>(null);

  /*
   * INFO MODAL
   *
   * This state belongs to the dashboard itself.
   * Therefore the INFO button works even if page.tsx
   * does not correctly wire the old callback.
   */
  const [showInfo, setShowInfo] =
    useState(false);

  const simulation = useMemo(
    () => calculateSimulation(scenario),
    [scenario]
  );

  const openInfo = () => {
    setShowInfo(true);

    // Preserve an existing parent callback if one exists.
    onInfo?.();
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  return (
    <main className="dashboard-shell">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="dashboard-header">

        <div className="header-brand">

          <div className="brand-kicker">
            INFOCREON INTERNSHIP
          </div>

          <h1>
            UNIT ECONOMICS &amp; BREAK-EVEN SIMULATOR
          </h1>

          <p>
            FINANCE &amp; CASH · SCENARIO INTELLIGENCE
          </p>

        </div>


        <div className="header-actions">

          <div className="live-status">
            <span className="live-dot" />
            LIVE SIMULATION
          </div>


          {/* INFO BUTTON */}

          <button
            type="button"
            className="header-info-button"
            onClick={openInfo}
            aria-label="Open project information"
          >
            INFO
          </button>

        </div>

      </header>


      {/* =====================================================
          SMALL SECTION INTRO
      ===================================================== */}

      <section className="dashboard-intro">

        <div>

          <div className="section-kicker">
            FINANCE &amp; CASH
          </div>

          <h2>
            Does growth create value — or just absorb more cash?
          </h2>

          <p>
            Change the operating assumptions and watch
            contribution, break-even and customer economics
            move together.
          </p>

        </div>


        <div className="data-mode">

          <span>
            DATA MODE
          </span>

          <strong>
            SYNTHETIC SCENARIO
          </strong>

        </div>

      </section>


      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <section className="dashboard-layout">


        {/* =================================================
            LEFT — SCENARIO CONTROLS
        ================================================= */}

        <aside className="scenario-sidebar">

          <div className="sidebar-heading">

            <div>

              <div className="panel-kicker">
                SCENARIO LAB
              </div>

              <h3>
                Move the economics
              </h3>

            </div>

            <span className="synthetic-badge">
              SYNTHETIC
            </span>

          </div>


          <ScenarioControls
            scenario={scenario}
            onChange={setScenario}
          />

        </aside>


        {/* =================================================
            CENTER — MAIN ANALYTICS
        ================================================= */}

        <section className="analytics-column">


          {/* KPI CARDS */}

          <div className="metrics-area">

            <MetricCards
              simulation={simulation}
            />

          </div>


          {/* ANALYTICS GRID */}

          <div className="analytics-grid">


            {/* 01 — MARGIN */}

            <ContributionWaterfall
              simulation={simulation}
              onClick={() =>
                setIntelligence("waterfall")
              }
            />


            {/* 02 — ABSORPTION */}

            <BreakEvenChart
              simulation={simulation}
              units={scenario.units}
              onClick={() =>
                setIntelligence("breakEven")
              }
            />


            {/* 03 — CUSTOMER ECONOMICS */}

            <CacLtvScatter
  simulation={simulation}
  onClick={() =>
    setIntelligence("cacLtv")
  }
/>

            {/* 04 — DRIVER RISK */}

            <SensitivityTornado
              scenario={scenario}
              simulation={simulation}
              onClick={() =>
                setIntelligence("sensitivity")
              }
            />

          </div>


          {/* =================================================
              LOWER INFORMATION STRIP
          ================================================= */}

          <section className="decision-strip">


            <div className="decision-card">

              <div className="panel-kicker">
                OPERATING VIEW
              </div>

              <h3>
                Unit economics intelligence
              </h3>

              <p>
                The simulator connects price,
                variable cost, fixed cost, volume,
                CAC and retention into one operating
                scenario.
              </p>

            </div>


            <div className="decision-card">

              <div className="panel-kicker">
                CURRENT SCENARIO
              </div>

              <div className="scenario-summary">

                <div>
                  <span>
                    Product
                  </span>

                  <strong>
                    {scenario.product}
                  </strong>
                </div>


                <div>
                  <span>
                    Volume
                  </span>

                  <strong>
                    {scenario.units.toLocaleString("en-IN")}
                  </strong>
                </div>


                <div>
                  <span>
                    Margin
                  </span>

                  <strong>
                    {simulation.contributionMarginPercent.toFixed(1)}%
                  </strong>
                </div>

              </div>

            </div>

          </section>

        </section>


        {/* =================================================
            RIGHT — INTELLIGENCE / SIGNAL PANEL
        ================================================= */}

        <aside className="insight-sidebar">


          {/* SCENARIO SIGNAL */}

          <section className="insight-card signal-card">

            <div className="panel-kicker">
              SCENARIO SIGNAL
            </div>


            <div className="signal-header">

              <div>

                <div className="signal-value">

                  {simulation.operatingProfit >= 0
                    ? "POSITIVE"
                    : "PRESSURED"}

                </div>

                <div className="signal-caption">
                  Operating position
                </div>

              </div>

              <span className="signal-pulse" />

            </div>


            <p>

              {simulation.operatingProfit >= 0
                ? "Current contribution absorbs the fixed-cost base and produces positive operating profit."
                : "Current contribution does not fully absorb the fixed-cost base."}

            </p>

          </section>


          {/* KEY OUTPUTS */}

          <section className="insight-card">

            <div className="panel-kicker">
              KEY OUTPUTS
            </div>


            <div className="output-list">


              <div className="output-row">

                <span>
                  Operating profit
                </span>

                <strong
                  className={
                    simulation.operatingProfit >= 0
                      ? "positive-value"
                      : "negative-value"
                  }
                >
                  ₹
                  {Math.round(
                    simulation.operatingProfit
                  ).toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="output-row">

                <span>
                  Break-even
                </span>

                <strong>

                  {simulation.breakEvenUnits !== null
                    ? Math.ceil(
                        simulation.breakEvenUnits
                      ).toLocaleString("en-IN")
                    : "—"}

                </strong>

              </div>


              <div className="output-row">

                <span>
                  LTV : CAC
                </span>

                <strong>

                  {simulation.ltvCacRatio !== null
  ? `${simulation.ltvCacRatio.toFixed(1)}×`
  : "N/A"}

                </strong>

              </div>


              <div className="output-row">

                <span>
                  Safety margin
                </span>

                <strong>

                  {simulation.safetyMarginPercent !== null
                    ? simulation.safetyMarginPercent.toFixed(1)
                    : "—"}%

                </strong>

              </div>

            </div>

          </section>


          {/* DRIVER WATCH */}

          <section className="insight-card">

            <div className="panel-kicker">
              DRIVER WATCH
            </div>


            <div className="driver-watch">

              <div className="driver-row">

                <span>
                  Price
                </span>

                <strong className="driver-positive">
                  {scenario.price.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="driver-row">

                <span>
                  Variable cost
                </span>

                <strong className="driver-negative">
                  {scenario.variableCost.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="driver-row">

                <span>
                  Fixed cost
                </span>

                <strong>
                  ₹{scenario.fixedCost.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="driver-row">

                <span>
                  CAC
                </span>

                <strong>
                  ₹{scenario.cac.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="driver-row">

                <span>
                  Retention
                </span>

                <strong className="driver-positive">
                  {scenario.retentionMonths} mo
                </strong>

              </div>

            </div>

          </section>


          {/* INTELLIGENCE BUTTON */}

          <button
            type="button"
            className="intelligence-hint"
            onClick={() =>
              setIntelligence("waterfall")
            }
          >

            <span>
              Click any visualization
            </span>

            <strong>
              OPEN INTELLIGENCE →
            </strong>

          </button>

        </aside>

      </section>


      {/* =====================================================
          INTELLIGENCE SLIDE OVER
      ===================================================== */}

      <IntelligencePanel
        intelligence={intelligence}
        simulation={simulation}
        scenario={scenario}
        onClose={() =>
          setIntelligence(null)
        }
      />


      {/* =====================================================
          PROJECT INFO MODAL
          THIS REPLACES THE OLD BOTTOM SIGNATURE
      ===================================================== */}

      {showInfo && (

        <div
          className="project-info-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-info-title"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              closeInfo();
            }

          }}
        >

          <div className="project-info-modal">


            {/* MODAL HEADER */}

            <div className="project-info-header">

              <div>

                <div className="project-info-kicker">
                  PROJECT SIGNATURE
                </div>

                <h2 id="project-info-title">
                  Infocreon Internship
                </h2>

              </div>


              <button
                type="button"
                className="project-info-close"
                onClick={closeInfo}
                aria-label="Close project information"
              >
                ×
              </button>

            </div>


            {/* DIVIDER */}

            <div className="project-info-divider" />


            {/* DETAILS */}

            <div className="project-info-details">


              <div className="project-info-row">

                <span>
                  ARCHITECT
                </span>

                <strong>
                  Parvathy CR
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  BATCH
                </span>

                <strong>
                  Batch 2 Interns
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  TECHNOLOGY STACK
                </span>

                <strong>
                  Next.js · FastAPI · Tailwind CSS · Apache ECharts
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  DATA STATUS
                </span>

                <strong>
                  SYNTHETIC DEMONSTRATION DATA
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  DEVELOPED BY
                </span>

                <strong>
                  Parvathy CR
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  POC ID
                </span>

                <strong>
                  6
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  GITHUB
                </span>

                <strong>
                  @parvathycr28
                </strong>

              </div>


              <div className="project-info-row">

                <span>
                  PROJECT
                </span>

                <strong>
                  Infocreon Internship
                </strong>

              </div>

            </div>


            {/* FOOTER */}

            <div className="project-info-footer">

              <span>
                UNIT ECONOMICS &amp; BREAK-EVEN SIMULATOR
              </span>

              <button
                type="button"
                onClick={closeInfo}
              >
                CLOSE
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}