import React, { useState } from "react";
import {
  Calculator as CalculatorIcon,
  Zap,
  Clock3,
  IndianRupee,
  Leaf,
  RotateCcw,
  Lightbulb,
  Fan,
  Refrigerator,
  Tv,
  AirVent,
  WashingMachine,
  ArrowRight,
} from "lucide-react";

const Calculator = () => {
  // -----------------------------
  // STATE
  // -----------------------------

  const [appliance, setAppliance] = useState("Fan");
  const [power, setPower] = useState(75);
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(8.5);
  const [calculated, setCalculated] = useState(false);

  // -----------------------------
  // APPLIANCE PRESETS
  // -----------------------------

  const applianceData = {
    Fan: {
      power: 75,
      icon: Fan,
    },

    "LED Bulb": {
      power: 9,
      icon: Lightbulb,
    },

    Refrigerator: {
      power: 200,
      icon: Refrigerator,
    },

    Television: {
      power: 120,
      icon: Tv,
    },

    AC: {
      power: 1500,
      icon: AirVent,
    },

    "Washing Machine": {
      power: 500,
      icon: WashingMachine,
    },
  };
  const handleCalculate = () => {
  setCalculated(true);
};

  // -----------------------------
  // CALCULATIONS
  // -----------------------------

  const dailyEnergy = (Number(power) * Number(hours)) / 1000;

  const dailyCost = dailyEnergy * Number(rate);

  const monthlyEnergy = dailyEnergy * 30;

  const monthlyCost = dailyCost * 30;

  // Approximate CO2 factor
  const co2Factor = 0.7;

  const dailyCO2 = dailyEnergy * co2Factor;

  const monthlyCO2 = monthlyEnergy * co2Factor;

  // -----------------------------
  // HANDLE APPLIANCE CHANGE
  // -----------------------------

  const handleApplianceChange = (e) => {
    const selected = e.target.value;

    setAppliance(selected);

    if (applianceData[selected]) {
      setPower(applianceData[selected].power);
    }
  };

  // -----------------------------
  // RESET
  // -----------------------------

  const handleReset = () => {
    setAppliance("Fan");
    setPower(75);
    setHours(4);
    setRate(8.5);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">
      
      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <main className="p-5 md:p-7 lg:p-8">

        {/* ----------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------- */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102b43] md:text-4xl">
              Energy Calculator
            </h1>

            <p className="mt-1 text-sm text-slate-500 md:text-base">
              Calculate your energy consumption and estimated electricity cost.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex w-fit items-center gap-2 rounded-lg border border-[#16a05d] bg-white px-5 py-3 text-sm font-semibold text-[#11894f] transition hover:bg-green-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

        </div>


        {/* ========================================= */}
        {/* MAIN GRID */}
        {/* ========================================= */}

        <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ======================================= */}
          {/* CALCULATOR FORM */}
          {/* ======================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

            <div className="mb-6 flex items-center gap-3">
              
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <CalculatorIcon
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#102b43]">
                  Calculate Energy Usage
                </h2>

                <p className="text-sm text-slate-500">
                  Enter appliance details to calculate consumption.
                </p>
              </div>

            </div>


            {/* --------------------------------------- */}
            {/* APPLIANCE */}
            {/* --------------------------------------- */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-[#102b43]">
                Appliance
              </label>

              <select
                value={appliance}
                onChange={handleApplianceChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                {Object.keys(applianceData).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>


            {/* --------------------------------------- */}
            {/* POWER + HOURS */}
            {/* --------------------------------------- */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* POWER */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#102b43]">
                  Power Consumption
                </label>

                <div className="relative">

                  <Zap
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <input
                    type="number"
                    min="0"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter power"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                    W
                  </span>

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Example: Fan = 75 W
                </p>
              </div>


              {/* HOURS */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#102b43]">
                  Usage Hours Per Day
                </label>

                <div className="relative">

                  <Clock3
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter hours"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                    h
                  </span>

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  How many hours the appliance runs daily
                </p>
              </div>

            </div>


            {/* --------------------------------------- */}
            {/* ELECTRICITY RATE */}
            {/* --------------------------------------- */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-[#102b43]">
                Electricity Rate
              </label>

              <div className="relative">

                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600"
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-20 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  placeholder="Enter electricity rate"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  ₹/kWh
                </span>

              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Example: ₹8.50 per kWh
              </p>

            </div>


            {/* --------------------------------------- */}
            {/* FORMULA */}
            {/* --------------------------------------- */}

            <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600">
                  <CalculatorIcon
                    size={17}
                    className="text-white"
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-green-800">
                    How the calculation works
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-green-700">
                    Energy (kWh) = (Power × Usage Hours) ÷ 1000
                  </p>

                  <p className="text-sm leading-6 text-green-700">
                    Cost = Energy × Electricity Rate
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ======================================= */}
          {/* RESULT CARD */}
          {/* ======================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">
                Estimated Results
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#102b43]">
                {appliance}
              </h2>
            </div>


            {/* DAILY ENERGY */}

            <div className="rounded-xl bg-green-50 p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Daily Energy
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-700">
                    {dailyEnergy.toFixed(3)}
                    <span className="ml-1 text-sm font-medium">
                      kWh
                    </span>
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <Zap
                    size={22}
                    className="text-green-600"
                  />
                </div>

              </div>

            </div>


            {/* DAILY COST */}

            <div className="mt-4 rounded-xl bg-blue-50 p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Daily Cost
                  </p>

                  <p className="mt-1 text-2xl font-bold text-blue-700">
                    ₹{dailyCost.toFixed(2)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                  <IndianRupee
                    size={22}
                    className="text-blue-600"
                  />
                </div>

              </div>

            </div>


            {/* MONTHLY ENERGY */}

            <div className="mt-4 rounded-xl bg-yellow-50 p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Monthly Energy
                  </p>

                  <p className="mt-1 text-2xl font-bold text-yellow-700">
                    {monthlyEnergy.toFixed(2)}
                    <span className="ml-1 text-sm font-medium">
                      kWh
                    </span>
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100">
                  <Clock3
                    size={22}
                    className="text-yellow-600"
                  />
                </div>

              </div>

            </div>


            {/* MONTHLY COST */}

            <div className="mt-4 rounded-xl bg-purple-50 p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Monthly Cost
                  </p>

                  <p className="mt-1 text-2xl font-bold text-purple-700">
                    ₹{monthlyCost.toFixed(2)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100">
                  <IndianRupee
                    size={22}
                    className="text-purple-600"
                  />
                </div>

              </div>

            </div>


            {/* CO2 */}

            <div className="mt-4 rounded-xl border border-green-100 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Leaf
                    size={20}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Estimated CO₂ / Month
                  </p>

                  <p className="text-lg font-bold text-green-700">
                    {monthlyCO2.toFixed(2)} kg
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

<div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

  <div className="flex items-start gap-3">

    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600">
      <CalculatorIcon
        size={17}
        className="text-white"
      />
    </div>

    <div>
      <h3 className="font-semibold text-green-800">
        How the calculation works
      </h3>

      <p className="mt-2 text-sm leading-6 text-green-700">
        Energy (kWh) = (Power × Usage Hours) ÷ 1000
      </p>

      <p className="text-sm leading-6 text-green-700">
        Cost = Energy × Electricity Rate
      </p>
    </div>

  </div>

  {/* Calculate Button */}

  <button
    onClick={handleCalculate}
    className="
      mt-5
      flex items-center justify-center gap-2
      rounded-lg
      bg-green-600
      px-5 py-3
      text-sm font-semibold
      text-white
      transition
      hover:bg-green-700
    "
  >
    <CalculatorIcon size={17} />
    Calculate
  </button>

  {calculated && (
    <p className="mt-3 text-sm font-medium text-green-700">
      ✓ Calculation updated successfully.
    </p>
  )}

</div>
        {/* ========================================= */}
        {/* EXAMPLE SECTION */}
        {/* ========================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Lightbulb
                  size={23}
                  className="text-green-600"
                />
              </div>

              <div>

                <h3 className="text-lg font-bold text-[#102b43]">
                  Example
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  A 75 W appliance used for 4 hours consumes
                  <span className="font-semibold text-green-700">
                    {" "}
                    0.300 kWh
                  </span>{" "}
                  per day. At ₹8.50 per kWh, the estimated daily
                  cost is
                  <span className="font-semibold text-green-700">
                    {" "}
                    ₹2.55.
                  </span>
                </p>

              </div>

            </div>

            <button
  onClick={() => {
    setAppliance("Fan");
    setPower(75);
    setHours(4);
    setRate(8.5);
    setCalculated(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="
    flex items-center gap-2
    rounded-lg
    bg-green-600
    px-5 py-3
    text-sm font-semibold
    text-white
    transition
    hover:bg-green-700
  "
>
  Calculate Example
  <ArrowRight size={17} />
</button>

          </div>

        </div>


        {/* ========================================= */}
        {/* FOOTER INFORMATION */}
        {/* ========================================= */}

        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 px-5 py-4">

          <div className="flex items-start gap-3">

            <Leaf
              size={19}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <p className="text-sm leading-6 text-green-800">
              <span className="font-semibold">
                EcoTip:
              </span>{" "}
              Tracking individual appliances helps identify
              high-energy users and gives you a better idea of
              where energy-saving actions can make the biggest
              difference.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Calculator;