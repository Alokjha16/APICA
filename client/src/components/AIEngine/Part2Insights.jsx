import React, { useState } from "react";
import { TrendingUp, Users, PieChart, DollarSign } from "lucide-react";

const icons = [TrendingUp, Users, PieChart, DollarSign];

const Part2Insights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetInsights = async () => {
    setLoading(true);
    setInsights([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-insights`);
      const data = await res.json();
      // Show cards one by one
      data.insights.forEach((insight, idx) => {
        setTimeout(() => {
          setInsights((prev) => [...prev, insight]);
        }, idx * 500); // 0.5s delay between cards
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6">
      <button
        onClick={handleGetInsights}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        disabled={loading}
      >
        {loading ? "Generating Insights..." : "Get AI Insights"}
      </button>

      <div className="flex flex-col gap-4 mt-4">
        {insights.map((insight, idx) => {
          const Icon = icons[idx] || TrendingUp;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform animate-fade-in"
              style={{ animationDelay: `${idx * 300}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6 text-indigo-500" />
                <h3 className="font-semibold">{insight.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{insight.message}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Part2Insights;
