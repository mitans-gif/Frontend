import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lightbulb,
  Zap,
  Droplets,
  Recycle,
  Sun,
  Wind,
  Power,
  Leaf,
  CheckCircle2,
  Circle,
  ArrowRight,
  ChevronRight,
  X,
  RotateCcw,
  Calculator,
  Activity,
} from "lucide-react";

const Actions = () => {
  const navigate = useNavigate();

  // -----------------------------------------
  // STATE
  // -----------------------------------------

  const [activeCategory, setActiveCategory] = useState("All");

  const [completedActions, setCompletedActions] = useState([]);

  const [selectedAction, setSelectedAction] = useState(null);

  // -----------------------------------------
  // ACTION DATA
  // -----------------------------------------

  const actions = [
    {
      id: 1,
      title: "Switch Off Unused Lights",
      category: "Energy",
      icon: Lightbulb,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      difficulty: "Easy",
      saving: "2 kWh/month",
      impact: "Low",
      description:
        "Turn off lights whenever you leave a room or when natural daylight is enough.",
      steps: [
        "Check rooms before leaving",
        "Switch off unnecessary lights",
        "Use natural daylight whenever possible",
      ],
    },

    {
      id: 2,
      title: "Unplug Standby Devices",
      category: "Energy",
      icon: Power,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      difficulty: "Easy",
      saving: "4 kWh/month",
      impact: "Medium",
      description:
        "Many electronic devices continue using small amounts of electricity while connected to power.",
      steps: [
        "Identify devices that stay plugged in",
        "Switch them off completely",
        "Unplug chargers when they are not needed",
      ],
    },

    {
      id: 3,
      title: "Reduce AC Usage",
      category: "Energy",
      icon: Zap,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      difficulty: "Medium",
      saving: "15 kWh/month",
      impact: "High",
      description:
        "Reducing unnecessary air-conditioner usage can significantly lower electricity consumption.",
      steps: [
        "Set the temperature around 24–26°C",
        "Keep doors and windows closed",
        "Clean AC filters regularly",
      ],
    },

    {
      id: 4,
      title: "Save Water",
      category: "Water",
      icon: Droplets,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      difficulty: "Easy",
      saving: "Energy + Water",
      impact: "Medium",
      description:
        "Using water responsibly also helps reduce the energy required for pumping and heating water.",
      steps: [
        "Close taps when water is not required",
        "Fix leaking taps",
        "Avoid unnecessary water usage",
      ],
    },

    {
      id: 5,
      title: "Recycle Electronic Waste",
      category: "Waste",
      icon: Recycle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      difficulty: "Medium",
      saving: "Resource Saving",
      impact: "High",
      description:
        "Properly recycling electronic waste helps recover useful materials and prevents harmful waste from entering the environment.",
      steps: [
        "Separate old electronic devices",
        "Do not throw electronics with regular waste",
        "Use responsible e-waste collection facilities",
      ],
    },

    {
      id: 6,
      title: "Use Solar Energy",
      category: "Renewable",
      icon: Sun,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      difficulty: "Medium",
      saving: "Clean Energy",
      impact: "High",
      description:
        "Solar energy uses sunlight to generate clean electricity and reduce dependence on conventional energy sources.",
      steps: [
        "Learn about solar energy",
        "Explore rooftop solar options",
        "Use solar-powered devices where suitable",
      ],
    },

    {
      id: 7,
      title: "Learn About Wind Energy",
      category: "Renewable",
      icon: Wind,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      difficulty: "Easy",
      saving: "Clean Energy",
      impact: "Medium",
      description:
        "Wind energy converts the movement of air into electricity using wind turbines.",
      steps: [
        "Learn how wind turbines work",
        "Understand renewable energy benefits",
        "Explore clean energy technologies",
      ],
    },

    {
      id: 8,
      title: "Track Your Daily Usage",
      category: "Energy",
      icon: Activity,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      difficulty: "Easy",
      saving: "Better Insights",
      impact: "High",
      description:
        "Regularly tracking your energy consumption helps identify high-energy appliances and unnecessary usage.",
      steps: [
        "Record appliance usage",
        "Check daily energy consumption",
        "Identify appliances using the most energy",
      ],
    },
  ];

  // -----------------------------------------
  // CATEGORIES
  // -----------------------------------------

  const categories = [
    "All",
    "Energy",
    "Water",
    "Waste",
    "Renewable",
  ];

  // -----------------------------------------
  // FILTERED ACTIONS
  // -----------------------------------------

  const filteredActions =
    activeCategory === "All"
      ? actions
      : actions.filter(
          (action) => action.category === activeCategory
        );

  // -----------------------------------------
  // FUNCTIONS
  // -----------------------------------------

  const handleStartAction = (id) => {
    if (!completedActions.includes(id)) {
      setCompletedActions([
        ...completedActions,
        id,
      ]);
    }
  };

  const handleCompleteAction = (id) => {
    if (!completedActions.includes(id)) {
      setCompletedActions([
        ...completedActions,
        id,
      ]);
    }
  };

  const handleViewDetails = (action) => {
    setSelectedAction(action);
  };

  const closeModal = () => {
    setSelectedAction(null);
  };

  const resetProgress = () => {
    setCompletedActions([]);
  };

  const handleTrackEnergy = () => {
    navigate("/tracker");
  };

  const handleCalculator = () => {
    navigate("/calculator");
  };

  // -----------------------------------------
  // RETURN
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">

      <main className="p-5 md:p-7 lg:p-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Take Action
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#102b43] md:text-4xl">
              Energy Actions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Turn your energy knowledge into simple daily
              actions that can make a real difference.
            </p>

          </div>


          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleCalculator}
              className="
                flex items-center gap-2
                rounded-lg
                border border-green-600
                bg-white
                px-4 py-3
                text-sm font-semibold
                text-green-700
                transition
                hover:bg-green-50
              "
            >
              <Calculator size={17} />
              Calculate Savings
            </button>


            <button
              onClick={handleTrackEnergy}
              className="
                flex items-center gap-2
                rounded-lg
                bg-green-600
                px-4 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-green-700
              "
            >
              Track Energy
              <ArrowRight size={17} />
            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROGRESS SECTION */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">

                <Leaf
                  size={27}
                  className="text-green-600"
                />

              </div>


              <div>

                <p className="text-sm text-slate-500">
                  Your progress
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#102b43]">

                  {completedActions.length}
                  <span className="text-slate-400">
                    {" "}
                    / {actions.length}
                  </span>

                </h2>

              </div>

            </div>


            <div className="min-w-0 flex-1 md:max-w-xl">

              <div className="mb-2 flex justify-between text-xs">

                <span className="font-medium text-slate-500">
                  Actions completed
                </span>

                <span className="font-bold text-green-600">
                  {Math.round(
                    (completedActions.length /
                      actions.length) *
                      100
                  )}
                  %
                </span>

              </div>


              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-500"
                  style={{
                    width: `${
                      (completedActions.length /
                        actions.length) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>


            <button
              onClick={resetProgress}
              className="
                flex w-fit items-center gap-2
                rounded-lg
                border border-slate-200
                px-4 py-2.5
                text-sm font-semibold
                text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              <RotateCcw size={16} />
              Reset
            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* CATEGORY FILTER */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="font-bold text-[#102b43]">
                Choose an action
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Filter actions by category.
              </p>

            </div>


            <div className="flex flex-wrap gap-2">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    rounded-lg
                    px-4 py-2
                    text-sm
                    font-semibold
                    transition
                    ${
                      activeCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-700"
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* ACTION CARDS */}
        {/* ================================================= */}

        <section className="mt-7">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-[#102b43]">
              Recommended actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pick an action and start making a difference.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {filteredActions.map((action) => {

              const Icon = action.icon;

              const isCompleted =
                completedActions.includes(action.id);

              return (

                <div
                  key={action.id}
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-4">

                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${action.iconBg}`}
                      >

                        <Icon
                          size={27}
                          className={action.iconColor}
                        />

                      </div>


                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-lg font-bold text-[#102b43]">
                            {action.title}
                          </h3>

                          {isCompleted && (

                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">

                              <CheckCircle2 size={13} />

                              Completed

                            </span>

                          )}

                        </div>


                        <p className="mt-1 text-sm text-slate-400">
                          {action.category}
                        </p>

                      </div>

                    </div>


                    <span
                      className={`
                        rounded-full
                        px-3 py-1
                        text-xs
                        font-semibold
                        ${
                          action.impact === "High"
                            ? "bg-green-100 text-green-700"
                            : action.impact === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {action.impact} Impact
                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>


                  {/* INFO */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-green-50 p-4">

                      <p className="text-xs text-slate-500">
                        Potential benefit
                      </p>

                      <p className="mt-1 text-sm font-bold text-green-700">
                        {action.saving}
                      </p>

                    </div>


                    <div className="rounded-xl bg-slate-50 p-4">

                      <p className="text-xs text-slate-500">
                        Difficulty
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#102b43]">
                        {action.difficulty}
                      </p>

                    </div>

                  </div>


                  {/* BUTTONS */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        handleViewDetails(action)
                      }
                      className="
                        flex items-center gap-2
                        rounded-lg
                        border border-slate-200
                        px-4 py-2.5
                        text-sm font-semibold
                        text-[#102b43]
                        transition
                        hover:border-green-300
                        hover:bg-green-50
                        hover:text-green-700
                      "
                    >
                      View Details
                      <ChevronRight size={16} />
                    </button>


                    {!isCompleted ? (

                      <button
                        onClick={() =>
                          handleStartAction(action.id)
                        }
                        className="
                          flex items-center gap-2
                          rounded-lg
                          bg-green-600
                          px-4 py-2.5
                          text-sm font-semibold
                          text-white
                          transition
                          hover:bg-green-700
                        "
                      >
                        Start Action
                        <ArrowRight size={16} />
                      </button>

                    ) : (

                      <button
                        disabled
                        className="
                          flex items-center gap-2
                          rounded-lg
                          bg-green-100
                          px-4 py-2.5
                          text-sm font-semibold
                          text-green-700
                        "
                      >
                        <CheckCircle2 size={17} />
                        Completed
                      </button>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </section>


        {/* ================================================= */}
        {/* MOTIVATION SECTION */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">

                <Leaf
                  size={24}
                  className="text-green-200"
                />

              </div>


              <div>

                <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                  Keep going
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Every small action counts.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100">
                  Sustainable habits become easier when you
                  practice them every day.
                </p>

              </div>

            </div>


            <button
              onClick={handleTrackEnergy}
              className="
                flex shrink-0 items-center gap-2
                rounded-lg
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-green-700
                transition
                hover:bg-green-50
              "
            >
              Track My Energy
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

              <Lightbulb
                size={22}
                className="text-green-600"
              />

            </div>


            <div>

              <h3 className="font-bold text-green-800">
                EcoTip
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                Start with one easy action today. Once it
                becomes a habit, choose another action and
                continue improving your energy efficiency.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {selectedAction && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${selectedAction.iconBg}`}
                >

                  {React.createElement(
                    selectedAction.icon,
                    {
                      size: 24,
                      className:
                        selectedAction.iconColor,
                    }
                  )}

                </div>


                <div>

                  <h2 className="text-xl font-bold text-[#102b43]">
                    {selectedAction.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedAction.category}
                  </p>

                </div>

              </div>


              <button
                onClick={closeModal}
                className="
                  rounded-full
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* BODY */}

            <div className="p-6">

              <p className="text-sm leading-6 text-slate-600">
                {selectedAction.description}
              </p>


              {/* BENEFIT */}

              <div className="mt-5 rounded-xl bg-green-50 p-4">

                <p className="text-xs text-slate-500">
                  Potential benefit
                </p>

                <p className="mt-1 text-xl font-bold text-green-700">
                  {selectedAction.saving}
                </p>

              </div>


              {/* STEPS */}

              <div className="mt-6">

                <h3 className="font-bold text-[#102b43]">
                  How to do it
                </h3>


                <div className="mt-4 space-y-3">

                  {selectedAction.steps.map(
                    (step, index) => (

                      <div
                        key={step}
                        className="flex items-start gap-3"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                          {index + 1}
                        </div>

                        <p className="pt-1 text-sm text-slate-600">
                          {step}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* MODAL BUTTONS */}

              <div className="mt-7 flex justify-end gap-3">

                <button
                  onClick={closeModal}
                  className="
                    rounded-lg
                    border border-slate-200
                    px-5 py-2.5
                    text-sm font-semibold
                    text-slate-600
                    hover:bg-slate-50
                  "
                >
                  Close
                </button>


                {!completedActions.includes(
                  selectedAction.id
                ) ? (

                  <button
                    onClick={() => {
                      handleCompleteAction(
                        selectedAction.id
                      );
                      closeModal();
                    }}
                    className="
                      flex items-center gap-2
                      rounded-lg
                      bg-green-600
                      px-5 py-2.5
                      text-sm font-semibold
                      text-white
                      hover:bg-green-700
                    "
                  >
                    <CheckCircle2 size={17} />
                    Mark as Complete
                  </button>

                ) : (

                  <button
                    disabled
                    className="
                      flex items-center gap-2
                      rounded-lg
                      bg-green-100
                      px-5 py-2.5
                      text-sm font-semibold
                      text-green-700
                    "
                  >
                    <CheckCircle2 size={17} />
                    Completed
                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Actions;