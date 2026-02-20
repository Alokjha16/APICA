// client/src/pages/CustomersPage.jsx
import { useState, useEffect } from "react";
import { UserPlus, X, Send, Info, Mail, Phone, Smartphone, Globe } from "lucide-react";
import { Link } from 'react-router-dom';
import SMSPopup from "../components/SMSPopup";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Bulk SMS states
  const [sendMode, setSendMode] = useState("SMS");
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [maxRecipients, setMaxRecipients] = useState(100);
  const [bulkMessage, setBulkMessage] = useState("");
  const [sendingBulk, setSendingBulk] = useState(false);
  const [bulkStatus, setBulkStatus] = useState({ message: "", type: "" });

  const rowsPerPage = 20;
  const productTypes = ["All", "Deposits", "Loans", "Credit Cards", "Insurance", "Investments"];

  // Popup states
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [showSMSPopup, setShowSMSPopup] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  // Fixed phone numbers
  const phoneNumbers = ["+917276185419", "+918591040081"];

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/customer-recommendations`);
        if (selectedProductType !== "All") {
          url.searchParams.append("product_type", selectedProductType);
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [selectedProductType]);

  useEffect(() => {
    setFilteredCustomers(customers);
    setCurrentPage(1);
  }, [customers]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleSendModeChange = (e) => {
    setSendMode(e.target.value);
  };

  const handleConfidenceChange = (e) => {
    setConfidenceThreshold(parseInt(e.target.value) || 0);
  };

  const handleMaxRecipientsChange = (e) => {
    setMaxRecipients(parseInt(e.target.value) || 1);
  };

  const handleBulkSend = async () => {
    if (!bulkMessage.trim()) {
      setBulkStatus({ message: "Please enter a message", type: "error" });
      return;
    }

    // Filter customers based on confidence threshold
    const eligibleCustomers = customers.filter(
      c => c.confidence_score >= confidenceThreshold
    ).slice(0, maxRecipients);

    if (eligibleCustomers.length === 0) {
      setBulkStatus({ message: "No customers meet the confidence threshold", type: "error" });
      return;
    }

    setSendingBulk(true);
    setBulkStatus({ message: `Sending to ${eligibleCustomers.length} customers...`, type: "info" });

    try {
      // Send to both fixed numbers (as per requirement)
      const results = await Promise.allSettled(
        phoneNumbers.map(number =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/twilio/send-sms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              to: number, 
              message: `🏦 THAKUR BANK OF FINANCE - BULK MESSAGE\n\n${bulkMessage}\n\nIntended for: ${eligibleCustomers.length} customers with ${confidenceThreshold}%+ confidence score` 
            }),
          }).then(res => res.json())
        )
      );

      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
      
      if (successful === 2) {
        setBulkStatus({ 
          message: `✅ Bulk SMS sent successfully to both numbers! Intended for ${eligibleCustomers.length} customers.`, 
          type: "success" 
        });
        setTimeout(() => {
          setBulkStatus({ message: "", type: "" });
          setBulkMessage("");
        }, 3000);
      } else if (successful === 1) {
        setBulkStatus({ message: "⚠️ Sent to one number only. Please check the other.", type: "warning" });
      } else {
        setBulkStatus({ message: "❌ Failed to send bulk SMS.", type: "error" });
      }
    } catch (error) {
      setBulkStatus({ message: "❌ Network error.", type: "error" });
    } finally {
      setSendingBulk(false);
    }
  };

  const handleSendSMS = async (message) => {
    try {
      const results = await Promise.allSettled(
        phoneNumbers.map(number =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/twilio/send-sms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: number, message }),
          }).then(res => res.json())
        )
      );

      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
      return { successful };
    } catch (error) {
      throw error;
    }
  };

  const openSMSPopup = (customerName, customerData) => {
    setSelectedCustomerName(customerName);
    setSelectedCustomerData(customerData);
    setShowSMSPopup(true);
  };

  if (loading) return <div className="p-4 sm:p-6 text-center">Loading customers...</div>;
  if (error) return <div className="p-4 sm:p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">All Customers</h1>
     
      </div>

      {/* Bulk Send SMS Controls */}
      <section className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Info size={20} className="text-indigo-500" />
          Bulk Send SMS Controls
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
              <option value="WhatsApp">💬 WhatsApp</option>
              <option value="Notification">🔔 In-App Notification</option>
            </select>
            <p className="text-xs text-gray-500">
              Choose the channel for bulk sending.
            </p>
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-indigo-500 font-bold">%</span>
              Confidence Threshold
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
              Send to customers above this score.
            </p>
          </div>

          {/* Max Recipients */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-indigo-500 font-bold">#</span>
              Max Recipients
            </label>
            <input
              type="number"
              min={1}
              value={maxRecipients}
              onChange={handleMaxRecipientsChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500">
              Maximum number of customers.
            </p>
          </div>

          {/* Bulk Message Input */}
          <div className="space-y-2 lg:col-span-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Send size={18} className="text-indigo-500" />
              Bulk SMS Message
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                value={bulkMessage}
                onChange={(e) => setBulkMessage(e.target.value)}
                placeholder="Enter your bulk message here..."
                rows={3}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                disabled={sendingBulk}
              />
              <button
                onClick={handleBulkSend}
                disabled={sendingBulk}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {sendingBulk ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Bulk SMS
                  </>
                )}
              </button>
            </div>
            {bulkStatus.message && (
              <div className={`mt-2 p-2 rounded-lg text-sm ${
                bulkStatus.type === 'success' ? 'bg-green-50 text-green-700' :
                bulkStatus.type === 'error' ? 'bg-red-50 text-red-700' :
                bulkStatus.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                {bulkStatus.message}
              </div>
            )}
            <p className="text-xs text-gray-500">
              Message will be sent to both fixed numbers: {phoneNumbers.join(", ")}. 
              Filtering {customers.length} customers by {confidenceThreshold}%+ confidence score.
            </p>
          </div>
        </div>
      </section>

      {/* Product Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedProductType(type)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition ${
              selectedProductType === type
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence Score
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.length > 0 ? (
                currentRows.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    {/* Clickable customer name */}
                    <td
                      className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 cursor-pointer hover:underline focus:outline-none"
                      onClick={() => {
                        setSelectedCustomerName(customer.customer_name);
                        setSelectedCustomerData(customer);
                        setShowCustomerPopup(true);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && setShowCustomerPopup(true)}
                      tabIndex={0}
                      role="button"
                    >
                      {customer.customer_name}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.product_type}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.confidence_score}%
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openSMSPopup(customer.customer_name, customer)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition"
                      >
                        <Send size={14} />
                        Send SMS
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} results
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {(() => {
                const pageNumbers = [];
                const maxVisible = 3;
                const half = Math.floor(maxVisible / 2);
                let start = Math.max(1, currentPage - half);
                let end = Math.min(totalPages, start + maxVisible - 1);
                if (end - start + 1 < maxVisible) {
                  start = Math.max(1, end - maxVisible + 1);
                }
                if (start > 1) {
                  pageNumbers.push(1);
                  if (start > 2) pageNumbers.push('...');
                }
                for (let i = start; i <= end; i++) {
                  pageNumbers.push(i);
                }
                if (end < totalPages) {
                  if (end < totalPages - 1) pageNumbers.push('...');
                  pageNumbers.push(totalPages);
                }
                return pageNumbers.map((page, index) => {
                  if (page === '...') {
                    return <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm">...</span>;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-2 sm:px-3 py-1 border rounded-md text-sm ${
                        currentPage === page
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

     {/* AI Customer Insight Popup */}
{showCustomerPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md relative pointer-events-auto">
      <div className="border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <UserPlus size={20} className="text-indigo-500" />
          AI Customer Insight
        </h3>
        <button
          className="text-gray-400 hover:text-gray-600 transition"
          onClick={() => setShowCustomerPopup(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Personalized Recommendation for</p>
        <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4 break-words">{selectedCustomerName}</p>

        <div className="border border-gray-200 rounded-lg p-4 text-sm text-gray-700 bg-gradient-to-br from-indigo-50 to-white">
    
          
          {/* Conditional rendering based on customer name */}
          {selectedCustomerName === "Kanaki Ravishankar Chandrakant" ? (
            <div className="space-y-3">

              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
                <li>
                  <span className="font-medium">Age demographic (45+):</span> Based on age and occupational risk profiling, this customer is above 45 years and works as a professional driver.
                </li>
                <li>
                  <span className="font-medium">Insurance recommendation:</span> Comprehensive motor insurance policy with:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>✓ No-claim bonus protection</li>
                    <li>✓ Roadside assistance coverage</li>
                    <li>✓ Personal accident cover for driver</li>
                  </ul>
                </li>
        
              </ul>
           
            </div>
          ) : selectedCustomerName === "Kosta Aditi Mahesh" ? (
            <div className="space-y-3">
          
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
                <li>
                  <span className="font-medium">Career-oriented profile:</span> Ideal for premium credit card benefits
                </li>
                <li>
                  <span className="font-medium">Recommended Credit Card Features:</span>
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>✓ Airport lounge access (domestic & international)</li>
                    <li>✓ Reward points on professional expenses</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">Professional benefits:</span> Perfect for business travel, client meetings, and online subscriptions
                </li>
              </ul>
            </div>
          ) : (
            /* Default message for other customers */
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li>
                High potential for a {selectedCustomerData?.product_type || "financial product"} 
                given profile analysis.
              </li>
              <li>
                Confidence score:{" "}
                <span className="font-semibold text-indigo-700">
                  {selectedCustomerData?.confidence_score || "N/A"}%
                </span>
              </li>
              <li>
                Product type:{" "}
                <span className="font-semibold">
                  {selectedCustomerData?.product_type || "N/A"}
                </span>
              </li>
            </ul>
          )}
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Info size={12} />
              AI-generated insight based on RBI guidelines and customer analytics
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition w-full sm:w-auto"
            onClick={() => setShowCustomerPopup(false)}
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              setShowCustomerPopup(false);
              openSMSPopup(selectedCustomerName, selectedCustomerData);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send SMS
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* SMS Popup Component */}
      <SMSPopup
        isOpen={showSMSPopup}
        onClose={() => {
          setShowSMSPopup(false);
          setSelectedCustomerData(null);
        }}
        customerName={selectedCustomerName}
        customerData={selectedCustomerData}
        phoneNumbers={phoneNumbers}
        onSend={handleSendSMS}
      />
    </div>
  );
};

export default CustomersPage;