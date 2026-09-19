import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Zap,
  Leaf,
  IndianRupee,
  TreePine,
  Target,
  Activity,
  Globe2,
  ArrowRight,
  Settings,
  Bell,
  ShieldCheck,
  LogOut,
  X,
  Save,
  CheckCircle2,
  Award,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "EcoTrack User",
    email: "user@example.com",
    phone: "+91 98765 43210",
    location: "Ahmedabad, Gujarat",
  });

  const [editForm, setEditForm] = useState(profile);

  const openEditModal = () => {
    setEditForm(profile);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();

    setProfile(editForm);
    setShowEditModal(false);
  };

  const goToTracker = () => {
    navigate("/tracker");
  };

  const goToGoals = () => {
    navigate("/goals");
  };

  const goToImpact = () => {
    navigate("/impact");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#102b43]">
      <main className="p-5 md:p-7 lg:p-8">

        {/* ========================================= */}
        {/* HERO / PROFILE HEADER */}
        {/* ========================================= */}

        <section className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              {/* Profile Avatar */}

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-green-100 shadow-sm md:h-28 md:w-28">
                <User
                  size={52}
                  strokeWidth={1.8}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                  My Profile
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
                  {profile.name}
                </h1>

                <p className="mt-2 text-sm text-slate-500 md:text-base">
                  Manage your EcoTrack profile and sustainability journey.
                </p>
              </div>

            </div>

            <button
              onClick={openEditModal}
              className="flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>

          </div>

        </section>

        {/* ========================================= */}
        {/* PROFILE + ACCOUNT INFORMATION */}
        {/* ========================================= */}

        <section className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Personal Information */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your basic account information.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <User
                  size={22}
                  className="text-green-600"
                />
              </div>

            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <User
                      size={19}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Full Name
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {profile.name}
                    </p>
                  </div>

                </div>

              </div>

              {/* Email */}

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Mail
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Email Address
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold">
                      {profile.email}
                    </p>
                  </div>

                </div>

              </div>

              {/* Phone */}

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Phone
                      size={19}
                      className="text-purple-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Phone Number
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {profile.phone}
                    </p>
                  </div>

                </div>

              </div>

              {/* Location */}

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <MapPin
                      size={19}
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {profile.location}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Account Status */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Account Status
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your EcoTrack account.
                </p>
              </div>

              <ShieldCheck
                size={23}
                className="text-green-600"
              />

            </div>

            <div className="mt-7 rounded-2xl bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                  <CheckCircle2
                    size={23}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-green-800">
                    Active Account
                  </p>

                  <p className="mt-1 text-xs text-green-700">
                    Your profile is active.
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Profile completion
                </span>

                <span className="font-bold text-green-600">
                  80%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: "80%" }}
                />
              </div>

              <p className="text-xs leading-5 text-slate-400">
                Add or update your profile information to keep your
                EcoTrack account complete.
              </p>

            </div>

          </div>

        </section>

        {/* ========================================= */}
        {/* SUSTAINABILITY STATISTICS */}
        {/* ========================================= */}

        <section className="mt-7">

          <div className="mb-5">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Sustainability Journey
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Your EcoTrack Statistics
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A quick overview of your energy-saving progress.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Energy */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Energy Tracked
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    76 kWh
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Zap
                    size={24}
                    className="text-green-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-xs font-semibold text-green-600">
                This month
              </p>

            </div>

            {/* Money */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Estimated Cost
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    ₹646
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <IndianRupee
                    size={24}
                    className="text-blue-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-xs font-semibold text-blue-600">
                Estimated monthly cost
              </p>

            </div>

            {/* CO2 */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    CO₂ Reduced
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    10.5 kg
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Leaf
                    size={24}
                    className="text-emerald-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-xs font-semibold text-emerald-600">
                Estimated improvement
              </p>

            </div>

            {/* Goals */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Goals Completed
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    4
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Award
                    size={24}
                    className="text-purple-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-xs font-semibold text-purple-600">
                Keep going!
              </p>

            </div>

          </div>

        </section>

        {/* ========================================= */}
        {/* QUICK ACTIONS */}
        {/* ========================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              Quick Actions
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Continue your sustainability journey
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Access the tools you use most often.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* Tracker */}

            <button
              onClick={goToTracker}
              className="group rounded-xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <Activity
                  size={22}
                  className="text-green-600"
                />
              </div>

              <h3 className="mt-4 font-bold">
                Track Energy
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Record your appliance usage.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                Open Tracker
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </div>

            </button>

            {/* Calculator */}

            <button
              onClick={goToCalculator}
              className="group rounded-xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                <Zap
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-4 font-bold">
                Calculate Usage
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Calculate energy and electricity cost.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                Open Calculator
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </div>

            </button>

            {/* Goals */}

            <button
              onClick={goToGoals}
              className="group rounded-xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100">
                <Target
                  size={22}
                  className="text-purple-600"
                />
              </div>

              <h3 className="mt-4 font-bold">
                View Goals
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Track your energy-saving targets.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                Open Goals
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </div>

            </button>

            {/* Impact */}

            <button
              onClick={goToImpact}
              className="group rounded-xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                <Globe2
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="mt-4 font-bold">
                View Impact
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                See your environmental impact.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                View Impact
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </div>

            </button>

          </div>

        </section>

        {/* ========================================= */}
        {/* ECO PROFILE */}
        {/* ========================================= */}

        <section className="mt-7 rounded-2xl bg-[#064d35] p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <TreePine
                  size={25}
                  className="text-green-200"
                />
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                  EcoTrack Member
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Every small action creates an impact.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100">
                  Keep tracking your energy, setting goals and making
                  sustainable choices to reduce unnecessary consumption.
                </p>

              </div>

            </div>

            <button
              onClick={goToImpact}
              className="flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              See My Impact
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        {/* ========================================= */}
        {/* ACCOUNT SETTINGS */}
        {/* ========================================= */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-bold">
              Account Settings
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your EcoTrack preferences.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">

            <button
              onClick={() =>
                alert("Notification settings coming soon.")
              }
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Bell
                  size={20}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Notifications
                </p>

                <p className="text-xs text-slate-400">
                  Manage reminders
                </p>
              </div>
            </button>

            <button
              onClick={() =>
                alert("Privacy settings coming soon.")
              }
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <ShieldCheck
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Privacy & Security
                </p>

                <p className="text-xs text-slate-400">
                  Account protection
                </p>
              </div>
            </button>

            <button
              onClick={() =>
                alert("More settings coming soon.")
              }
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Settings
                  size={20}
                  className="text-slate-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Preferences
                </p>

                <p className="text-xs text-slate-400">
                  Customize your experience
                </p>
              </div>
            </button>

          </div>

        </section>

      </main>

      {/* ========================================= */}
      {/* EDIT PROFILE MODAL */}
      {/* ========================================= */}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>
                <h2 className="text-xl font-bold">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update your personal information.
                </p>
              </div>

              <button
                onClick={closeEditModal}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={saveProfile}
              className="space-y-5 p-6"
            >

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter your name"
                  />

                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter your email"
                  />

                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter your phone number"
                  />

                </div>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Location
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    placeholder="Enter your location"
                  />

                </div>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Save size={17} />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Profile;