import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Zap,
  IndianRupee,
  Leaf,
  Activity,
  TrendingDown,
  TrendingUp,
  Plus,
  ArrowRight,
  Calculator,
  Target,
  Lightbulb,
  Trophy,
  Clock,
  BarChart3,
  RefreshCcw,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [showAddRecord, setShowAddRecord] = useState(false);

  const [records, setRecords] = useState([
    {
      id: 1,
      appliance: "Living Room Lights",
      power: 9,
      hours: 2,
      date: "May 18, 2025",
      time: "7:45 PM",
      source: "Grid",
    },
    {
      id: 2,
      appliance: "Kitchen Fan",
      power: 75,
      hours: 1.8,
      date: "May 18, 2025",
      time: "9:10 AM",
      source: "Grid",
    },
    {
      id: 3,
      appliance: "AC",
      power: 1200,
      hours: 3,
      date: "May 17, 2025",
      time: "8:05 PM",
      source: "Grid",
    },
    {
      id: 4,
      appliance: "TV",
      power: 100,
      hours: 4,
      date: "May 17, 2025",
      time: "6:20 PM",
      source: "Grid",
    },
  ]);

  const [newAppliance, setNewAppliance] = useState("");
  const [newPower, setNewPower] = useState("");
  const [newHours, setNewHours] = useState("");
  const [newSource, setNewSource] = useState("Grid");

  // =========================================================
  // CONSTANTS
  // =========================================================

  const electricityRate = 8.5;

  // =========================================================
  // CALCULATIONS
  // =========================================================

  const calculateKwh = (power, hours) => {
    return (Number(power) * Number(hours)) / 1000;
  };

  const totalKwh = records.reduce(
    (total, record) =>
      total + calculateKwh(record.power, record.hours),
    0
  );

  const totalCost = totalKwh * electricityRate;

  const averageDaily =
    records.length > 0
      ? totalKwh / 7
      : 0;

  const co2Emission = totalKwh * 0.25;

  // =========================================================
  // WEEKLY DATA
  // =========================================================

  const weeklyData = [
    {
      day: "Mon",
      value: 8.2,
    },
    {
      day: "Tue",
      value: 10.4,
    },
    {
      day: "Wed",
      value: 7.8,
    },
    {
      day: "Thu",
      value: 12.1,
    },
    {
      day: "Fri",
      value: 9.6,
    },
    {
      day: "Sat",
      value: 13.5,
    },
    {
      day: "Sun",
      value: 11.2,
    },
  ];

  const maxWeeklyValue = Math.max(
    ...weeklyData.map((item) => item.value)
  );

  // =========================================================
  // APPLIANCE DATA
  // =========================================================

  const applianceUsage = [
    {
      name: "Air Conditioner",
      percentage: 42,
      color: "bg-blue-500",
    },
    {
      name: "Refrigerator",
      percentage: 22,
      color: "bg-green-500",
    },
    {
      name: "Lights",
      percentage: 15,
      color: "bg-yellow-500",
    },
    {
      name: "Fans",
      percentage: 11,
      color: "bg-purple-500",
    },
    {
      name: "Other",
      percentage: 10,
      color: "bg-slate-400",
    },
  ];

  // =========================================================
  // ADD RECORD
  // =========================================================

  const handleAddRecord = (event) => {
    event.preventDefault();

    if (
      !newAppliance.trim() ||
      !newPower ||
      !newHours
    ) {
      alert("Please enter appliance, power and usage hours.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      appliance: newAppliance.trim(),
      power: Number(newPower),
      hours: Number(newHours),
      date: "Today",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      source: newSource,
    };

    setRecords((previous) => [
      newRecord,
      ...previous,
    ]);

    setNewAppliance("");
    setNewPower("");
    setNewHours("");
    setNewSource("Grid");

    setShowAddRecord(false);
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goToTracker = () => {
    navigate("/tracker");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  const goToRecommendations = () => {
    navigate("/recommendations");
  };

  const goToActions = () => {
    navigate("/actions");
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

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              EcoTrack Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
              Energy Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Monitor your energy consumption and make
              smarter energy decisions.
            </p>
          </div>

          <button
            onClick={() => setShowAddRecord(true)}
            className="flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Record
          </button>

        </div>


        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* ENERGY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Energy Used
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {totalKwh.toFixed(2)}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    kWh
                  </span>
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

                <Zap
                  size={24}
                  className="text-green-600"
                />

              </div>

            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">

              <TrendingDown size={14} />

              8.2% lower than last week

            </div>

          </div>


          {/* COST */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Estimated Cost
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  ₹{totalCost.toFixed(2)}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                <IndianRupee
                  size={23}
                  className="text-blue-600"
                />

              </div>

            </div>

            <div className="mt-4 text-xs text-slate-400">
              Based on ₹8.50 per kWh
            </div>

          </div>


          {/* DAILY AVERAGE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Daily Average
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {averageDaily.toFixed(2)}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    kWh
                  </span>
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">

                <Activity
                  size={23}
                  className="text-yellow-600"
                />

              </div>

            </div>

            <div className="mt-4 text-xs text-slate-400">
              Average based on current records
            </div>

          </div>


          {/* CO2 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  CO₂ Emitted
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {co2Emission.toFixed(2)}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    kg
                  </span>
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">

                <Leaf
                  size={23}
                  className="text-emerald-600"
                />

              </div>

            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">

              <TrendingDown size={14} />

              Track to reduce your impact

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* CHART + QUICK ACTIONS */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* WEEKLY CHART */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Weekly Energy Usage
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your energy consumption over the last 7 days.
                </p>

              </div>

              <button
                onClick={goToTracker}
                className="flex w-fit items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                View Tracker
                <ArrowRight size={16} />
              </button>

            </div>


            {/* CHART */}

            <div className="mt-8 flex h-64 items-end justify-between gap-3 border-b border-l border-slate-200 px-3 pb-0 pt-5">

              {weeklyData.map((item) => {

                const height =
                  (item.value / maxWeeklyValue) * 100;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >

                    <div className="text-xs font-semibold text-slate-500">
                      {item.value}
                    </div>

                    <div className="flex h-full w-full max-w-10 items-end">

                      <div
                        className="w-full rounded-t-lg bg-green-500 transition-all duration-500 hover:bg-green-600"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <span className="text-xs text-slate-400">
                      {item.day}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your energy journey.
                </p>

              </div>

              <Zap
                size={22}
                className="text-green-600"
              />

            </div>


            <div className="mt-6 space-y-3">

              <button
                onClick={goToCalculator}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">

                    <Calculator
                      size={19}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Energy Calculator
                    </p>

                    <p className="text-xs text-slate-400">
                      Calculate appliance usage
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400"
                />

              </button>


              <button
                onClick={goToRecommendations}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">

                    <Lightbulb
                      size={19}
                      className="text-yellow-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Recommendations
                    </p>

                    <p className="text-xs text-slate-400">
                      Get energy-saving tips
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400"
                />

              </button>


              <button
                onClick={goToActions}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                    <Leaf
                      size={19}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Energy Actions
                    </p>

                    <p className="text-xs text-slate-400">
                      Improve your daily habits
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400"
                />

              </button>


              <button
                onClick={goToGoals}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">

                    <Target
                      size={19}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Energy Goals
                    </p>

                    <p className="text-xs text-slate-400">
                      Track your targets
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400"
                />

              </button>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* APPLIANCE + IMPACT */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* APPLIANCE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Energy by Appliance
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Where most of your energy is going.
                </p>

              </div>

              <BarChart3
                size={22}
                className="text-green-600"
              />

            </div>


            <div className="mt-7 space-y-5">

              {applianceUsage.map((item) => (

                <div key={item.name}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-slate-600">
                      {item.name}
                    </span>

                    <span className="text-sm font-bold text-[#102b43]">
                      {item.percentage}%
                    </span>

                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* IMPACT */}

          <div className="rounded-2xl bg-[#064d35] p-6 text-white shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">

                <Leaf
                  size={24}
                  className="text-green-200"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-200">
                  Your Impact
                </p>

                <h2 className="text-xl font-bold">
                  Every unit saved matters.
                </h2>

              </div>

            </div>


            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-white/10 p-4">

                <p className="text-xs text-green-200">
                  CO₂
                </p>

                <p className="mt-1 text-xl font-bold">
                  {co2Emission.toFixed(1)} kg
                </p>

              </div>


              <div className="rounded-xl bg-white/10 p-4">

                <p className="text-xs text-green-200">
                  Energy
                </p>

                <p className="mt-1 text-xl font-bold">
                  {totalKwh.toFixed(1)} kWh
                </p>

              </div>


              <div className="rounded-xl bg-white/10 p-4">

                <p className="text-xs text-green-200">
                  Cost
                </p>

                <p className="mt-1 text-xl font-bold">
                  ₹{totalCost.toFixed(0)}
                </p>

              </div>

            </div>


            <p className="mt-6 text-sm leading-6 text-green-100">
              Understanding your energy consumption is the
              first step toward reducing waste and creating a
              cleaner future.
            </p>


            <button
              onClick={goToActions}
              className="mt-6 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Take an Action
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* RECENT RECORDS */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-bold">
                Recent Energy Records
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your latest appliance usage records.
              </p>

            </div>

            <button
              onClick={goToTracker}
              className="flex w-fit items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>


          {/* DESKTOP TABLE */}

          <div className="mt-6 hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">

                  <th className="pb-4 font-semibold">
                    Appliance
                  </th>

                  <th className="pb-4 font-semibold">
                    Date
                  </th>

                  <th className="pb-4 font-semibold">
                    Power
                  </th>

                  <th className="pb-4 font-semibold">
                    Hours
                  </th>

                  <th className="pb-4 font-semibold">
                    kWh
                  </th>

                  <th className="pb-4 text-right font-semibold">
                    Source
                  </th>

                </tr>

              </thead>


              <tbody>

                {records.slice(0, 5).map((record) => {

                  const kwh = calculateKwh(
                    record.power,
                    record.hours
                  );

                  return (
                    <tr
                      key={record.id}
                      className="border-b border-slate-50 last:border-0"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">

                            <Zap
                              size={17}
                              className="text-green-600"
                            />

                          </div>

                          <span className="text-sm font-semibold">
                            {record.appliance}
                          </span>

                        </div>

                      </td>

                      <td className="py-4">

                        <p className="text-sm font-medium">
                          {record.date}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {record.time}
                        </p>

                      </td>

                      <td className="py-4 text-sm">
                        {record.power} W
                      </td>

                      <td className="py-4 text-sm">
                        {record.hours} h
                      </td>

                      <td className="py-4 text-sm font-bold">
                        {kwh.toFixed(3)}
                      </td>

                      <td className="py-4 text-right">

                        <span className="inline-flex items-center gap-2 text-sm">

                          <span className="h-2 w-2 rounded-full bg-green-500" />

                          {record.source}

                        </span>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>


          {/* MOBILE RECORDS */}

          <div className="mt-6 space-y-3 md:hidden">

            {records.slice(0, 5).map((record) => {

              const kwh = calculateKwh(
                record.power,
                record.hours
              );

              return (
                <div
                  key={record.id}
                  className="rounded-xl border border-slate-100 p-4"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">

                        <Zap
                          size={18}
                          className="text-green-600"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-bold">
                          {record.appliance}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {record.date} • {record.time}
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-bold text-green-600">
                      {kwh.toFixed(3)} kWh
                    </span>

                  </div>

                  <div className="mt-3 flex gap-5 text-xs text-slate-500">

                    <span>
                      {record.power} W
                    </span>

                    <span>
                      {record.hours} hours
                    </span>

                    <span>
                      {record.source}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* ================================================= */}
        {/* GOAL PROGRESS */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">

                <Trophy
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                  Sustainability Goal
                </p>

                <h2 className="mt-1 text-xl font-bold text-green-900">
                  Reduce your weekly energy usage
                </h2>

                <p className="mt-1 text-sm text-green-700">
                  You are making progress toward a more
                  sustainable lifestyle.
                </p>

              </div>

            </div>


            <button
              onClick={goToGoals}
              className="flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              View Goals
              <ArrowRight size={17} />
            </button>

          </div>


          <div className="mt-6">

            <div className="mb-2 flex justify-between text-xs">

              <span className="font-semibold text-green-800">
                Goal Progress
              </span>

              <span className="font-bold text-green-700">
                68%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white">

              <div
                className="h-full rounded-full bg-green-600"
                style={{
                  width: "68%",
                }}
              />

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* ECO TIP */}
        {/* ================================================= */}

        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">

              <Lightbulb
                size={22}
                className="text-green-600"
              />

            </div>

            <div>

              <h3 className="font-bold">
                EcoTip
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Appliances such as air conditioners can use
                significantly more electricity than lights and
                fans. Tracking individual appliances helps you
                identify where you can save the most energy.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* ADD RECORD MODAL */}
      {/* ================================================= */}

      {showAddRecord && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">

              <div>

                <h2 className="text-xl font-bold">
                  Add Energy Record
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your appliance energy usage.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAddRecord(false)
                }
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleAddRecord}
              className="p-6"
            >

              <label className="text-sm font-semibold text-slate-700">
                Appliance *
              </label>

              <input
                type="text"
                value={newAppliance}
                onChange={(e) =>
                  setNewAppliance(e.target.value)
                }
                placeholder="Example: Refrigerator"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />


              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Power Consumption *
                  </label>

                  <div className="relative mt-2">

                    <input
                      type="number"
                      min="0"
                      value={newPower}
                      onChange={(e) =>
                        setNewPower(e.target.value)
                      }
                      placeholder="75"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-green-500"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      W
                    </span>

                  </div>

                </div>


                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Usage Hours *
                  </label>

                  <div className="relative mt-2">

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={newHours}
                      onChange={(e) =>
                        setNewHours(e.target.value)
                      }
                      placeholder="4"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-green-500"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      h
                    </span>

                  </div>

                </div>

              </div>


              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Energy Source
              </label>

              <select
                value={newSource}
                onChange={(e) =>
                  setNewSource(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
              >

                <option value="Grid">
                  Grid Electricity
                </option>

                <option value="Solar">
                  Solar
                </option>

                <option value="Wind">
                  Wind
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              {/* CALCULATION PREVIEW */}

              {newPower && newHours && (

                <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={20}
                      className="text-green-600"
                    />

                    <div>

                      <p className="text-sm font-bold text-green-800">
                        Calculated Energy
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-700">

                        {calculateKwh(
                          newPower,
                          newHours
                        ).toFixed(3)}{" "}
                        kWh

                      </p>

                    </div>

                  </div>

                  <p className="mt-3 text-xs text-green-700">
                    Energy = (Power × Hours) ÷ 1000
                  </p>

                </div>

              )}


              {/* BUTTONS */}

              <div className="mt-7 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddRecord(false)
                  }
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Save size={17} />
                  Save Record
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;