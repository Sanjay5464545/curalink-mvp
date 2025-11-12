"use client";
import { useState } from "react";

export default function PatientOnboarding() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [error, setError] = useState("");

  const handleDetect = async () => {
    setLoading(true);
    setError("");
    try {
      const backendBase = "https://curalink-mvp.onrender.com"; // your deployed backend
      const res = await fetch(`${backendBase}/api/ai/parse-condition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await res.json();
      console.log("AI response:", data);

      // Save and redirect to dashboard
      localStorage.setItem(
        "conditions",
        JSON.stringify(data.conditions || [])
      );
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong while fetching conditions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Patient Onboarding
        </h2>
        <p className="text-gray-500">
          Enter your symptoms or condition details below
        </p>
      </header>

      <textarea
        className="w-full max-w-lg h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your condition or symptoms here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleDetect}
        disabled={loading || !text}
        className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition ${
          loading || !text
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Detect Conditions"}
      </button>

      {error && (
        <p className="mt-4 text-red-500 font-medium text-sm">{error}</p>
      )}
    </div>
  );
}
