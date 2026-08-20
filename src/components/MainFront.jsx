import React from "react";
import {
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Recycle,
  Zap,
  Sun,
  Wind,
  Droplets,
  Wallet,
  Leaf,
  BarChart3,
  Target,
  Users,
  Trophy,
  Lightbulb,
  TrendingDown,
  Globe,
  CircleCheck,
} from "lucide-react";

const MainFront = () => {

  // ---------------- BUTTON FUNCTIONS ----------------

  const handleGetStarted = () => {
    console.log("Get Started clicked");

    // Later:
    // navigate("/register");
  };

  const handleLearnMore = () => {
    console.log("Learn More clicked");

    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRenewable = () => {
    document
      .getElementById("renewable")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegister = () => {
    console.log("Register Now clicked");

    // Later:
    // navigate("/register");
  };

  return (
    <main>

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section
        id="home"
        className="relative min-h-[680px] overflow-hidden bg-gradient-to-br from-white via-white to-green-50"
      >

        {/* Background decoration */}
        <div className="absolute right-[-100px] top-[90px] h-[500px] w-[500px] rounded-full bg-green-100/40 blur-3xl" />

        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 pb-16 pt-32 lg:grid-cols-2 lg:px-12 lg:pt-36">

          {/* LEFT */}
          <div className="relative z-10">

            <p className="mb-4 text-sm font-bold uppercase tracking-[3px] text-green-600">
              Smart Energy Tracking
            </p>

            <h1 className="max-w-[620px] text-5xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-6xl">

              POWER YOUR FUTURE.
              <br />

              USE ENERGY.
              <br />

              <span className="text-green-700">
                DON'T WASTE IT.
              </span>

            </h1>

            <p className="mt-6 max-w-[540px] text-lg leading-8 text-slate-600">
              EcoTrack helps you track, analyze and reduce your energy
              consumption for a sustainable tomorrow.
            </p>

            {/* HERO BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={handleGetStarted}
                className="group flex items-center gap-3 rounded-lg bg-green-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition duration-200 hover:bg-green-700 active:scale-95"
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={handleLearnMore}
                className="group flex items-center gap-3 rounded-lg border border-green-600 bg-white px-7 py-3.5 text-sm font-bold text-green-700 transition duration-200 hover:bg-green-50 active:scale-95"
              >
                Learn More

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

            </div>

            {/* USERS */}

            <div className="mt-8 flex items-center gap-4">

              <div className="flex -space-x-3">
                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-orange-200">
                  👨🏻
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-pink-200">
                  👩🏻
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-blue-200">
                  👨🏽
                </div>
              </div>

              <p className="max-w-[250px] text-sm leading-5 text-slate-600">
                Join <b className="text-slate-900">2,450+</b> users tracking
                energy for a better future.
              </p>

            </div>

          </div>

          {/* RIGHT DASHBOARD CARD */}

          <div className="relative z-10 flex justify-center lg:justify-end">

            <div className="relative w-full max-w-[500px]">

              {/* Decorative sun */}
              <div className="absolute -right-8 top-10 h-12 w-12 rounded-full bg-yellow-300 shadow-lg" />

              {/* Energy landscape */}
              <div className="absolute bottom-0 left-0 right-0 h-[280px] overflow-hidden rounded-[50%] bg-gradient-to-t from-green-200 to-transparent opacity-70" />

              {/* Dashboard */}
              <div className="relative z-10 rounded-2xl border border-white bg-white/95 p-6 shadow-2xl shadow-green-900/10 backdrop-blur">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Today's Usage
                    </p>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        24.6
                      </span>

                      <span className="font-semibold text-slate-600">
                        kWh
                      </span>
                    </div>
                  </div>

                  <span className="text-green-600">
                    →
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600">
                  ↓ 18.2% vs yesterday
                </div>

                {/* Chart */}

                <div className="relative mt-6 h-32">

                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-slate-100" />
                    <div className="border-t border-slate-100" />
                    <div className="border-t border-slate-100" />
                    <div className="border-t border-slate-100" />
                  </div>

                  <svg
                    viewBox="0 0 500 130"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22c55e"
                          stopOpacity="0.2"
                        />

                        <stop
                          offset="100%"
                          stopColor="#22c55e"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 90 L40 75 L80 88 L120 65 L160 78 L200 50 L240 68 L280 82 L320 60 L360 42 L400 48 L450 35 L500 5 L500 130 L0 130 Z"
                      fill="url(#chartGradient)"
                    />

                    <path
                      d="M0 90 L40 75 L80 88 L120 65 L160 78 L200 50 L240 68 L280 82 L320 60 L360 42 L400 48 L450 35 L500 5"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>

                </div>

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>12 AM</span>
                </div>

                {/* Stats */}

                <div className="mt-5 grid grid-cols-3 gap-2">

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Est. Cost
                    </p>

                    <p className="mt-1 font-bold">
                      ₹48.6
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-xs text-slate-400">
                      CO₂ Saved
                    </p>

                    <p className="mt-1 font-bold">
                      12.4 kg
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <p className="text-xs text-slate-400">
                      Points
                    </p>

                    <p className="mt-1 font-bold">
                      320
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* WHY ECOTRACK */}
      {/* ================================================= */}

      <section
        id="about"
        className="bg-white px-6 py-16 lg:px-12"
      >

        <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2">

          <div className="flex justify-center">

            <div className="flex h-60 w-60 items-center justify-center rounded-full bg-green-50 text-8xl shadow-inner">
              🌍
            </div>

          </div>

          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-green-700">
              Why EcoTrack?
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Small actions lead to big changes.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We believe small actions lead to big changes. EcoTrack
              empowers you with insights to save energy, reduce costs
              and protect our planet.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* 4 R's */}
      {/* ================================================= */}

      <section
        id="four-rs"
        className="bg-[#f8faf7] px-6 py-16 lg:px-12"
      >

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle title="THE 4 R'S OF ENERGY" />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <FourR
              icon={<ArrowDown size={30} />}
              title="Reduce"
              text="Use less energy by eliminating unnecessary consumption and waste."
              color="bg-green-100 text-green-700"
            />

            <FourR
              icon={<RefreshCw size={30} />}
              title="Reuse"
              text="Give resources and energy-intensive products a longer life."
              color="bg-blue-100 text-blue-600"
            />

            <FourR
              icon={<Recycle size={30} />}
              title="Recycle"
              text="Recover materials and reduce environmental impact."
              color="bg-yellow-100 text-yellow-700"
            />

            <FourR
              icon={<Zap size={30} />}
              title="Renew"
              text="Shift to clean and renewable sources of energy."
              color="bg-purple-100 text-purple-600"
            />

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* WHY IT MATTERS */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-16 lg:px-12">

        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">

          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-green-700">
              Why it matters
            </p>

            <h2 className="mt-3 max-w-[480px] text-3xl font-bold leading-tight text-slate-900">
              Energy waste impacts both your wallet and our planet.
            </h2>

            <div className="mt-8 grid grid-cols-3 gap-4">

              <Impact
                icon={<Zap size={20} />}
                value="34%"
                text="of energy is wasted globally"
              />

              <Impact
                icon={<Wallet size={20} />}
                value="₹1,800"
                text="avg. monthly waste per household"
              />

              <Impact
                icon={<Globe size={20} />}
                value="2.5 Tons"
                text="of CO₂ emitted per household/year"
              />

            </div>

          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-green-100 to-green-700">

            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              🌱
            </div>

            <div className="absolute bottom-5 right-5 max-w-[280px] rounded-2xl bg-green-900/90 p-6 text-white backdrop-blur">

              <p className="text-lg font-semibold">
                Did you know?
              </p>

              <p className="mt-4 text-xl leading-8">
                Small changes today can create a cleaner,
                greener tomorrow.
              </p>

              <div className="mt-5 h-1 w-8 bg-green-300" />

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* RENEWABLE ENERGY */}
      {/* ================================================= */}

      <section
        id="renewable"
        className="bg-[#004d35] px-6 py-16 text-white lg:px-12"
      >

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            title="RENEWABLE ENERGY"
            white
          />

          <h2 className="mt-3 text-center text-3xl font-bold">
            Clean energy. Bright future.
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">

            <Renewable
              icon={<Sun size={48} />}
              title="Solar Energy"
              text="Harness the power of the sun to generate clean, abundant electricity."
            />

            <Renewable
              icon={<Wind size={48} />}
              title="Wind Energy"
              text="Convert wind into electricity and reduce our dependence on fossil fuels."
            />

            <Renewable
              icon={<Droplets size={48} />}
              title="Hydro Energy"
              text="Use the energy of flowing water to produce sustainable and reliable power."
            />

          </div>

          <div className="mt-10 flex justify-center">

            <button
              onClick={handleRenewable}
              className="flex items-center gap-2 rounded-lg border border-green-400 px-6 py-3 text-sm font-semibold transition hover:bg-green-700 active:scale-95"
            >
              Explore Renewable Energy
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* SDG */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-14 lg:px-12">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle title="OUR SDG COMMITMENT" />

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <SDG
              number="07"
              title="Affordable and Clean Energy"
              text="Ensure access to affordable, reliable, sustainable and modern energy for all."
            />

            <SDG
              number="12"
              title="Responsible Consumption"
              text="Ensure sustainable consumption and production patterns."
            />

            <SDG
              number="13"
              title="Climate Action"
              text="Take urgent action to combat climate change and its impacts."
            />

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section className="bg-[#f8faf7] px-6 py-16 lg:px-12">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle title="HOW IT WORKS" />

          <div className="mt-12 grid gap-8 md:grid-cols-4">

            <Step
              number="01"
              icon={<BarChart3 />}
              title="Track"
              text="Connect your devices and track real-time energy usage."
            />

            <Step
              number="02"
              icon={<TrendingDown />}
              title="Analyze"
              text="Get detailed insights and understand your consumption patterns."
            />

            <Step
              number="03"
              icon={<Zap />}
              title="Act"
              text="Take smart actions to reduce waste and save energy."
            />

            <Step
              number="04"
              icon={<Trophy />}
              title="Improve"
              text="Build better habits and improve efficiency every day."
            />

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* BENEFITS */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-16 lg:px-12">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle title="BENEFITS OF ECOTRACK" />

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

            <Benefit icon={<Wallet />} title="Lower Bills" text="Reduce your energy costs and save money." />

            <Benefit icon={<Leaf />} title="Lower Carbon" text="Reduce CO₂ emissions and protect our environment." />

            <Benefit icon={<BarChart3 />} title="Better Insights" text="Understand usage with smart analytics." />

            <Benefit icon={<Target />} title="Smart Goals" text="Set goals, track progress and stay motivated." />

            <Benefit icon={<RefreshCw />} title="Sustainable Habits" text="Build long-term habits for a greener future." />

            <Benefit icon={<Users />} title="Community Impact" text="Be part of a community driving real change." />

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="px-6 pb-8 lg:px-12">

        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 rounded-2xl border border-green-200 bg-green-50 px-8 py-6 md:flex-row">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Start tracking your energy today!
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Join thousands of users making a difference.
            </p>

          </div>

          <button
            onClick={handleRegister}
            className="group flex shrink-0 items-center gap-2 rounded-lg bg-green-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 active:scale-95"
          >
            Register Now
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </button>

        </div>

      </section>

    </main>
  );
};


/* ================================================= */
/* REUSABLE COMPONENTS */
/* ================================================= */

const SectionTitle = ({ title, white = false }) => (
  <div className="text-center">

    <p
      className={`text-sm font-bold uppercase tracking-wider ${
        white ? "text-green-300" : "text-green-700"
      }`}
    >
      {title}
    </p>

    <div
      className={`mx-auto mt-2 h-1 w-8 rounded-full ${
        white ? "bg-green-300" : "bg-green-500"
      }`}
    />

  </div>
);


const FourR = ({ icon, title, text, color }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl">

    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}>
      {icon}
    </div>

    <h3 className="mt-5 text-lg font-bold capitalize text-slate-900">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      {text}
    </p>

  </div>
);


const Impact = ({ icon, value, text }) => (
  <div>

    <div className="flex items-center gap-2 text-green-700">
      {icon}
      <span className="text-xl font-bold text-slate-900">
        {value}
      </span>
    </div>

    <p className="mt-2 text-xs leading-5 text-slate-500">
      {text}
    </p>

  </div>
);


const Renewable = ({ icon, title, text }) => (
  <div className="flex gap-5">

    <div className="shrink-0 text-green-400">
      {icon}
    </div>

    <div>

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-green-100">
        {text}
      </p>

    </div>

  </div>
);


const SDG = ({ number, title, text }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

    <div className="flex gap-4">

      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-yellow-500 text-3xl font-black text-white">
        {number}
      </div>

      <div>

        <p className="text-xs font-bold uppercase text-slate-400">
          SDG
        </p>

        <h3 className="mt-1 font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          {text}
        </p>

      </div>

    </div>

  </div>
);


const Step = ({ number, icon, title, text }) => (
  <div className="relative">

    <div className="flex items-center gap-4">

      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-green-700 text-white shadow-lg">
        {icon}
      </div>

      <span className="text-xs font-bold text-green-700">
        {number}
      </span>

    </div>

    <h3 className="mt-4 font-bold text-slate-900">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      {text}
    </p>

  </div>
);


const Benefit = ({ icon, title, text }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg">

    <div className="mx-auto flex h-10 w-10 items-center justify-center text-green-600">
      {icon}
    </div>

    <h3 className="mt-3 text-sm font-bold text-slate-900">
      {title}
    </h3>

    <p className="mt-2 text-[11px] leading-4 text-slate-500">
      {text}
    </p>

  </div>
);

export default MainFront;