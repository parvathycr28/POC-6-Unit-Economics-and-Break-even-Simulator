"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import SimulatorShell from "./components/SimulatorShell";

export default function Home() {
  const [infoOpen, setInfoOpen] =
    useState(false);

  useEffect(() => {
    if (!infoOpen) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setInfoOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [infoOpen]);

  return (
    <>
      <SimulatorShell
        onInfo={() => setInfoOpen(true)}
      />


      {/* =====================================================
          PROJECT INFORMATION MODAL
      ===================================================== */}

      {infoOpen && (
        <div
          className="project-info-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Project information"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setInfoOpen(false);
            }
          }}
        >

          <div className="project-info-modal">

            {/* HEADER */}

            <div className="project-info-header">

              <div>

                <div className="project-info-kicker">
                  PROJECT SIGNATURE
                </div>

                <h2>
                  Infocreon Internship
                </h2>

              </div>


              <button
                type="button"
                aria-label="Close project information"
                onClick={() =>
                  setInfoOpen(false)
                }
                className="project-info-close"
              >
                <X
                  size={18}
                  strokeWidth={1.8}
                />
              </button>

            </div>


            {/* CONTENT */}

            <div className="project-info-content">

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


              <div className="project-info-row project-info-status">

                <span>
                  DATA STATUS
                </span>

                <strong>
                  SYNTHETIC DEMONSTRATION DATA
                </strong>

              </div>

            </div>


            {/* FOOTER */}

            <div className="project-info-footer">

              <div>
                Developed by: Parvathy CR
              </div>

              <div>
                PoC ID: 6
              </div>

              <div>
                GitHub: @parvathycr28
              </div>

              <div className="project-info-accent">
                Infocreon Internship
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}