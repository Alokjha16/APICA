import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Bell,
  ToggleLeft,
  ToggleRight,
  Info,
  PlusCircle,
  Shield,
  Brain,
  Sparkles,
} from "lucide-react";

const Part1Controls = () => {
  // --- Existing Controls ---
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

  // --- New Cross-Sell Product Form ---
  const [product, setProduct] = useState({ type: "", name: "", prompt: "" });
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // --- RBI / AI Recommendations (pre‑2.3 added) ---
  const [recommendations, setRecommendations] = useState([
    { type: "RBI", text: "Pre‑2.3: Obtain explicit customer consent before cross‑selling." },
    { type: "RBI", text: "Pre‑2.3: Clearly display annual interest rates and associated fees." },
    { type: "AI", text: "Analyze transaction history to suggest relevant products (e.g., credit card after salary credit)." },
    { type: "RBI", text: "Pre‑2.3: Ensure all cross‑sell communications include an easy opt‑out option." },
  ]);
  const [newRec, setNewRec] = useState("");

  const handleAddRecommendation = () => {
    if (newRec.trim() !== "") {
      // Auto‑detect type based on keywords or default to "Custom"
      const type = newRec.toLowerCase().includes("rbi") ? "RBI" : "AI";
      setRecommendations([...recommendations, { type, text: newRec.trim() }]);
      setNewRec("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* --- Existing Recommendation Engine Controls --- */}
      <section className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Info size={20} className="text-indigo-500" />
          Recommendation Engine Controls
        </h2>

        {/* Grid: 1 column on mobile, 2 on md, 4 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Send Mode */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail size={18} className="text-indigo-500" />
              Send Mode
            </label>
            <select
              value={sendMode}
              onChange={handleSendModeChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="Email">📧 Email</option>
              <option value="SMS">📱 SMS</option>
              <option value="Notification">🔔 In-App Notification</option>
            </select>
            <p className="text-xs text-gray-500">
              Choose the channel for sending recommendations.
            </p>
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-indigo-500 font-bold">%</span>
              Confidence Score 
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={confidenceThreshold}
              onChange={handleConfidenceChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500">
              Take recommendations above this score.
            </p>
          </div>

          {/* Max Recommendations */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-indigo-500 font-bold">#</span>
             Limit upto
            </label>
            <input
              type="number"
              min={1}
              value={maxRecommendations}
              onChange={handleMaxRecommendationsChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500">
              Limit the number sent per batch.
            </p>
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

      {/* --- Enhanced Two Cards: Cross-Sell Product + RBI / AI Recommendations --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Add Cross-Sell Product with Professional Flair */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-indigo-500" />
            Add New Cross-Sell Product
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Type
              </label>
              <input
                type="text"
                name="type"
                value={product.type}
                onChange={handleProductChange}
                placeholder="e.g., Savings Account, Personal Loan"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                placeholder="e.g., Premium Savings, Quick Loan"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Recommendation Prompt
              </label>
              <textarea
                name="prompt"
                value={product.prompt}
                onChange={handleProductChange}
                placeholder="Describe when to recommend this product (e.g., 'Suggest to customers with high monthly deposits')"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                rows={3}
              />
            </div>

            {/* Quick‑fill examples (pre‑2.3 flavour) */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-medium text-gray-500 mr-1 self-center">
                Templates:
              </span>
              <button
                type="button"
                onClick={() =>
                  setProduct({
                    type: "Credit Card",
                    name: "Platinum Rewards",
                    prompt: "Suggest to customers with high spend on debit cards.",
                  })
                }
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
              >
                Platinum Rewards
              </button>
              <button
                type="button"
                onClick={() =>
                  setProduct({
                    type: "Personal Loan",
                    name: "Instant Loan",
                    prompt: "Trigger when customer has pre‑approved offer.",
                  })
                }
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
              >
                Instant Loan
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Sparkles size={18} />
              Preview / Suggest
            </button>

            {/* Live preview of the product (professional touch) */}
            {product.type || product.name || product.prompt ? (
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-2">
                  Product Preview
                </h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Type:</span> {product.type || "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span> {product.name || "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Prompt:</span> {product.prompt || "—"}
                </p>
              </div>
            ) : null}
          </form>
        </div>

        {/* Card 2: RBI Compliance & AI Recommendations (with pre‑2.3 content) */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-100 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 flex-wrap">
            <Shield size={20} className="text-indigo-500" />
            Edit RBI Compliance & AI‑Recommendations
            <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full whitespace-nowrap">
              v2.3
            </span>
          </h2>

          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-4 max-h-64 bg-gray-50">
            <ul className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  {rec.type === "RBI" ? (
                    <Shield size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Brain size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-gray-700">{rec.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Input + Add button: stack on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newRec}
              onChange={(e) => setNewRec(e.target.value)}
              placeholder="(e.g., RBI: new rule, AI: insight)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <button
              type="button"
              onClick={handleAddRecommendation}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-1 text-sm"
            >
              <PlusCircle size={18} />
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Pre RBI guidelines are by default.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Part1Controls;