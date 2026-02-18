import React from "react";
import Part1Controls from "../components/AIEngine/Part1Controls";
import Part2Insights from "../components/AIEngine/Part2Insights";

const AIEnginePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">AI Engine Dashboard</h1>
      {/* Part 1 Controls */}
      <Part1Controls />
      {/* Part 1 Cards will go here later */}
      <Part2Insights />
    </div>
  );
};

export default AIEnginePage;
