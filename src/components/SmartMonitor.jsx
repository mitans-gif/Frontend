import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, AlertCircle, CheckCircle2, Clock3, Cpu, Gauge, Leaf, RefreshCw, Signal, Zap } from "lucide-react";
import energyApi from "../services/energyApi";

const DEVICE_ID = "ESP32_AC_001";
const seed = { voltage: 231.4, current: 5.82, power: 1286, energyKwh: 18.426, frequency: 50, powerFactor: 0.96 };
const demoNext = (old) => {
  const power = Math.max(250, old.power + (Math.random() - 0.48) * 90);
  const delta = power / 1000 * (5 / 3600);
  return { ...old, voltage: +(230 + (Math.random() - 0.5) * 4).toFixed(1), current: +(power / 230).toFixed(2), power: +power.toFixed(0), energyKwh: +(old.energyKwh + delta).toFixed(4), deltaKwh: delta, frequency: 50, powerFactor: 0.96, recordedAt: new Date().toISOString(), estimatedCostInr: delta * 7.5, estimatedCo2Kg: delta * 0.716 };
};
const Metric = ({ icon: Icon, label, value, unit, note }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex justify-between gap-3"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value} <span className="text-sm font-medium text-slate-400">{unit}</span></p><p className="mt-2 text-xs text-slate-400">{note}</p></div><span className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-green-700"><Icon size={21}/></span></div>
  </div>
);

export default function SmartMonitor() {
  const [mode, setMode] = useState("demo");
  const [reading, setReading] = useState({ ...seed, recordedAt: new Date().toISOString() });
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("demo");
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const refreshLive = useCallback(async () => {
    try {
      const [live, historyResult] = await Promise.all([energyApi.live(DEVICE_ID), energyApi.history(DEVICE_ID, 30)]);
      setReading({ ...live, energyKwh: live.energyKwh ?? live.meterEnergyKwh });
      setHistory((historyResult.readings || []).slice().reverse());
      setStatus("online"); setError(""); setUpdatedAt(new Date());
    } catch (e) { setStatus("offline"); setError(e.message || "API unavailable"); }
  }, []);

  useEffect(() => {
    if (mode === "demo") {
      setStatus("demo"); setError("");
      const timer = window.setInterval(() => { setReading(old => demoNext(old)); setUpdatedAt(new Date()); }, 5000);
      return () => window.clearInterval(timer);
    }
    refreshLive();
    const timer = window.setInterval(refreshLive, 5000);
    return () => window.clearInterval(timer);
  }, [mode, refreshLive]);

  const rows = useMemo(() => mode === "live" && history.length
    ? history.slice(-12).map((r, i) => ({ key: r._id || i, label: new Date(r.recordedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}), power: Number(r.power) || 0 }))
    : Array.from({length:12}, (_,i) => ({key:i,label:`-${(11-i)*5}m`,power:Math.max(250,reading.power + Math.sin(i*.8)*120)})),
  [mode,history,reading.power]);
  const maxPower = Math.max(1,...rows.map(r=>r.power));
  const demo = mode === "demo";
  const cost = Number(reading.estimatedCostInr || 0);
  const co2 = Number(reading.estimatedCo2Kg || 0);

  return <main className="min-h-screen bg-[#f8faf9] p-5 text-[#102b43] md:p-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-green-600">EcoTrack · Smart energy</p><h1 className="mt-1 text-3xl font-bold md:text-4xl">AC Live Monitor</h1><p className="mt-2 text-sm text-slate-500">Monitor your Samsung AC using electrical measurements from the PZEM energy meter.</p></div>
      <div className="flex flex-wrap items-center gap-3"><label htmlFor="monitor-mode" className="text-sm font-medium text-slate-600">Data source</label><select id="monitor-mode" value={mode} onChange={e=>setMode(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><option value="demo">Demo data</option><option value="live">Live hardware</option></select><button onClick={demo?()=>{setReading(old=>demoNext(old));setUpdatedAt(new Date());}:refreshLive} className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white"><RefreshCw size={16}/> Refresh</button></div></div>

    <div className={`mt-6 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${demo?"border-amber-200 bg-amber-50":status==="online"?"border-green-200 bg-green-50":"border-red-200 bg-red-50"}`}><div className="flex items-center gap-3">{demo?<Activity className="text-amber-700"/>:status==="online"?<CheckCircle2 className="text-green-700"/>:<AlertCircle className="text-red-700"/>}<div><p className="font-semibold">{demo?"Demo mode — simulated values":status==="online"?"Live API connected":"Hardware data unavailable"}</p><p className="mt-0.5 text-xs text-slate-600">{demo?"Sample values are for preview only; they are not readings from your AC.":status==="online"?"Showing the latest reading received from your ESP32 device.":error || "Start the backend and check the device connection."}</p></div></div><div className="flex items-center gap-2 text-xs text-slate-500"><Clock3 size={14}/> Updated {updatedAt.toLocaleTimeString()}</div></div>

    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Zap} label="Instant power" value={Number(reading.power||0).toFixed(0)} unit="W" note="Current electrical load"/><Metric icon={Gauge} label="Cumulative energy" value={Number(reading.energyKwh??reading.meterEnergyKwh??0).toFixed(3)} unit="kWh" note="Meter counter"/><Metric icon={Activity} label="Voltage" value={Number(reading.voltage||0).toFixed(1)} unit="V" note={`Current: ${Number(reading.current||0).toFixed(2)} A`}/><Metric icon={Leaf} label="Latest interval CO₂" value={co2.toFixed(4)} unit="kg" note="Configured grid factor"/></section>

    <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold">Power consumption</h2><p className="mt-1 text-sm text-slate-400">Recent measured power in watts</p></div><span className="rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700">{Number(reading.power||0).toFixed(0)} W now</span></div><div className="mt-8 flex h-56 items-end gap-2 border-b border-l border-slate-100 px-2 pb-2">{rows.map(r=><div key={r.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><div title={`${r.power.toFixed(0)} W`} className="w-full max-w-10 rounded-t-md bg-green-500" style={{height:`${Math.max(3,r.power/maxPower*88)}%`}}/><span className="max-w-full truncate text-[10px] text-slate-400">{r.label}</span></div>)}</div><p className="mt-3 text-xs text-slate-400">{demo?"Preview chart generated from simulated values.":"Chart uses the latest stored API readings."}</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Electrical details</h2><div className="mt-5 space-y-4">{[["Current",`${Number(reading.current||0).toFixed(2)} A`],["Frequency",`${Number(reading.frequency||0).toFixed(1)} Hz`],["Power factor",Number(reading.powerFactor||0).toFixed(2)],["Latest interval cost",`₹${cost.toFixed(3)}`],["Device",DEVICE_ID],["Last meter reading",reading.recordedAt?new Date(reading.recordedAt).toLocaleString():"Not received"]].map(([k,v])=><div key={k} className="flex justify-between gap-3 border-b border-slate-100 pb-3 last:border-0"><span className="text-xs text-slate-500">{k}</span><span className="max-w-[60%] break-words text-right text-sm font-semibold">{v}</span></div>)}</div></div></section>

    <section className="mt-5 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold">Automatic electricity cost</h2><p className="mt-1 text-xs text-slate-400">Measured kWh × configured tariff</p><p className="mt-4 text-3xl font-bold">₹{cost.toFixed(3)}</p><p className="mt-1 text-xs text-slate-500">Latest interval estimate, not lifetime meter cost.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold">Estimated carbon impact</h2><p className="mt-1 text-xs text-slate-400">Measured kWh × configured grid emission factor</p><p className="mt-4 text-3xl font-bold">{co2.toFixed(4)} kg</p><p className="mt-1 text-xs text-slate-500">An estimate; configure a credible local factor for formal reporting.</p></div></section>

    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><Cpu className="text-green-700" size={22}/><div><h2 className="font-bold">Device connection checklist</h2><p className="text-xs text-slate-400">Complete before switching to live mode</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-3">{[["PZEM meter","Correctly rated meter installed by a qualified electrician"],["ESP32 Wi-Fi","Connected to a network that can reach your API"],["Device credentials","Correct API URL and device key configured in firmware"]].map(([a,b])=><div key={a} className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><Signal size={16} className="text-green-600"/>{a}</div><p className="mt-2 text-xs leading-5 text-slate-500">{b}</p></div>)}</div><p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">Electrical safety: a qualified electrician must select and install the correctly rated meter and CT. Never connect mains voltage to ESP32 GPIO.</p></section>
  </div></main>;
}
