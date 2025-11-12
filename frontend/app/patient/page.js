"use client";

import { useState } from "react";
import Link from "next/link";

export default function PatientOnboarding() {
  const [role, setRole] = useState("patient"); // patient or caregiver
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
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || "https://curalink-mvp.onrender.com";
      const res = await fetch(`${backendBase}/api/ai/parse-condition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server returned ${res.status}`);
      }

      const data = await res.json();
      localStorage.setItem("conditions", JSON.stringify(data.conditions || []));
      // go to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Detect error:", err);
      setError("Failed to detect conditions. Make sure backend is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Patient Onboarding</h1>
              <p className="text-sm text-gray-500 mt-1">
                Describe your symptoms in plain language — we will detect conditions and suggest trials & experts.
              </p>
            </div>
            <nav className="text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            </nav>
          </div>
        </header>

        <form onSubmit={handleDetect} className="space-y-6">
          {/* Role selector (does not navigate) */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={role === "patient"}
                onChange={() => setRole("patient")}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">I am a Patient</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="caregiver"
                checked={role === "caregiver"}
                onChange={() => setRole("caregiver")}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">I am a Caregiver</span>
            </label>
          </div>

          {/* Text area */}
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">Describe your condition</label>
            <textarea
              id="symptoms"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="e.g., I have brain cancer and frequent seizures..."
              className="w-full border border-gray-200 rounded-lg p-4 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <p className="mt-2 text-xs text-gray-500">Be as specific as you can — the AI will extract likely conditions.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2">
              {error}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={
                "inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-medium " +
                (loading
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700")
              }
            >
              {loading ? "Analyzing..." : "Detect Conditions"}
            </button>

            <button
              type="button"
              onClick={() => { setText(""); setError(""); }}
              className="px-4 py-2 text-sm border rounded-lg text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              Clear
            </button>

            <div className="ml-auto text-sm">
              <Link href="/dashboard" className="text-blue-600 hover:underline">View Dashboard</Link>
            </div>
          </div>
        </form>

        <footer className="mt-8 text-xs text-gray-400">
          Built with Next.js and Groq LLaMA (demo). For submission, you can show the detect flow and dashboard.
        </footer>
      </div>
    </div>
  );
}
