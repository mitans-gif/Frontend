import React, { useMemo, useState } from "react";

import {
  Plus,
  X,
  CalendarDays,
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  Zap,
  BarChart3,
  IndianRupee,
  Leaf,
  Gauge,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const MainRight = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [search, setSearch] = useState("");

  const [records, setRecords] = useState([
    {
      id: 1,
      date: "May 18, 2025",
      time: "7:45 PM",
      appliance: "Living Room Lights",
      power: 9,
      hours: 2,
      kwh: 0.018,
      cost: 1.62,
      source: "Grid",
    },
    {
      id: 2,
      date: "May 18, 2025",
      time: "2:30 PM",
      appliance: "Solar Panel Generation",
      power: 300,
      hours: 3.5,
      kwh: 1.05,
      cost: 0,
      source: "Solar",
    },
    {
      id: 3,
      date: "May 18, 2025",
      time: "9:10 AM",
      appliance: "Kitchen Fan",
      power: 75,
      hours: 1.8,
      kwh: 0.135,
      cost: 12.15,
      source: "Grid",
    },
    {
      id: 4,
      date: "May 17, 2025",
      time: "8:05 PM",
      appliance: "Generator Backup",
      power: 1200,
      hours: 1.5,
      kwh: 1.8,
      cost: 27,
      source: "Other",
    },
    {
      id: 5,
      date: "May 17, 2025",
      time: "6:20 PM",
      appliance: "Wind Turbine Generation",
      power: 500,
      hours: 2,
      kwh: 1,
      cost: 0,
      source: "Wind",
    },
  ]);

  // ADD RECORD FORM
  const emptyForm = {
    date: "2025-05-18",
    time: "19:45",
    appliance: "",
    category: "",
    power: "75",
    hours: "4",
    source: "Grid Electricity",
    rate: "8.50",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  // EDIT RECORD
  const [editingRecord, setEditingRecord] = useState(null);

  // =====================================================
  // CALCULATIONS FOR ADD FORM
  // =====================================================

  const calculatedKwh = useMemo(() => {
    const power = Number(form.power) || 0;
    const hours = Number(form.hours) || 0;

    return (power * hours) / 1000;
  }, [form.power, form.hours]);

  const calculatedCost = useMemo(() => {
    const rate = Number(form.rate) || 0;

    return calculatedKwh * rate;
  }, [calculatedKwh, form.rate]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE NEW RECORD
  // =====================================================

  const handleSave = () => {
    if (!form.appliance) {
      alert("Please select an appliance.");
      return;
    }

    const newRecord = {
      id: Date.now(),

      date: "May 18, 2025",

      time: "7:45 PM",

      appliance: form.appliance,

      power: Number(form.power),

      hours: Number(form.hours),

      kwh: Number(calculatedKwh.toFixed(3)),

      cost: Number(calculatedCost.toFixed(2)),

      source:
        form.source === "Grid Electricity"
          ? "Grid"
          : form.source,
    };

    setRecords((previous) => [
      newRecord,
      ...previous,
    ]);

    setShowForm(false);

    setForm(emptyForm);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (id) => {
    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (record) => {
    setEditingRecord({
      ...record,
    });

    setShowEditForm(true);
  };

  // =====================================================
  // EDIT FORM CHANGE
  // =====================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingRecord((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE EDITED RECORD
  // =====================================================

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editingRecord?.appliance) {
      alert("Please enter an appliance name.");
      return;
    }

    const power = Number(editingRecord.power) || 0;
    const hours = Number(editingRecord.hours) || 0;

    const kwh = (power * hours) / 1000;

    // Keep existing cost calculation style
    const oldKwh = Number(editingRecord.kwh) || 0;
    const oldCost = Number(editingRecord.cost) || 0;

    let cost = oldCost;

    if (oldKwh > 0) {
      cost = (kwh / oldKwh) * oldCost;
    }

    const updatedRecord = {
      ...editingRecord,

      power,

      hours,

      kwh: Number(kwh.toFixed(3)),

      cost:
        editingRecord.source === "Solar" ||
        editingRecord.source === "Wind"
          ? 0
          : Number(cost.toFixed(2)),
    };

    setRecords((previous) =>
      previous.map((record) =>
        record.id === updatedRecord.id
          ? updatedRecord
          : record
      )
    );

    setShowEditForm(false);
    setEditingRecord(null);
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredRecords = records.filter((record) =>
    record.appliance
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalKwh = records
    .reduce(
      (total, record) => total + record.kwh,
      0
    )
    .toFixed(2);

  const totalCost = records
    .reduce(
      (total, record) => total + record.cost,
      0
    )
    .toFixed(2);

  const dailyAverage = (
    records.reduce(
      (total, record) => total + record.kwh,
      0
    ) / 7
  ).toFixed(2);

  const highestDay = Math.max(
    ...records.map((record) => record.kwh)
  ).toFixed(1);

  const co2 = (
    Number(totalKwh) * 0.25
  ).toFixed(1);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <main className="min-h-screen flex-1">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-center justify-between px-8 py-7">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Energy Tracker
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track and manage your energy consumption records.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700 active:scale-95"
        >
          <Plus size={18} />
          Add Record
        </button>

      </div>

      <div className="px-8 pb-8">

        {/* ================================================= */}
        {/* FILTERS */}
        {/* ================================================= */}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 lg:grid-cols-4">

            {/* DATE */}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Date Range
              </label>

              <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700">

                <span className="flex items-center gap-2">
                  <CalendarDays
                    size={17}
                    className="text-slate-500"
                  />

                  May 12, 2025 – May 18, 2025
                </span>

                <ChevronDown size={15} />

              </button>
            </div>

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Search Appliance
              </label>

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search appliance..."
                  className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-green-500"
                />

              </div>
            </div>

            {/* SOURCE */}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Source
              </label>

              <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500">

                <option>All Sources</option>
                <option>Grid</option>
                <option>Solar</option>
                <option>Wind</option>
                <option>Other</option>

              </select>
            </div>

            {/* SORT */}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-700">
                Sort By
              </label>

              <div className="flex gap-2">

                <select className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none">

                  <option>Date: Newest First</option>
                  <option>Date: Oldest First</option>
                  <option>Highest Usage</option>
                  <option>Lowest Usage</option>

                </select>

                <button
                  onClick={() => setSearch("")}
                  className="flex items-center gap-1 rounded-lg border border-green-600 px-4 text-sm font-medium text-green-700 hover:bg-green-50"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

              </div>
            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* STAT CARDS */}
        {/* ================================================= */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">

          <StatCard
            icon={<Zap />}
            title="Total kWh"
            value={totalKwh}
            subtitle="This Week"
            color="green"
          />

          <StatCard
            icon={<IndianRupee />}
            title="Total Cost"
            value={`₹ ${totalCost}`}
            subtitle="This Week"
            color="blue"
          />

          <StatCard
            icon={<BarChart3 />}
            title="Daily Avg."
            value={dailyAverage}
            unit="kWh"
            subtitle="This Week"
            color="yellow"
          />

          <StatCard
            icon={<Gauge />}
            title="Highest Day"
            value={highestDay}
            unit="kWh"
            subtitle="May 18, 2025"
            color="purple"
          />

          <StatCard
            icon={<Leaf />}
            title="CO₂ Emitted"
            value={co2}
            unit="kg"
            subtitle="This Week"
            color="green"
          />

        </section>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <TableHead>
                    Date & Time ↓
                  </TableHead>

                  <TableHead>
                    Appliance
                  </TableHead>

                  <TableHead>
                    Power (W)
                  </TableHead>

                  <TableHead>
                    Hours (h)
                  </TableHead>

                  <TableHead>
                    kWh
                  </TableHead>

                  <TableHead>
                    Cost (₹)
                  </TableHead>

                  <TableHead>
                    Source
                  </TableHead>

                  <TableHead>
                    Actions
                  </TableHead>

                </tr>

              </thead>

              <tbody>

                {filteredRecords.map((record) => (

                  <tr
                    key={record.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 text-sm">

                      <p className="font-medium text-slate-700">
                        {record.date}
                      </p>

                      <p className="text-xs text-slate-400">
                        {record.time}
                      </p>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="grid h-10 w-10 place-items-center rounded-full bg-green-50 text-green-600">
                          <Zap size={18} />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {record.appliance}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.power}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.hours.toFixed(1)}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {record.kwh.toFixed(3)}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">

                      {record.cost === 0
                        ? "–"
                        : record.cost.toFixed(2)}

                    </td>

                    <td className="px-5 py-4">

                      <span className="flex items-center gap-2 text-sm text-slate-600">

                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            record.source === "Solar"
                              ? "bg-yellow-400"
                              : record.source === "Wind"
                              ? "bg-blue-500"
                              : record.source === "Other"
                              ? "bg-purple-500"
                              : "bg-green-600"
                          }`}
                        />

                        {record.source}

                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        {/* EDIT BUTTON */}

                        <button
                          onClick={() =>
                            handleEdit(record)
                          }
                          title="Edit record"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-green-200 text-green-700 transition hover:bg-green-50"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* DELETE BUTTON */}

                        <button
                          onClick={() =>
                            handleDelete(record.id)
                          }
                          title="Delete record"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* TABLE FOOTER */}

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

            <p className="text-xs text-slate-500">
              Showing 1 to {filteredRecords.length} of{" "}
              {records.length} records
            </p>

            <div className="flex items-center gap-2">

              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                <ArrowLeft size={15} />
              </button>

              <button className="grid h-9 w-9 place-items-center rounded-lg bg-green-600 text-sm font-semibold text-white">
                1
              </button>

              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                2
              </button>

              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                3
              </button>

              <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm">
                Next
                <ArrowRight size={14} />
              </button>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ================================================= */}

        <div className="mt-5 flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 px-5 py-4">

          <div className="text-3xl">
            🌱
          </div>

          <p className="text-sm font-medium text-slate-600">
            Keep tracking your energy to get better insights and save more!
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ADD RECORD SIDE PANEL */}
      {/* ================================================= */}

      {showForm && (
        <>

          <div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]"
          />

          <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[390px] flex-col bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Energy Record
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter details of your energy usage.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">

              <FormInput
                label="Date & Time"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />

              <FormSelect
                label="Appliance"
                value={form.appliance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    appliance: e.target.value,
                  })
                }
                options={[
                  "Living Room Lights",
                  "Kitchen Fan",
                  "Air Conditioner",
                  "Refrigerator",
                  "Washing Machine",
                  "Television",
                  "Computer",
                  "Solar Panel Generation",
                  "Wind Turbine Generation",
                  "Generator Backup",
                ]}
              />

              <FormSelect
                label="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                options={[
                  "Lighting",
                  "Cooling",
                  "Kitchen",
                  "Entertainment",
                  "Appliance",
                  "Renewable",
                  "Other",
                ]}
              />

              <FormInput
                label="Power Consumption (W)"
                name="power"
                value={form.power}
                onChange={handleChange}
                unit="W"
              />

              <FormInput
                label="Usage Hours (h)"
                name="hours"
                value={form.hours}
                onChange={handleChange}
                unit="h"
              />

              <FormSelect
                label="Energy Source"
                value={form.source}
                onChange={(e) =>
                  setForm({
                    ...form,
                    source: e.target.value,
                  })
                }
                options={[
                  "Grid Electricity",
                  "Solar",
                  "Wind",
                  "Other",
                ]}
              />

              <FormInput
                label="Electricity Rate (₹/kWh)"
                name="rate"
                value={form.rate}
                onChange={handleChange}
                unit="₹/kWh"
              />

              <div className="mt-5">

                <label className="mb-2 block text-xs font-medium text-slate-700">
                  Notes (Optional)
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add any notes..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                />

              </div>

              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-center gap-2 text-green-700">

                  <CheckCircle2 size={18} />

                  <span className="font-semibold">
                    Calculated Values
                  </span>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-[11px] text-slate-500">
                      Energy (kWh)
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {calculatedKwh.toFixed(3)} kWh
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-500">
                      Cost (₹)
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {calculatedCost.toFixed(2)}
                    </p>
                  </div>

                </div>

                <div className="mt-4 border-t border-green-200 pt-3 text-[11px] leading-5 text-slate-500">

                  <p>
                    kWh = (Power × Hours) / 1000
                  </p>

                  <p>
                    Cost = kWh × Rate
                  </p>

                </div>

              </div>

            </div>

            <div className="flex gap-4 border-t border-slate-200 bg-white px-6 py-5">

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg border border-green-600 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700"
              >
                Save Record
              </button>

            </div>

          </aside>

        </>
      )}

      {/* ================================================= */}
      {/* EDIT RECORD MODAL */}
      {/* ================================================= */}

      {showEditForm && editingRecord && (
        <>
          {/* OVERLAY */}

          <div
            onClick={() => {
              setShowEditForm(false);
              setEditingRecord(null);
            }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* MODAL */}

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Edit Energy Record
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Update your energy usage details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingRecord(null);
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                >
                  <X size={20} />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleUpdate}
                className="space-y-5 p-6"
              >

                {/* APPLIANCE */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-700">
                    Appliance
                  </label>

                  <input
                    type="text"
                    name="appliance"
                    value={editingRecord.appliance || ""}
                    onChange={handleEditChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-green-500"
                  />
                </div>

                {/* POWER */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-700">
                    Power Consumption (W)
                  </label>

                  <input
                    type="number"
                    name="power"
                    value={editingRecord.power ?? ""}
                    onChange={handleEditChange}
                    min="0"
                    step="1"
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-green-500"
                  />
                </div>

                {/* HOURS */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-700">
                    Usage Hours (h)
                  </label>

                  <input
                    type="number"
                    name="hours"
                    value={editingRecord.hours ?? ""}
                    onChange={handleEditChange}
                    min="0"
                    step="0.1"
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-green-500"
                  />
                </div>

                {/* SOURCE */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-700">
                    Energy Source
                  </label>

                  <select
                    name="source"
                    value={editingRecord.source || "Grid"}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="Grid">
                      Grid
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
                </div>

                {/* PREVIEW */}

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                  <p className="text-xs font-semibold text-green-700">
                    Updated Calculation
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Energy
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {(
                          (Number(editingRecord.power) || 0) *
                          (Number(editingRecord.hours) || 0)
                        / 1000
                        ).toFixed(3)}{" "}
                        kWh
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Source
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {editingRecord.source}
                      </p>
                    </div>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingRecord(null);
                    }}
                    className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Save Changes
                  </button>

                </div>

              </form>

            </div>

          </div>
        </>
      )}

    </main>
  );
};

// =====================================================
// SMALL COMPONENTS
// =====================================================

const TableHead = ({ children }) => (
  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600">
    {children}
  </th>
);

const StatCard = ({
  icon,
  title,
  value,
  unit,
  subtitle,
  color,
}) => {
  const colors = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div
          className={`grid h-12 w-12 place-items-center rounded-full ${colors[color]}`}
        >
          {icon}
        </div>

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-1 flex items-baseline gap-1">

            <span className="text-2xl font-bold text-slate-900">
              {value}
            </span>

            {unit && (
              <span className="text-xs font-medium text-slate-500">
                {unit}
              </span>
            )}

          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "number",
  unit,
}) => (
  <div className="mb-5">

    <label className="mb-2 block text-xs font-medium text-slate-700">
      {label}
    </label>

    <div className="flex">

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-green-500"
      />

      {unit && (
        <span className="flex items-center rounded-r-lg border border-l-0 border-slate-200 bg-slate-50 px-3 text-xs text-slate-500">
          {unit}
        </span>
      )}

    </div>

  </div>
);

const FormSelect = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="mb-5">

    <label className="mb-2 block text-xs font-medium text-slate-700">
      {label}
    </label>

    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
    >

      <option value="">
        Select {label.toLowerCase()}
      </option>

      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}

    </select>

  </div>
);

export default MainRight;