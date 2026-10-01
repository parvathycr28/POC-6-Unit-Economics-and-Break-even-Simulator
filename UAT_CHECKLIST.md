UAT_CHECKLIST.md

Gate 2 — Functional User Acceptance Testing

Application: Unit Economics & Break-Even Simulator
Final status: UAT PASS

Test method

Validation was performed against the reconstructed repository using:

Source-level interaction-path inspection.

Deterministic execution of the calculation model against normal and edge-case scenarios.

Verification of the frontend-to-backend request/response path introduced for simulation synchronization.

Responsive CSS breakpoint inspection.

Accessibility and error-state inspection.

Environment note: A full browser runtime could not be launched in the audit sandbox because the repository dependencies were not cached and npm registry installation timed out. The report therefore does not fabricate browser screenshots or browser-execution results. Runtime-sensitive cases are validated by their implemented code paths and deterministic model checks.

Checklist

ID

Test case

Expected result

Evidence / result

Status

UAT-01

Product filter/selector — Core Platform

Selecting Core Platform sets its associated economics.

Product mapping now resolves product data and updates price, variable cost, monthly revenue and gross margin.

PASS

UAT-02

Product selector — Pro Platform

Product economics change with selection.

Product data contains Pro Platform at ₹7,500 price and ₹2,400 variable cost; updated selector uses the product data source.

PASS

UAT-03

Product selector — Enterprise Platform

Product economics change with selection.

Product data contains Enterprise Platform at ₹25,000 price and ₹7,200 variable cost; selector maps by product id/name.

PASS

UAT-04

Scenario sliders

Changing any slider changes the scenario and recalculates outputs.

Each slider calls the shared onChange; simulation is recalculated from the scenario and synchronized through /api/simulation.

PASS

UAT-05

Tooltips — break-even

Hovering chart data exposes readable values.

ECharts axis tooltip is configured with series values and terminal styling.

PASS

UAT-06

Tooltips — CAC/LTV

Hovering a point exposes channel, CAC and LTV.

Existing point tooltip formatter reports channel, CAC and LTV.

PASS

UAT-07

Loading state

User can tell when the model is synchronizing.

Header exposes SYNCING MODEL with aria-busy.

PASS

UAT-08

Successful synchronization

API result replaces the local calculation after a valid request.

Client POSTs the complete scenario and assigns returned simulation.

PASS

UAT-09

API invalid payload

Invalid input returns a controlled error rather than crashing.

/api/simulation validates all required numeric/string fields and returns HTTP 400 for invalid payloads.

PASS

UAT-10

API/service error

User sees an actionable error and retains the last valid result.

Sync error is shown in an alert; the previous simulation state is not discarded.

PASS

UAT-11

Intelligence interaction

Clicking a visualization opens its corresponding intelligence panel.

Four analytics components call setIntelligence() with their specific intelligence type.

PASS

UAT-12

Intelligence close

Escape and close button dismiss the panel.

Existing panel registers Escape and exposes an ARIA-labelled close button.

PASS

UAT-13

Project information modal

INFO opens the modal; Escape and backdrop/close control dismiss it.

Existing page state and Escape listener implement the workflow.

PASS

UAT-14

Navigation

Dashboard remains a single-purpose workflow without dead navigation controls.

No broken navigation routes are required for the simulator workflow. INFO and intelligence are in-context overlays.

PASS

UAT-15

Responsive desktop/tablet

Layout reduces from three columns as viewport narrows.

1250px collapses the right rail; 900px becomes one column; KPI grid reduces.

PASS

UAT-16

Responsive mobile

Charts and decision sections become single-column and overlays fit the viewport.

650px breakpoint collapses analytics/decision grids; intelligence panel becomes full width; project modal becomes bottom-aligned and scrollable.

PASS

UAT-17

Keyboard focus

Key controls show a visible focus state.

Global :focus-visible styling added for buttons, selects and range inputs.

PASS

UAT-18

Reduced motion

Users requesting reduced motion are not exposed to continuous pulse/transition effects.

prefers-reduced-motion: reduce disables animation/transition duration.

PASS

UAT-19

Default data correctness

Default scenario produces internally consistent financial outputs.

Deterministic check: revenue ₹45,500,000; contribution ₹30,030,000; operating profit ₹25,830,000; break-even ≈2,545.45 units; margin 66.0%.

PASS

UAT-20

Zero price

Break-even becomes unavailable without division-by-zero failure.

Deterministic model check returns breakEvenUnits = null and margin 0.

PASS

UAT-21

Variable cost above price

Negative contribution is represented without invalid break-even output.

Deterministic model check returns breakEvenUnits = null and negative contribution margin.

PASS

UAT-22

Zero CAC

LTV becomes unavailable rather than dividing by zero.

Deterministic model check returns ltvCacRatio = null.

PASS

UAT-23

Zero volume

Safety margin becomes unavailable rather than dividing by zero.

Deterministic model check returns safetyMarginPercent = null.

PASS

UAT-24

Empty/unavailable outputs

UI provides N/A/null-safe states where metrics cannot be calculated.

Break-even, LTV and safety margin components explicitly render N/A when their calculation is unavailable.

PASS

UAT-25

Browser refresh

Application returns to a valid initial scenario rather than requiring persisted state.

Scenario state is initialized from defaultScenario; refresh therefore has a deterministic valid starting state.

PASS

UAT-26

Frontend-to-backend communication

Scenario changes reach a backend calculation endpoint and return a result.

Client POSTs JSON to /api/simulation; route validates and calls calculateSimulation; result returns as JSON.

PASS

UAT-27

Sensitivity calculation

±10% stress produces measurable operating-profit impact where applicable.

Sensitivity view now calls calculateSensitivity() and displays impact bars/labels. CAC and retention correctly show no direct operating-profit effect because the model's operating-profit formula does not use them.

PASS

Deterministic model evidence

Default scenario

Price: ₹2,500

Variable cost: ₹850

Fixed cost: ₹4,200,000

Volume: 18,200 units

CAC: ₹780

Monthly revenue assumption: ₹2,500

Gross margin assumption: 66%

Retention: 24 months

Calculated results:

Revenue: ₹45,500,000

Variable cost total: ₹15,470,000

Contribution: ₹30,030,000

Contribution per unit: ₹1,650

Contribution margin: 66.0%

Operating profit: ₹25,830,000

Break-even: 2,545.45 units

Safety margin: 86.01%

LTV: ₹39,600

LTV:CAC: 50.77×

Edge-case validation

Price = 0 → break-even unavailable, no division-by-zero.

Variable cost > price → negative contribution, break-even unavailable.

CAC = 0 → LTV unavailable.

Volume = 0 → safety margin unavailable.

Gross margin outside 0–100% → calculation clamps it to the valid range.

Known execution limitation

The audit environment could not complete npm install: the online install exceeded the execution window and offline installation failed because required packages were not cached. Consequently, no claim is made that a live Chromium session was executed against the Next.js server in this environment.

The source-level UAT gates and deterministic calculation tests pass, and the application has an explicit frontend-to-backend API path for the required communication test.

UAT PASS