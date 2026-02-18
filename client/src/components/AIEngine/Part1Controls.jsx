import React, { useState } from "react";
import { Mail, MessageSquare, Bell, ToggleLeft, ToggleRight, Info } from "lucide-react";

const Part1Controls = () => {
  const [sendMode, setSendMode] = useState("Email");
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [maxRecommendations, setMaxRecommendations] = useState(50);
  const [simulate, setSimulate] = useState(true);

  const handleSendModeChange = (e) => setSendMode(e.target.value);
  const handleConfidenceChange = (e) =>
    setConfidenceThreshold(Number(e.target.value));
  const handleMaxRecommendationsChange = (e) =>
    setMaxRecommendations(Number(e.target.value));
  const handleToggleSimulate = () => setSimulate((prev) => !prev);

  return (
    <section className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Info size={20} className="text-indigo-500" />
        Recommendation Engine Controls
      </h2>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Send Mode */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={18} className="text-indigo-500" />
            Send Mode
          </label>
          <select
            value={sendMode}
            onChange={handleSendModeChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="Email">📧 Email</option>
            <option value="SMS">📱 SMS</option>
            <option value="Notification">🔔 In-App Notification</option>
          </select>
          <p className="text-xs text-gray-500">Choose the channel for sending recommendations.</p>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="text-indigo-500 font-bold">%</span>
            Confidence Score (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={confidenceThreshold}
            onChange={handleConfidenceChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <p className="text-xs text-gray-500">Only include recommendations above this score.</p>
        </div>

        {/* Max Recommendations */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="text-indigo-500 font-bold">#</span>
            Max Recommendations
          </label>
          <input
            type="number"
            min={1}
            value={maxRecommendations}
            onChange={handleMaxRecommendationsChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <p className="text-xs text-gray-500">Limit the number sent per batch.</p>
        </div>

        {/* Simulation Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            {simulate ? (
              <ToggleRight size={18} className="text-indigo-500" />
            ) : (
              <ToggleLeft size={18} className="text-gray-400" />
            )}
            Simulation Mode
          </label>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <span className="text-sm text-gray-600">
              {simulate ? "Simulated" : "Live"}
            </span>
            <button
              onClick={handleToggleSimulate}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                simulate ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  simulate ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Toggle between test (simulated) and live sending.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Part1Controls;