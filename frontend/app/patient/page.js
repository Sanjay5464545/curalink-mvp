"use client";

import { useState } from "react";
import Link from "next/link";

export default function PatientOnboarding() {
  const [role, setRole] = useState("patient");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetect = async (e) => {
    e?.preventDefault?.();
    if (!text.trim()) {
      setError("Please describe your condition or symptoms.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const backendBase =
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://curalink-mvp.onrender.com";
      const res = await fetch(`${backendBase}/api/ai/parse-condition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `Server returned ${res.status}`);
      }

      const data = await res.json();
      localStorage.setItem("conditions", JSON.stringify(data.conditions || []));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Make sure the backend is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-4xl">
        {/* Top header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Patient Onboarding</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Describe symptoms or conditions in plain language — the AI will extract likely conditions and
              suggest relevant clinical trials and experts.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          </div>
        </div>

        {/* Center card */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8">
          <form onSubmit={handleDetect} className="space-y-6">
            {/* role pill */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-3">
                <input
                  id="role-patient"
                  name="role"
                  type="radio"
                  value="patient"
                  checked={role === "patient"}
                  onChange={() => setRole("patient")}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="role-patient" className="text-sm text-slate-700">I am a Patient</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="role-caregiver"
                  name="role"
                  type="radio"
                  value="caregiver"
                  checked={role === "caregiver"}
                  onChange={() => setRole("caregiver")}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="role-caregiver" className="text-sm text-slate-700">I am a Caregiver</label>
              </div>

              <div className="ml-auto text-sm text-slate-500">
                Tip: be specific (age, existing diagnoses, major symptoms).
              </div>
            </div>

            {/* textarea */}
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-2">
                Describe your condition
              </label>
              <textarea
                id="symptoms"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="e.g., I have brain cancer and frequent seizures..."
                className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y shadow-sm"
              />
            </div>

            {/* error */}
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-2">
                {error}
              </div>
            )}

            {/* actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className={
                  "inline-flex items-center gap-3 px-5 py-2 rounded-lg text-sm font-semibold " +
                  (loading
                    ? "bg-slate-300 text-slate-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:scale-[1.01] transition")
                }
              >
                {loading ? "Analyzing..." : "Detect Conditions"}
              </button>

              <button
                type="button"
                onClick={() => { setText(""); setError(""); }}
                className="px-4 py-2 text-sm border rounded-lg text-slate-700 border-slate-200 hover:bg-slate-50"
              >
                Clear
              </button>

              <div className="ml-auto text-sm">
                <Link href="/dashboard" className="text-blue-600 hover:underline">View Dashboard</Link>
              </div>
            </div>

            <div className="pt-3 text-xs text-slate-400 border-t border-slate-100">
              Built with Next.js and Groq LLaMA (demo). For submission, demo the detect flow → dashboard.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
