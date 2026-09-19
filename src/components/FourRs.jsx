import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowDown,
  RefreshCw,
  Recycle,
  Zap,
  Lightbulb,
  Leaf,
  Sun,
  Wind,
  Droplets,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";

const FourRs = () => {
  const navigate = useNavigate();

  // -----------------------------------------
  // STATE
  // -----------------------------------------

  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState(null);

  // -----------------------------------------
  // 4R DATA
  // -----------------------------------------

  const fourRs = [
    {
      number: "01",
      title: "Reduce",
      subtitle: "Use Less",
      description:
        "Use less energy by eliminating unnecessary consumption and avoiding waste.",
      icon: ArrowDown,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      tips: [
        "Switch off unused lights and appliances",
        "Use energy-efficient appliances",
        "Avoid unnecessary electricity usage",
      ],
    },

    {
      number: "02",
      title: "Reuse",
      subtitle: "Use Again",
      description:
        "Give products and resources a longer life instead of replacing them unnecessarily.",
      icon: RefreshCw,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      tips: [
        "Repair products before replacing them",
        "Reuse useful materials",
        "Extend the life of electronic devices",
      ],
    },

    {
      number: "03",
      title: "Recycle",
      subtitle: "Recover Resources",
      description:
        "Recycle materials properly so useful resources can be recovered and environmental waste can be reduced.",
      icon: Recycle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      tips: [
        "Separate recyclable materials",
        "Recycle electronic waste responsibly",
        "Avoid unnecessary disposable products",
      ],
    },

    {
      number: "04",
      title: "Renew",
      subtitle: "Choose Clean Energy",
      description:
        "Move toward clean and renewable energy sources such as solar, wind and hydro.",
      icon: Zap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      tips: [
        "Learn about solar energy",
        "Explore renewable energy options",
        "Reduce dependence on fossil fuels",
      ],
    },
  ];

  // -----------------------------------------
  // QUICK ACTION DATA
  // -----------------------------------------

  const quickActions = {
    "Reduce Waste": {
      title: "Reduce Waste",
      icon: ArrowDown,
      color: "text-green-600",
      bg: "bg-green-100",
      description:
        "Reduce unnecessary energy and material consumption by using only what you need.",
      points: [
        "Turn off lights when leaving a room",
        "Unplug devices that are not being used",
        "Choose energy-efficient appliances",
        "Avoid unnecessary electricity consumption",
      ],
    },

    "Save Energy": {
      title: "Save Energy",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description:
        "Small changes in daily habits can help lower your energy consumption and electricity bill.",
      points: [
        "Use natural light whenever possible",
        "Reduce unnecessary appliance usage",
        "Use efficient LED lighting",
        "Track your energy consumption regularly",
      ],
    },

    "Protect Nature": {
      title: "Protect Nature",
      icon: Leaf,
      color: "text-green-600",
      bg: "bg-green-100",
      description:
        "Responsible energy use helps conserve resources and supports a cleaner environment.",
      points: [
        "Reduce your carbon footprint",
        "Recycle electronic waste properly",
        "Choose renewable energy where possible",
        "Avoid wasting electricity and resources",
      ],
    },
  };

  // -----------------------------------------
  // RENEWABLE ENERGY DATA
  // -----------------------------------------

  const renewableEnergy = [
    {
      name: "Solar Energy",
      icon: Sun,
      color: "text-yellow-300",
      description:
        "Harness energy from sunlight to generate clean and abundant electricity.",
      details:
        "Solar panels convert sunlight into electricity. Solar energy is renewable and can help reduce dependence on conventional energy sources.",
    },

    {
      name: "Wind Energy",
      icon: Wind,
      color: "text-cyan-300",
      description:
        "Convert wind movement into electricity using wind turbines.",
      details:
        "Wind turbines use the movement of air to generate electricity without directly burning fossil fuels.",
    },

    {
      name: "Hydro Energy",
      icon: Droplets,
      color: "text-blue-300",
      description:
        "Use flowing water to generate sustainable and renewable electricity.",
      details:
        "Hydropower uses moving water to turn turbines and generate electricity.",
    },
  ];

  // -----------------------------------------
  // FUNCTIONS
  // -----------------------------------------

  const handleQuickAction = (action) => {
    setSelectedAction(action);
  };

  const closeQuickAction = () => {
    setSelectedAction(null);
  };

  const handleEnergyClick = (energy) => {
    setSelectedEnergy(energy);
  };

  const closeEnergy = () => {
    setSelectedEnergy(null);
  };

  const handleExploreActions = () => {
    navigate("/actions");
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">

      <main className="p-5 md:p-7 lg:p-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Sustainability
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#102b43] md:text-4xl">
            The 4 R's of Energy
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Simple principles that can help us reduce waste,
            conserve resources and move toward a more sustainable
            future.
          </p>
        </div>


        {/* ================================================= */}
        {/* HERO SECTION */}
        {/* ================================================= */}

        <div className="mt-7 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-[#eaf8ee] to-white shadow-sm">

          <div className="grid grid-cols-1 items-center gap-8 p-6 md:p-8 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <Leaf
                  size={25}
                  className="text-white"
                />
              </div>

              <h2 className="text-3xl font-bold leading-tight text-[#102b43]">
                Small actions.
                <br />
                Big difference.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                The 4 R's provide a simple way to think about
                responsible energy use and sustainability.
                Every small action can contribute to a cleaner
                future.
              </p>


              {/* QUICK ACTION BUTTONS */}

              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    handleQuickAction("Reduce Waste")
                  }
                  className="
                    rounded-full
                    bg-white
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-green-700
                    shadow-sm
                    transition
                    hover:bg-green-600
                    hover:text-white
                  "
                >
                  Reduce Waste
                </button>


                <button
                  onClick={() =>
                    handleQuickAction("Save Energy")
                  }
                  className="
                    rounded-full
                    bg-white
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-green-700
                    shadow-sm
                    transition
                    hover:bg-green-600
                    hover:text-white
                  "
                >
                  Save Energy
                </button>


                <button
                  onClick={() =>
                    handleQuickAction("Protect Nature")
                  }
                  className="
                    rounded-full
                    bg-white
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-green-700
                    shadow-sm
                    transition
                    hover:bg-green-600
                    hover:text-white
                  "
                >
                  Protect Nature
                </button>

              </div>


              {/* QUICK ACTION RESULT */}

              {selectedAction && (
                <div className="mt-5 rounded-xl border border-green-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-3">

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          quickActions[selectedAction].bg
                        }`}
                      >

                        {React.createElement(
                          quickActions[selectedAction].icon,
                          {
                            size: 20,
                            className:
                              quickActions[selectedAction].color,
                          }
                        )}

                      </div>

                      <div>

                        <h3 className="font-bold text-[#102b43]">
                          {quickActions[selectedAction].title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {quickActions[selectedAction].description}
                        </p>

                      </div>

                    </div>


                    <button
                      onClick={closeQuickAction}
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X size={18} />
                    </button>

                  </div>


                  <div className="mt-4 space-y-2">

                    {quickActions[selectedAction].points.map(
                      (point) => (
                        <div
                          key={point}
                          className="flex items-start gap-2"
                        >

                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-green-600"
                          />

                          <p className="text-sm text-slate-600">
                            {point}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>


            {/* RIGHT 4 ICONS */}

            <div className="flex justify-center">

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={() =>
                    handleQuickAction("Reduce Waste")
                  }
                  className="
                    flex h-32 w-32
                    flex-col items-center justify-center
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1 ring-green-100
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  <ArrowDown
                    size={30}
                    className="text-green-600"
                  />

                  <p className="mt-2 font-bold text-[#102b43]">
                    Reduce
                  </p>

                </button>


                <button
                  onClick={() =>
                    setSelectedAction(null)
                  }
                  className="
                    flex h-32 w-32
                    flex-col items-center justify-center
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1 ring-blue-100
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  <RefreshCw
                    size={30}
                    className="text-blue-600"
                  />

                  <p className="mt-2 font-bold text-[#102b43]">
                    Reuse
                  </p>

                </button>


                <button
                  onClick={() =>
                    setSelectedAction("Protect Nature")
                  }
                  className="
                    flex h-32 w-32
                    flex-col items-center justify-center
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1 ring-yellow-100
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  <Recycle
                    size={30}
                    className="text-yellow-600"
                  />

                  <p className="mt-2 font-bold text-[#102b43]">
                    Recycle
                  </p>

                </button>


                <button
                  onClick={() =>
                    handleQuickAction("Save Energy")
                  }
                  className="
                    flex h-32 w-32
                    flex-col items-center justify-center
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1 ring-purple-100
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  <Zap
                    size={30}
                    className="text-purple-600"
                  />

                  <p className="mt-2 font-bold text-[#102b43]">
                    Renew
                  </p>

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* 4R CARDS */}
        {/* ================================================= */}

        <section className="mt-7">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-[#102b43]">
              Understand the 4 R's
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Four simple principles for a more sustainable
              lifestyle.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {fourRs.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
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

                  {/* CARD HEADER */}

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${item.iconBg}`}
                    >

                      <Icon
                        size={27}
                        className={item.iconColor}
                      />

                    </div>


                    <div>

                      <p className="text-xs font-semibold text-slate-400">
                        {item.number}
                      </p>

                      <h3 className="text-xl font-bold text-[#102b43]">
                        {item.title}
                      </h3>

                      <p
                        className={`text-sm font-medium ${item.iconColor}`}
                      >
                        {item.subtitle}
                      </p>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>


                  {/* TIPS */}

                  <div className="mt-5 border-t border-slate-100 pt-5">

                    <p className="mb-3 text-sm font-bold text-[#102b43]">
                      Simple actions
                    </p>


                    <div className="space-y-3">

                      {item.tips.map((tip) => (

                        <div
                          key={tip}
                          className="flex items-start gap-2.5"
                        >

                          <CheckCircle2
                            size={17}
                            className={`mt-0.5 shrink-0 ${item.iconColor}`}
                          />

                          <p className="text-sm text-slate-600">
                            {tip}
                          </p>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>
              );

            })}

          </div>

        </section>


        {/* ================================================= */}
        {/* RENEWABLE ENERGY */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
              Renew
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Move toward clean energy
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-green-100">
              Renewable energy uses naturally replenished
              resources to produce cleaner and more sustainable
              electricity.
            </p>

          </div>


          {/* ENERGY CARDS */}

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">

            {renewableEnergy.map((energy) => {

              const Icon = energy.icon;

              return (
                <button
                  key={energy.name}
                  onClick={() =>
                    handleEnergyClick(energy)
                  }
                  className="
                    text-left
                    rounded-xl
                    border border-white/10
                    bg-white/10
                    p-5
                    transition
                    hover:bg-white/15
                    hover:-translate-y-1
                  "
                >

                  <Icon
                    size={35}
                    className={energy.color}
                  />

                  <h3 className="mt-4 text-lg font-bold">
                    {energy.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-green-100">
                    {energy.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-white">
                    Learn more
                    <ArrowRight size={15} />
                  </div>

                </button>
              );

            })}

          </div>


          {/* ENERGY DETAIL */}

          {selectedEnergy && (

            <div className="mt-5 rounded-xl border border-white/10 bg-white p-5 text-[#102b43]">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">

                    {React.createElement(
                      selectedEnergy.icon,
                      {
                        size: 22,
                        className: "text-green-600",
                      }
                    )}

                  </div>

                  <h3 className="text-lg font-bold">
                    {selectedEnergy.name}
                  </h3>

                </div>


                <button
                  onClick={closeEnergy}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>

              </div>


              <p className="mt-4 text-sm leading-6 text-slate-600">
                {selectedEnergy.details}
              </p>

            </div>

          )}

        </section>


        {/* ================================================= */}
        {/* EXPLORE ACTIONS */}
        {/* ================================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">

                <Lightbulb
                  size={23}
                  className="text-green-600"
                />

              </div>


              <div>

                <h2 className="text-lg font-bold text-[#102b43]">
                  Start with one action today
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Sustainable habits become easier when we
                  start small.
                </p>

              </div>

            </div>


            <button
              onClick={handleExploreActions}
              className="
                flex w-fit
                items-center gap-2
                rounded-lg
                bg-green-600
                px-5 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-green-700
              "
            >
              Explore Actions
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/* FINAL MESSAGE */}
        {/* ================================================= */}

        <section className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6 text-center">

          <Leaf
            size={28}
            className="mx-auto text-green-600"
          />

          <h3 className="mt-3 text-xl font-bold text-[#102b43]">
            Every unit saved makes a difference.
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Understanding our energy habits is the first step
            toward reducing waste and creating a cleaner future.
          </p>

        </section>

      </main>

    </div>
  );
};

export default FourRs;