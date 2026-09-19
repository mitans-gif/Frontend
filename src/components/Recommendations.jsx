import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lightbulb,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Monitor,
  Zap,
  Leaf,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  TrendingDown,
  X,
  ChevronRight,
  Calculator,
} from "lucide-react";

const Recommendations = () => {
  const navigate = useNavigate();

  // -----------------------------------------
  // STATE
  // -----------------------------------------

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRecommendation, setSelectedRecommendation] =
    useState(null);

  const [completedRecommendations, setCompletedRecommendations] =
    useState([]);

  // -----------------------------------------
  // RECOMMENDATION DATA
  // -----------------------------------------

  const recommendations = [
    {
      id: 1,
      title: "Switch to LED Bulbs",
      category: "Lighting",
      appliance: "Lights",
      icon: Lightbulb,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      priority: "High",
      saving: "₹120/month",
      energySaving: "12 kWh/month",
      description:
        "Replace traditional bulbs with LED bulbs. LEDs consume less electricity and have a longer lifespan.",
      tips: [
        "Replace high-wattage bulbs with LED bulbs",
        "Turn off lights when leaving a room",
        "Use natural daylight whenever possible",
      ],
    },

    {
      id: 2,
      title: "Optimize AC Usage",
      category: "Cooling",
      appliance: "Air Conditioner",
      icon: Snowflake,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      priority: "High",
      saving: "₹450/month",
      energySaving: "35 kWh/month",
      description:
        "Reducing unnecessary air-conditioner usage can significantly lower electricity consumption and cost.",
      tips: [
        "Set AC temperature around 24–26°C",
        "Clean AC filters regularly",
        "Keep doors and windows closed while AC is running",
      ],
    },

    {
      id: 3,
      title: "Improve Refrigerator Efficiency",
      category: "Kitchen",
      appliance: "Refrigerator",
      icon: Refrigerator,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      priority: "Medium",
      saving: "₹180/month",
      energySaving: "15 kWh/month",
      description:
        "Proper refrigerator usage can reduce unnecessary energy consumption and improve cooling efficiency.",
      tips: [
        "Avoid opening the refrigerator unnecessarily",
        "Keep the refrigerator away from direct sunlight",
        "Allow enough space around the refrigerator",
      ],
    },

    {
      id: 4,
      title: "Use Washing Machine Efficiently",
      category: "Kitchen",
      appliance: "Washing Machine",
      icon: WashingMachine,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      priority: "Medium",
      saving: "₹95/month",
      energySaving: "8 kWh/month",
      description:
        "Running full loads and selecting efficient washing modes can help reduce energy and water consumption.",
      tips: [
        "Run full loads instead of small loads",
        "Use eco or quick modes when suitable",
        "Avoid unnecessary hot-water washing",
      ],
    },

    {
      id: 5,
      title: "Reduce Standby Power",
      category: "General",
      appliance: "Electronics",
      icon: Monitor,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      priority: "High",
      saving: "₹75/month",
      energySaving: "6 kWh/month",
      description:
        "Devices can consume electricity even when they are not actively being used. Switching them off completely can reduce standby consumption.",
      tips: [
        "Switch off devices at the power socket",
        "Unplug chargers when not needed",
        "Use a power strip to control multiple devices",
      ],
    },

    {
      id: 6,
      title: "Track High Energy Appliances",
      category: "General",
      appliance: "All Appliances",
      icon: Zap,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      priority: "High",
      saving: "₹250/month",
      energySaving: "20 kWh/month",
      description:
        "Tracking individual appliances helps identify which devices consume the most energy.",
      tips: [
        "Record appliance power consumption",
        "Compare daily usage hours",
        "Focus on appliances with high energy consumption",
      ],
    },
  ];

  // -----------------------------------------
  // CATEGORIES
  // -----------------------------------------

  const categories = [
    "All",
    "Lighting",
    "Cooling",
    "Kitchen",
    "General",
  ];

  // -----------------------------------------
  // FILTER
  // -----------------------------------------

  const filteredRecommendations =
    activeCategory === "All"
      ? recommendations
      : recommendations.filter(
          (item) => item.category === activeCategory
        );

  // -----------------------------------------
  // FUNCTIONS
  // -----------------------------------------

  const handleViewDetails = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const closeDetails = () => {
    setSelectedRecommendation(null);
  };

  const handleApply = (recommendation) => {
    if (!completedRecommendations.includes(recommendation.id)) {
      setCompletedRecommendations([
        ...completedRecommendations,
        recommendation.id,
      ]);
    }

    setSelectedRecommendation(null);
  };

  const handleMarkDone = (id) => {
    if (!completedRecommendations.includes(id)) {
      setCompletedRecommendations([
        ...completedRecommendations,
        id,
      ]);
    }
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

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Smart Energy Tips
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#102b43] md:text-4xl">
              Recommendations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Discover simple ways to reduce your energy consumption,
              lower your electricity bill and build sustainable habits.
            </p>

          </div>


          {/* TOP BUTTON */}

          <button
            onClick={handleCalculator}
            className="
              flex w-fit items-center gap-2
              rounded-lg
              bg-green-600
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-green-700
            "
          >
            <Calculator size={18} />
            Calculate Savings
          </button>

        </div>


        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* CARD 1 */}

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Recommendations
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#102b43]">
                  {recommendations.length}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <Leaf
                  size={22}
                  className="text-green-600"
                />
              </div>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Available for you
            </p>

          </div>


          {/* CARD 2 */}

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Potential Saving
                </p>

                <h2 className="mt-1 text-2xl font-bold text-blue-600">
                  ₹1,170
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                <CircleDollarSign
                  size={22}
                  className="text-blue-600"
                />
              </div>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Estimated monthly
            </p>

          </div>


          {/* CARD 3 */}

          <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Energy Saving
                </p>

                <h2 className="mt-1 text-2xl font-bold text-yellow-600">
                  96 kWh
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100">
                <TrendingDown
                  size={22}
                  className="text-yellow-600"
                />
              </div>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Potential monthly saving
            </p>

          </div>


          {/* CARD 4 */}

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <h2 className="mt-1 text-2xl font-bold text-purple-600">
                  {completedRecommendations.length}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100">
                <CheckCircle2
                  size={22}
                  className="text-purple-600"
                />
              </div>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Actions completed
            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* FILTER */}
        {/* ================================================= */}

        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="font-bold text-[#102b43]">
                Find recommendations
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Select a category to filter recommendations.
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
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-700"
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* RECOMMENDATION CARDS */}
        {/* ================================================= */}

        <section className="mt-7">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-[#102b43]">
              Recommended for you
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Practical actions that can help you save energy.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {filteredRecommendations.map((item) => {

              const Icon = item.icon;

              const isCompleted =
                completedRecommendations.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  {/* CARD TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-4">

                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                      >

                        <Icon
                          size={27}
                          className={item.iconColor}
                        />

                      </div>


                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-lg font-bold text-[#102b43]">
                            {item.title}
                          </h3>

                          {isCompleted && (
                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                              Completed
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-slate-400">
                          {item.appliance}
                        </p>

                      </div>

                    </div>


                    {/* PRIORITY */}

                    <span
                      className={`
                        rounded-full
                        px-3 py-1
                        text-xs
                        font-semibold
                        ${
                          item.priority === "High"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-700"
                        }
                      `}
                    >
                      {item.priority}
                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>


                  {/* SAVINGS */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-green-50 p-4">

                      <p className="text-xs text-slate-500">
                        Estimated saving
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-700">
                        {item.saving}
                      </p>

                    </div>


                    <div className="rounded-xl bg-blue-50 p-4">

                      <p className="text-xs text-slate-500">
                        Energy saving
                      </p>

                      <p className="mt-1 text-lg font-bold text-blue-700">
                        {item.energySaving}
                      </p>

                    </div>

                  </div>


                  {/* BUTTONS */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    {/* VIEW DETAILS */}

                    <button
                      onClick={() =>
                        handleViewDetails(item)
                      }
                      className="
                        flex items-center gap-2
                        rounded-lg
                        border border-slate-200
                        bg-white
                        px-4 py-2.5
                        text-sm
                        font-semibold
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


                    {/* APPLY */}

                    {!isCompleted && (
                      <button
                        onClick={() =>
                          handleApply(item)
                        }
                        className="
                          flex items-center gap-2
                          rounded-lg
                          bg-green-600
                          px-4 py-2.5
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-green-700
                        "
                      >
                        Apply Recommendation
                        <ArrowRight size={16} />
                      </button>
                    )}


                    {/* DONE */}

                    {isCompleted && (
                      <button
                        onClick={() =>
                          handleMarkDone(item.id)
                        }
                        disabled
                        className="
                          flex items-center gap-2
                          rounded-lg
                          bg-green-100
                          px-4 py-2.5
                          text-sm
                          font-semibold
                          text-green-700
                        "
                      >
                        <CheckCircle2 size={16} />
                        Done
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>


          {/* NO RESULTS */}

          {filteredRecommendations.length === 0 && (

            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

              <Leaf
                size={35}
                className="mx-auto text-green-500"
              />

              <h3 className="mt-4 text-lg font-bold">
                No recommendations found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try selecting another category.
              </p>

            </div>

          )}

        </section>


        {/* ================================================= */}
        {/* TRACK ENERGY SECTION */}
        {/* ================================================= */}

        <section className="mt-7 overflow-hidden rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">

                  <Zap
                    size={24}
                    className="text-green-200"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                    Track smarter
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Know where your energy goes
                  </h2>

                </div>

              </div>


              <p className="mt-4 text-sm leading-6 text-green-100">
                Track your appliances and energy consumption to
                understand which areas need improvement.
              </p>

            </div>


            <button
              onClick={handleTrackEnergy}
              className="
                flex w-fit shrink-0
                items-center gap-2
                rounded-lg
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-green-700
                transition
                hover:bg-green-50
              "
            >
              Track Energy
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* ECO TIP */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">

              <Leaf
                size={22}
                className="text-green-600"
              />

            </div>


            <div>

              <h3 className="font-bold text-green-800">
                EcoTip
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                The best recommendation is one that becomes a
                daily habit. Start with one small change and
                gradually improve your energy efficiency.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {selectedRecommendation && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${selectedRecommendation.iconBg}`}
                >

                  {React.createElement(
                    selectedRecommendation.icon,
                    {
                      size: 24,
                      className:
                        selectedRecommendation.iconColor,
                    }
                  )}

                </div>


                <div>

                  <h2 className="text-xl font-bold text-[#102b43]">
                    {selectedRecommendation.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedRecommendation.appliance}
                  </p>

                </div>

              </div>


              <button
                onClick={closeDetails}
                className="
                  rounded-full
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6">

              <p className="text-sm leading-6 text-slate-600">
                {selectedRecommendation.description}
              </p>


              {/* SAVINGS */}

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-green-50 p-4">

                  <p className="text-xs text-slate-500">
                    Estimated monthly saving
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    {selectedRecommendation.saving}
                  </p>

                </div>


                <div className="rounded-xl bg-blue-50 p-4">

                  <p className="text-xs text-slate-500">
                    Energy saving
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-700">
                    {selectedRecommendation.energySaving}
                  </p>

                </div>

              </div>


              {/* TIPS */}

              <div className="mt-6">

                <h3 className="font-bold text-[#102b43]">
                  What you can do
                </h3>


                <div className="mt-4 space-y-3">

                  {selectedRecommendation.tips.map(
                    (tip) => (

                      <div
                        key={tip}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-green-600"
                        />

                        <p className="text-sm text-slate-600">
                          {tip}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* MODAL BUTTONS */}

              <div className="mt-7 flex flex-wrap justify-end gap-3">

                <button
                  onClick={closeDetails}
                  className="
                    rounded-lg
                    border border-slate-200
                    px-5 py-2.5
                    text-sm
                    font-semibold
                    text-slate-600
                    hover:bg-slate-50
                  "
                >
                  Close
                </button>


                <button
                  onClick={() =>
                    handleApply(selectedRecommendation)
                  }
                  className="
                    flex items-center gap-2
                    rounded-lg
                    bg-green-600
                    px-5 py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-green-700
                  "
                >
                  <CheckCircle2 size={17} />
                  Apply Recommendation
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Recommendations;