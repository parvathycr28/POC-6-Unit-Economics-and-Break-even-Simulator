"use client";

import { Scenario } from "@/lib/types";

type Props = {
  scenario: Scenario;

  onChange: (
    scenario: Scenario
  ) => void;
};


function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="scenario-slider">

      <div className="slider-heading">

        <span>
          {label}
        </span>

        <strong>
          {format(value)}
        </strong>

      </div>


      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="range-control"
      />

    </label>
  );
}


export default function ScenarioControls({
  scenario,
  onChange,
}: Props) {

  const update = (
    key: keyof Scenario,
    value: number | string
  ) => {
    onChange({
      ...scenario,
      [key]: value,
    });
  };


  const money = (
    value: number
  ) =>
    `₹${value.toLocaleString(
      "en-IN"
    )}`;


  return (
    <div className="scenario-controls">


      {/* PRODUCT */}

      <label className="product-control">

        <span className="control-label">
          Product
        </span>

        <select
          value={scenario.product}
          onChange={(event) =>
            update(
              "product",
              event.target.value
            )
          }
        >

          <option>
            Core Platform
          </option>

          <option>
            Pro Platform
          </option>

          <option>
            Enterprise Platform
          </option>

        </select>

      </label>


      {/* PRICE */}

      <Slider
        label="Price / unit"
        value={scenario.price}
        min={500}
        max={30000}
        step={100}
        format={money}
        onChange={(value) =>
          update("price", value)
        }
      />


      {/* VARIABLE COST */}

      <Slider
        label="Variable cost / unit"
        value={scenario.variableCost}
        min={100}
        max={15000}
        step={50}
        format={money}
        onChange={(value) =>
          update(
            "variableCost",
            value
          )
        }
      />


      {/* FIXED COST */}

      <Slider
        label="Monthly fixed cost"
        value={scenario.fixedCost}
        min={500000}
        max={10000000}
        step={100000}
        format={money}
        onChange={(value) =>
          update(
            "fixedCost",
            value
          )
        }
      />


      {/* VOLUME */}

      <Slider
        label="Monthly volume"
        value={scenario.units}
        min={1000}
        max={50000}
        step={100}
        format={(value) =>
          value.toLocaleString(
            "en-IN"
          )
        }
        onChange={(value) =>
          update(
            "units",
            value
          )
        }
      />


      {/* CAC */}

      <Slider
        label="CAC"
        value={scenario.cac}
        min={100}
        max={10000}
        step={50}
        format={money}
        onChange={(value) =>
          update(
            "cac",
            value
          )
        }
      />


      {/* RETENTION */}

      <Slider
        label="Retention"
        value={scenario.retentionMonths}
        min={3}
        max={60}
        step={1}
        format={(value) =>
          `${value} mo`
        }
        onChange={(value) =>
          update(
            "retentionMonths",
            value
          )
        }
      />

    </div>
  );
}