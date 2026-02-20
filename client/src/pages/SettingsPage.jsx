import React, { useState } from 'react'

const SettingsPage = () => {
  // State management for all settings
  const [settings, setSettings] = useState({
    autoGenerateInsights: true,
    confidenceScore: 85,
    insightCategories: [
      "Revenue Growth",
      "Product Performance",
      "Customer Risk Signals",
      "Cross-sell Opportunities",
      "Drop-off Patterns",
    ],
    insightVisibility: "Admin & Strategy Team Only",
    auditLogging: true,
  })

  const [newCategory, setNewCategory] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)

  // Handlers for various inputs
  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleConfidenceChange = (value) => {
    setSettings(prev => ({
      ...prev,
      confidenceScore: parseInt(value)
    }))
  }

  const handleVisibilityChange = (e) => {
    setSettings(prev => ({
      ...prev,
      insightVisibility: e.target.value
    }))
  }

  const handleCategoryToggle = (category) => {
    setSettings(prev => {
      const newCategories = prev.insightCategories.includes(category)
        ? prev.insightCategories.filter(c => c !== category)
        : [...prev.insightCategories, category]
      return {
        ...prev,
        insightCategories: newCategories
      }
    })
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !settings.insightCategories.includes(newCategory.trim())) {
      setSettings(prev => ({
        ...prev,
        insightCategories: [...prev.insightCategories, newCategory.trim()]
      }))
      setNewCategory("")
      setShowAddCategory(false)
    }
  }

  const handleSave = () => {
    // Here you would typically save to backend/localStorage
    console.log("Saving settings:", settings)
    // Show success message or handle accordingly
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your workspace settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* AI Insights & Governance Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              AI Insights & Governance
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Configure how AI-generated insights are created, validated, and surfaced to teams.
            </p>

            <div className="space-y-6">

              {/* Insight Generation Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="autoGenerateInsights" className="text-sm font-medium text-gray-700">
                    Auto-Generate AI Insights
                  </label>
                  <p className="text-xs text-gray-500">
                    Enables continuous analysis across customer & transaction datasets
                  </p>
                </div>
                <button
                  type="button"
                  id="autoGenerateInsights"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.autoGenerateInsights ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={settings.autoGenerateInsights}
                  onClick={() => handleToggle('autoGenerateInsights')}
                >
                  <span className="sr-only">Toggle auto-generation</span>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.autoGenerateInsights ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Insight Confidence Threshold */}
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="confidenceScore" className="text-sm text-gray-600">
                    Minimum Confidence Score for Insights (%)
                  </label>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {settings.confidenceScore}%
                  </span>
                </div>
                <input
                  id="confidenceScore"
                  type="range"
                  min="0"
                  max="100"
                  value={settings.confidenceScore}
                  onChange={(e) => handleConfidenceChange(e.target.value)}
                  className="mt-2 w-full accent-blue-600"
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.confidenceScore}
                    onChange={(e) => handleConfidenceChange(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Only insights above this score will be shown to business teams
                </p>
              </div>

              {/* Insight Categories */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-600 font-medium">
                    Enabled Insight Categories
                  </p>
                  <button
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add category
                  </button>
                </div>

                {/* Add Category Input */}
                {showAddCategory && (
                  <div className="mb-3 flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="flex-1 px-3 py-1.5 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddCategory(false)}
                      className="px-3 py-1.5 border text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Revenue Growth",
                    "Product Performance",
                    "Customer Risk Signals",
                    "Cross-sell Opportunities",
                    "Drop-off Patterns",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        settings.insightCategories.includes(category)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                      {settings.insightCategories.includes(category) && (
                        <span className="ml-1">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select categories for AI to analyze and generate insights
                </p>
              </div>

              {/* Insight Visibility */}
              <div>
                <label htmlFor="insightVisibility" className="text-sm text-gray-600 font-medium">
                  Insight Visibility
                </label>
                <select
                  id="insightVisibility"
                  value={settings.insightVisibility}
                  onChange={handleVisibilityChange}
                  className="mt-1 w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Admin & Strategy Team Only</option>
                  <option>All Business Users</option>
                  <option>Read-Only (View Mode)</option>
                  <option>Department Specific</option>
                </select>
              </div>

              {/* Audit Logging */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="auditLogging" className="text-sm font-medium text-gray-700">
                    Audit Log for AI Insights
                  </label>
                  <p className="text-xs text-gray-500">
                    Records how and why each insight was generated
                  </p>
                </div>
                <button
                  type="button"
                  id="auditLogging"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.auditLogging ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={settings.auditLogging}
                  onClick={() => handleToggle('auditLogging')}
                >
                  <span className="sr-only">Toggle audit logging</span>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.auditLogging ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save AI Settings
                  </button>
                  <button
                    onClick={() => {
                      // Reset to initial state
                      setSettings({
                        autoGenerateInsights: true,
                        confidenceScore: 85,
                        insightCategories: [
                          "Revenue Growth",
                          "Product Performance",
                          "Customer Risk Signals",
                          "Cross-sell Opportunities",
                          "Drop-off Patterns",
                        ],
                        insightVisibility: "Admin & Strategy Team Only",
                        auditLogging: true,
                      })
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Placeholder for other settings sections */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              General Settings
            </h2>
            <p className="text-gray-500">
              More settings sections can be added here...
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SettingsPage