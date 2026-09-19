import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Leaf,
  Zap,
  IndianRupee,
  Wind,
  TrendingDown,
  TrendingUp,
  TreePine,
  Globe2,
  Droplets,
  Sun,
  ArrowRight,
  Calculator,
  Activity,
  Target,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  X,
  Info,
} from "lucide-react";

const ViewImpact = () => {
  const navigate = useNavigate();

  const [selectedImpact, setSelectedImpact] = useState(null);

  // =========================================================
  // SAMPLE IMPACT DATA
  // =========================================================

  const monthlyData = [
    {
      month: "Apr",
      energy: 118,
      co2: 29.5,
    },
    {
      month: "May",
      energy: 105,
      co2: 26.3,
    },
    {
      month: "Jun",
      energy: 97,
      co2: 24.3,
    },
    {
      month: "Jul",
      energy: 91,
      co2: 22.8,
    },
    {
      month: "Aug",
      energy: 84,
      co2: 21.0,
    },
    {
      month: "Sep",
      energy: 76,
      co2: 19.0,
    },
  ];

  const maxEnergy = Math.max(
    ...monthlyData.map((item) => item.energy)
  );

  // =========================================================
  // IMPACT DATA
  // =========================================================

  const impactCards = [
    {
      id: 1,
      title: "Energy Consumption",
      value: "76 kWh",
      subtitle: "This month",
      icon: Zap,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "35.6% lower",
      description:
        "Your estimated energy consumption for the current month. Lower consumption generally means less demand on the electricity grid.",
    },
    {
      id: 2,
      title: "Electricity Cost",
      value: "₹646",
      subtitle: "Estimated monthly cost",
      icon: IndianRupee,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "₹356 saved",
      description:
        "Your estimated electricity cost based on your current energy consumption and the assumed electricity rate.",
    },
    {
      id: 3,
      title: "CO₂ Emissions",
      value: "19 kg",
      subtitle: "Estimated this month",
      icon: Leaf,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      change: "35.6% lower",
      description:
        "Estimated carbon emissions associated with your electricity consumption.",
    },
    {
      id: 4,
      title: "Trees Equivalent",
      value: "0.9",
      subtitle: "Estimated equivalent",
      icon: TreePine,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "Positive impact",
      description:
        "A simplified educational comparison showing your estimated environmental impact in terms of an approximate tree-equivalent value.",
    },
  ];

  // =========================================================
  // ENERGY SOURCES
  // =========================================================

  const energySources = [
    {
      name: "Grid Electricity",
      percentage: 72,
      icon: Zap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      bar: "bg-blue-500",
    },
    {
      name: "Solar Energy",
      percentage: 18,
      icon: Sun,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      bar: "bg-yellow-500",
    },
    {
      name: "Other Renewable",
      percentage: 10,
      icon: Wind,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      bar: "bg-cyan-500",
    },
  ];

  // =========================================================
  // FUNCTIONS
  // =========================================================

  const openImpactDetails = (impact) => {
    setSelectedImpact(impact);
  };

  const closeImpactDetails = () => {
    setSelectedImpact(null);
  };

  const goToTracker = () => {
    navigate("/tracker");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  const goToRecommendations = () => {
    navigate("/recommendations");
  };

  const goToGoals = () => {
    navigate("/goals");
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">

      <main className="p-5 md:p-7 lg:p-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">

              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-green-600">

                <Globe2 size={17} />

                Environmental Impact

              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                View Your Impact
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Understand how your energy consumption affects
                electricity costs, carbon emissions and the
                environment.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={goToTracker}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  <Activity size={17} />
                  Track Energy
                </button>

                <button
                  onClick={goToCalculator}
                  className="flex items-center gap-2 rounded-lg border border-green-600 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                >
                  <Calculator size={17} />
                  Calculate
                </button>

              </div>

            </div>


            {/* HERO ICON */}

            <div className="flex justify-center lg:pr-10">

              <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-green-100 md:h-56 md:w-56">

                <div className="absolute h-36 w-36 rounded-full bg-white shadow-sm md:h-44 md:w-44" />

                <div className="relative flex flex-col items-center">

                  <Globe2
                    size={58}
                    className="text-green-600"
                  />

                  <Leaf
                    size={35}
                    className="-mt-2 text-emerald-500"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* IMPACT SUMMARY */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {impactCards.map((impact) => {

            const Icon = impact.icon;

            return (
              <button
                key={impact.id}
                onClick={() =>
                  openImpactDetails(impact)
                }
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      {impact.title}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {impact.value}
                    </h2>

                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${impact.iconBg}`}
                  >

                    <Icon
                      size={24}
                      className={impact.iconColor}
                    />

                  </div>

                </div>

                <p className="mt-3 text-xs text-slate-400">
                  {impact.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">

                  <TrendingDown size={14} />

                  {impact.change}

                </div>

              </button>
            );

          })}

        </section>


        {/* ================================================= */}
        {/* MAIN CHART */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                Monthly Overview
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Energy Consumption Trend
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your estimated energy consumption is moving
                downward.
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">

              <TrendingDown size={18} />

              Improving

            </div>

          </div>


          {/* CHART */}

          <div className="mt-8 overflow-x-auto">

            <div className="flex h-72 min-w-[600px] items-end gap-5 border-b border-l border-slate-200 px-5 pb-0">

              {monthlyData.map((item) => {

                const height =
                  (item.energy / maxEnergy) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >

                    <span className="text-xs font-semibold text-slate-500">
                      {item.energy}
                    </span>

                    <div className="flex h-full w-full max-w-12 items-end">

                      <div
                        className="w-full rounded-t-lg bg-green-500 transition-all duration-500 hover:bg-green-600"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <span className="text-xs text-slate-400">
                      {item.month}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>


          <div className="mt-5 flex flex-wrap gap-5 text-xs text-slate-500">

            <div className="flex items-center gap-2">

              <span className="h-3 w-3 rounded-full bg-green-500" />

              Energy consumption (kWh)

            </div>

            <span>
              Lower usage = lower energy demand
            </span>

          </div>

        </section>


        {/* ================================================= */}
        {/* IMPACT BREAKDOWN */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* CO2 CARD */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Carbon Impact
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Estimated environmental impact from
                  electricity usage.
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

                <Leaf
                  size={24}
                  className="text-green-600"
                />

              </div>

            </div>


            <div className="mt-7 rounded-2xl bg-green-50 p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs text-slate-500">
                    Estimated CO₂ emissions
                  </p>

                  <p className="mt-1 text-3xl font-bold text-green-700">
                    19 kg
                  </p>

                </div>

                <TrendingDown
                  size={30}
                  className="text-green-600"
                />

              </div>

              <p className="mt-3 text-sm leading-6 text-green-700">
                Your estimated emissions have decreased as
                your energy consumption has reduced.
              </p>

            </div>


            <div className="mt-5 space-y-4">

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-500">
                    Current impact
                  </span>

                  <span className="text-sm font-bold">
                    19 kg
                  </span>

                </div>

                <div className="h-2.5 rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: "38%",
                    }}
                  />

                </div>

              </div>


              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-500">
                    Previous level
                  </span>

                  <span className="text-sm font-bold">
                    29.5 kg
                  </span>

                </div>

                <div className="h-2.5 rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-slate-300"
                    style={{
                      width: "59%",
                    }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* TREES CARD */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Positive Impact
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  A simple way to visualize your environmental
                  progress.
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">

                <TreePine
                  size={24}
                  className="text-emerald-600"
                />

              </div>

            </div>


            <div className="mt-7 flex items-center gap-5 rounded-2xl bg-emerald-50 p-5">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white">

                <TreePine
                  size={40}
                  className="text-emerald-600"
                />

              </div>


              <div>

                <p className="text-sm text-slate-500">
                  Approximate tree equivalent
                </p>

                <p className="mt-1 text-3xl font-bold text-emerald-700">
                  0.9
                </p>

                <p className="mt-1 text-xs text-emerald-700">
                  Educational environmental comparison
                </p>

              </div>

            </div>


            <p className="mt-5 text-sm leading-6 text-slate-500">
              This value is a simplified comparison intended
              to help visualize environmental impact. It is not
              a measurement of actual trees planted or grown.
            </p>

          </div>

        </section>


        {/* ================================================= */}
        {/* ENERGY SOURCE BREAKDOWN */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold">
                Energy Source Breakdown
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Where your electricity is coming from.
              </p>

            </div>

            <BarChart3
              size={22}
              className="text-green-600"
            />

          </div>


          <div className="mt-7 space-y-6">

            {energySources.map((source) => {

              const Icon = source.icon;

              return (
                <div key={source.name}>

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${source.iconBg}`}
                      >

                        <Icon
                          size={19}
                          className={source.iconColor}
                        />

                      </div>

                      <span className="text-sm font-semibold">
                        {source.name}
                      </span>

                    </div>

                    <span className="text-sm font-bold">
                      {source.percentage}%
                    </span>

                  </div>


                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full ${source.bar}`}
                      style={{
                        width: `${source.percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );

            })}

          </div>

        </section>


        {/* ================================================= */}
        {/* WHAT YOU CAN DO */}
        {/* ================================================= */}

        <section className="mt-7">

          <div className="mb-5">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Improve Your Impact
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              What can you do next?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Small changes in your daily habits can help
              reduce energy consumption.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* RECOMMENDATIONS */}

            <button
              onClick={goToRecommendations}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">

                <Lightbulb
                  size={24}
                  className="text-yellow-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold">
                Get Recommendations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover practical ways to reduce energy
                consumption.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">

                Explore Tips

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </div>

            </button>


            {/* GOALS */}

            <button
              onClick={goToGoals}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">

                <Target
                  size={24}
                  className="text-purple-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold">
                Set an Energy Goal
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create a target and track your progress toward
                lower consumption.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">

                View Goals

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </div>

            </button>


            {/* TRACKER */}

            <button
              onClick={goToTracker}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

                <Activity
                  size={24}
                  className="text-green-600"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold">
                Track Your Usage
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Record your appliance usage and understand your
                energy consumption.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">

                Open Tracker

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </div>

            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* IMPACT MESSAGE */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">

                <Leaf
                  size={25}
                  className="text-green-200"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                  Your Impact Matters
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Use less. Save more. Protect nature.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100">
                  Continue tracking your energy usage and
                  gradually improve your daily habits to reduce
                  unnecessary consumption.
                </p>

              </div>

            </div>


            <button
              onClick={goToRecommendations}
              className="flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Find Ways to Save
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* ECO TIP */}
        {/* ================================================= */}

        <section className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">

              <Info
                size={22}
                className="text-green-600"
              />

            </div>

            <div>

              <h3 className="font-bold text-green-800">
                About these calculations
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                Impact values shown on this page are estimated
                from energy usage data and simplified conversion
                assumptions used by the EcoTrack frontend.
                They are intended for educational and tracking
                purposes.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* IMPACT DETAILS MODAL */}
      {/* ================================================= */}

      {selectedImpact && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${selectedImpact.iconBg}`}
                >

                  {React.createElement(
                    selectedImpact.icon,
                    {
                      size: 24,
                      className:
                        selectedImpact.iconColor,
                    }
                  )}

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    {selectedImpact.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedImpact.subtitle}
                  </p>

                </div>

              </div>


              <button
                onClick={closeImpactDetails}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            {/* BODY */}

            <div className="p-6">

              <div className="rounded-xl bg-green-50 p-5">

                <p className="text-sm text-slate-500">
                  Current value
                </p>

                <p className="mt-1 text-3xl font-bold text-green-700">
                  {selectedImpact.value}
                </p>

              </div>


              <p className="mt-5 text-sm leading-7 text-slate-600">
                {selectedImpact.description}
              </p>


              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">

                <CheckCircle2 size={18} />

                {selectedImpact.change}

              </div>


              <div className="mt-7 flex justify-end">

                <button
                  onClick={closeImpactDetails}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ViewImpact;