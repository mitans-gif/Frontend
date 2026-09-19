import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Target,
  Plus,
  Zap,
  IndianRupee,
  Leaf,
  CalendarDays,
  CheckCircle2,
  Trash2,
  X,
  Trophy,
  TrendingDown,
  ArrowRight,
  RotateCcw,
  Calculator,
  Lightbulb,
} from "lucide-react";

const Goals = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [activeFilter, setActiveFilter] = useState("All");
  const [showGoalForm, setShowGoalForm] = useState(false);

  const [goalTitle, setGoalTitle] = useState("");
  const [goalType, setGoalType] = useState("Energy");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Reduce Monthly Energy Usage",
      type: "Energy",
      target: 100,
      current: 68,
      unit: "kWh",
      deadline: "30 Sep 2026",
      completed: false,
    },
    {
      id: 2,
      title: "Lower Electricity Cost",
      type: "Cost",
      target: 1000,
      current: 720,
      unit: "₹",
      deadline: "30 Sep 2026",
      completed: false,
    },
    {
      id: 3,
      title: "Reduce Carbon Emissions",
      type: "Carbon",
      target: 25,
      current: 18,
      unit: "kg CO₂",
      deadline: "15 Oct 2026",
      completed: false,
    },
    {
      id: 4,
      title: "Complete Energy Saving Actions",
      type: "Actions",
      target: 10,
      current: 10,
      unit: "actions",
      deadline: "10 Sep 2026",
      completed: true,
    },
  ]);

  // =========================================================
  // FILTERS
  // =========================================================

  const filters = [
    "All",
    "Energy",
    "Cost",
    "Carbon",
    "Actions",
    "Completed",
  ];

  const filteredGoals = goals.filter((goal) => {
    if (activeFilter === "All") return true;

    if (activeFilter === "Completed") {
      return goal.completed;
    }

    return goal.type === activeFilter;
  });

  // =========================================================
  // HELPERS
  // =========================================================

  const getGoalIcon = (type) => {
    if (type === "Energy") return Zap;
    if (type === "Cost") return IndianRupee;
    if (type === "Carbon") return Leaf;
    return Target;
  };

  const getGoalColor = (type) => {
    if (type === "Energy") {
      return {
        bg: "bg-green-100",
        text: "text-green-600",
        bar: "bg-green-600",
      };
    }

    if (type === "Cost") {
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
        bar: "bg-blue-600",
      };
    }

    if (type === "Carbon") {
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        bar: "bg-emerald-600",
      };
    }

    return {
      bg: "bg-purple-100",
      text: "text-purple-600",
      bar: "bg-purple-600",
    };
  };

  const getProgress = (goal) => {
    if (goal.completed) return 100;

    if (!goal.target || goal.target <= 0) return 0;

    return Math.min(
      100,
      Math.round((goal.current / goal.target) * 100)
    );
  };

  // =========================================================
  // ADD GOAL
  // =========================================================

  const handleAddGoal = (event) => {
    event.preventDefault();

    if (
      !goalTitle.trim() ||
      !target ||
      !deadline ||
      Number(target) <= 0
    ) {
      alert("Please enter all required goal details.");
      return;
    }

    let unit = "kWh";

    if (goalType === "Cost") {
      unit = "₹";
    } else if (goalType === "Carbon") {
      unit = "kg CO₂";
    } else if (goalType === "Actions") {
      unit = "actions";
    }

    const currentValue = Math.max(0, Number(current) || 0);
    const targetValue = Number(target);

    const newGoal = {
      id: Date.now(),
      title: goalTitle.trim(),
      type: goalType,
      target: targetValue,
      current: Math.min(currentValue, targetValue),
      unit,
      deadline,
      completed: currentValue >= targetValue,
    };

    setGoals((previousGoals) => [
      ...previousGoals,
      newGoal,
    ]);

    setGoalTitle("");
    setGoalType("Energy");
    setTarget("");
    setCurrent("");
    setDeadline("");
    setShowGoalForm(false);
  };

  // =========================================================
  // UPDATE PROGRESS
  // =========================================================

  const increaseProgress = (id) => {
    setGoals((previousGoals) =>
      previousGoals.map((goal) => {
        if (goal.id !== id || goal.completed) {
          return goal;
        }

        const increaseAmount =
          goal.type === "Actions"
            ? 1
            : Math.max(1, goal.target * 0.1);

        const newCurrent = Math.min(
          goal.target,
          goal.current + increaseAmount
        );

        return {
          ...goal,
          current: Number(newCurrent.toFixed(2)),
          completed: newCurrent >= goal.target,
        };
      })
    );
  };

  // =========================================================
  // COMPLETE GOAL
  // =========================================================

  const completeGoal = (id) => {
    setGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              current: goal.target,
              completed: true,
            }
          : goal
      )
    );
  };

  // =========================================================
  // RESET GOAL
  // =========================================================

  const resetGoal = (id) => {
    setGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              current: 0,
              completed: false,
            }
          : goal
      )
    );
  };

  // =========================================================
  // DELETE GOAL
  // =========================================================

  const deleteGoal = (id) => {
    setGoals((previousGoals) =>
      previousGoals.filter((goal) => goal.id !== id)
    );
  };

  // =========================================================
  // SUMMARY
  // =========================================================

  const completedCount = goals.filter(
    (goal) => goal.completed
  ).length;

  const activeCount = goals.filter(
    (goal) => !goal.completed
  ).length;

  const overallProgress =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce(
            (total, goal) =>
              total + getProgress(goal),
            0
          ) / goals.length
        );

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">
      <main className="p-5 md:p-7 lg:p-8">

        {/* HEADER */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Your Progress
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
              Energy Goals
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Set energy-saving goals, monitor your progress
              and build better sustainable habits.
            </p>
          </div>

          <button
            onClick={() => setShowGoalForm(true)}
            className="flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add New Goal
          </button>
        </div>

        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Goals
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {goals.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Target
                  size={23}
                  className="text-green-600"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Goals you are tracking
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Active Goals
                </p>

                <h2 className="mt-1 text-2xl font-bold text-blue-600">
                  {activeCount}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <TrendingDown
                  size={23}
                  className="text-blue-600"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Currently in progress
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <h2 className="mt-1 text-2xl font-bold text-purple-600">
                  {completedCount}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Trophy
                  size={23}
                  className="text-purple-600"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Goals achieved
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Overall Progress
                </p>

                <h2 className="mt-1 text-2xl font-bold text-green-600">
                  {overallProgress}%
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2
                  size={23}
                  className="text-green-600"
                />
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-600 transition-all duration-500"
                style={{
                  width: `${overallProgress}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* FILTER */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="font-bold">
                My Goals
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                View and manage your sustainability goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {filter}
                </button>
              ))}

            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* GOALS */}
        {/* ================================================= */}

        <section className="mt-7">

          {filteredGoals.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {filteredGoals.map((goal) => {
                const Icon = getGoalIcon(goal.type);
                const colors = getGoalColor(goal.type);
                const progress = getProgress(goal);

                return (
                  <div
                    key={goal.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* CARD HEADER */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-4">

                        <div
                          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full p-3 ${colors.bg}`}
                        >
                          <Icon
                            size={24}
                            className={colors.text}
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-lg font-bold">
                              {goal.title}
                            </h3>

                            {goal.completed && (
                              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                <CheckCircle2 size={13} />
                                Completed
                              </span>
                            )}

                          </div>

                          <p
                            className={`mt-1 text-sm font-semibold ${colors.text}`}
                          >
                            {goal.type} Goal
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          deleteGoal(goal.id)
                        }
                        className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete goal"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                    {/* DEADLINE */}

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={17} />

                      <span>
                        Deadline: {goal.deadline}
                      </span>
                    </div>

                    {/* VALUES */}

                    <div className="mt-5 flex items-end justify-between gap-4">

                      <div>
                        <p className="text-xs text-slate-400">
                          Current
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {goal.current}{" "}
                          <span className="text-sm font-medium text-slate-400">
                            {goal.unit}
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          Target
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {goal.target}{" "}
                          <span className="text-sm font-medium text-slate-400">
                            {goal.unit}
                          </span>
                        </p>
                      </div>

                    </div>

                    {/* PROGRESS */}

                    <div className="mt-5">

                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Progress
                        </p>

                        <p
                          className={`text-sm font-bold ${colors.text}`}
                        >
                          {progress}%
                        </p>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>
                    </div>

                    {/* BUTTONS */}

                    <div className="mt-6 flex flex-wrap gap-3">

                      {!goal.completed ? (
                        <>
                          <button
                            onClick={() =>
                              increaseProgress(goal.id)
                            }
                            className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                          >
                            <Plus size={16} />
                            Update Progress
                          </button>

                          <button
                            onClick={() =>
                              completeGoal(goal.id)
                            }
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                          >
                            <CheckCircle2 size={16} />
                            Mark Complete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            resetGoal(goal.id)
                          }
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                          <RotateCcw size={16} />
                          Restart Goal
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

              <Target
                size={42}
                className="mx-auto text-green-500"
              />

              <h3 className="mt-4 text-xl font-bold">
                No goals found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add a new goal or choose another filter.
              </p>

              <button
                onClick={() =>
                  setShowGoalForm(true)
                }
                className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                <Plus size={17} />
                Create Goal
              </button>

            </div>
          )}

        </section>

        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Lightbulb
                  size={24}
                  className="text-green-200"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                  EcoTrack Goals
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Measure it. Improve it.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100">
                  Track your energy consumption regularly to
                  understand whether you are moving toward your
                  goals.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  navigate("/calculator")
                }
                className="flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Calculator size={17} />
                Calculator
              </button>

              <button
                onClick={() =>
                  navigate("/tracker")
                }
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Track Energy
                <ArrowRight size={17} />
              </button>

            </div>

          </div>
        </section>

      </main>

      {/* ================================================= */}
      {/* ADD GOAL MODAL */}
      {/* ================================================= */}

      {showGoalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">

              <div>
                <h2 className="text-xl font-bold">
                  Add New Goal
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a goal and start tracking your
                  progress.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowGoalForm(false)
                }
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddGoal}
              className="p-6"
            >

              {/* TITLE */}

              <label className="text-sm font-semibold text-slate-700">
                Goal Title *
              </label>

              <input
                type="text"
                value={goalTitle}
                onChange={(e) =>
                  setGoalTitle(e.target.value)
                }
                placeholder="Example: Reduce AC usage"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              {/* TYPE */}

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Goal Type *
              </label>

              <select
                value={goalType}
                onChange={(e) =>
                  setGoalType(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
              >
                <option value="Energy">
                  Energy
                </option>

                <option value="Cost">
                  Cost
                </option>

                <option value="Carbon">
                  Carbon
                </option>

                <option value="Actions">
                  Actions
                </option>
              </select>

              {/* TARGET + CURRENT */}

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Target *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={target}
                    onChange={(e) =>
                      setTarget(e.target.value)
                    }
                    placeholder="100"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Current Progress
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={current}
                    onChange={(e) =>
                      setCurrent(e.target.value)
                    }
                    placeholder="0"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>

              {/* DEADLINE */}

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Deadline *
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) =>
                  setDeadline(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />

              {/* INFO */}

              <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">

                <div className="flex items-start gap-3">

                  <Target
                    size={19}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="text-sm leading-6 text-green-700">
                    Your progress percentage will be calculated
                    automatically using your current value and
                    target value.
                  </p>

                </div>
              </div>

              {/* FORM BUTTONS */}

              <div className="mt-7 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowGoalForm(false)
                  }
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Plus size={17} />
                  Create Goal
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Goals;