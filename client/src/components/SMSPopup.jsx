// client/src/components/SMSPopup.jsx
import { useState } from "react";
import { Send, Phone, X } from "lucide-react";

const SMSPopup = ({ 
  isOpen, 
  onClose, 
  customerName, 
  customerData, 
  phoneNumbers,
  onSend 
}) => {
  const [smsMessage, setSmsMessage] = useState("");
  const [smsStatus, setSmsStatus] = useState({ message: "", type: "" });
  const [sendingSMS, setSendingSMS] = useState(false);

  // Product-specific offer templates
  const getProductOffer = (productType) => {
    const offers = {
      "Deposits": "special fixed deposit scheme with 8.5% interest rate",
      "Loans": "pre-approved loan at concessional interest rates",
      "Credit Cards": "lifetime free credit card with reward points",
      "Insurance": "comprehensive insurance cover with zero waiting period",
      "Investments": "wealth management plan with guaranteed returns",
      "default": "exclusive financial product"
    };
    return offers[productType] || offers.default;
  };

  const handleSendSMS = async (e) => {
    e.preventDefault();
    if (!smsMessage.trim()) {
      setSmsStatus({ message: "Please enter a message", type: "error" });
      return;
    }

    setSendingSMS(true);
    setSmsStatus({ message: "Sending to both numbers...", type: "info" });

    try {
      const result = await onSend(smsMessage);
      
      if (result.successful === 2) {
        setSmsStatus({ message: "✅ SMS sent successfully to both numbers!", type: "success" });
        setTimeout(() => {
          setSmsStatus({ message: "", type: "" });
          onClose();
          setSmsMessage("");
        }, 2000);
      } else if (result.successful === 1) {
        setSmsStatus({ message: "⚠️ Sent to one number only. Please check the other.", type: "warning" });
      } else {
        setSmsStatus({ message: "❌ Failed to send SMS to both numbers.", type: "error" });
      }
    } catch (error) {
      setSmsStatus({ message: "❌ Network error.", type: "error" });
    } finally {
      setSendingSMS(false);
    }
  };

  const setTemplateMessage = (templateType) => {
    const productOffer = getProductOffer(customerData?.product_type);
    const confidenceScore = customerData?.confidence_score || "high";
    
    const templates = {
      ai: `🏦 THAKUR BANK OF FINANCE
Dear ${customerName}, we are pleased to offer you our ${productOffer} tailored just for you!.Visit our nearest branch.`,

      offer: `🏦 THAKUR BANK OF FINANCE

Exclusive Offer for ${customerName}! 

We have a special ${productOffer} that perfectly matches your profile. Don't miss this opportunity to grow your wealth with India's most trusted bank.

Reply or call us today!

- Team Thakur Bank of Finance`,

      followup: `🏦 THAKUR BANK OF FINANCE

Dear ${customerName}, we noticed your interest in ${customerData?.product_type || "our products"}. 

Our financial expert would love to assist you with personalized guidance. Visit any branch or schedule a callback at your convenience.

Warm regards,
Team Thakur Bank of Finance`
    };

    setSmsMessage(templates[templateType]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative pointer-events-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Send size={20} className="text-green-500" />
            Thakur Bank of Finance - SMS
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Sending to:</p>
            <div className="space-y-2">
              {phoneNumbers.map((number, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <Phone size={14} className="text-indigo-500" />
                  {number}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Message will be sent to both numbers simultaneously
            </p>
          </div>

          <form onSubmit={handleSendSMS}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message for {customerName}
              </label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Type your message here..."
                disabled={sendingSMS}
              />
            </div>

            {/* Quick templates */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Quick Templates:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTemplateMessage('ai')}
                  className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200"
                >
                  🤖 AI Recommendation
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateMessage('offer')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200"
                >
                  🎁 Special Offer
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateMessage('followup')}
                  className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200"
                >
                  📞 Follow-up
                </button>
              </div>
            </div>

            {smsStatus.message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                smsStatus.type === 'success' ? 'bg-green-50 text-green-700' :
                smsStatus.type === 'error' ? 'bg-red-50 text-red-700' :
                smsStatus.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                {smsStatus.message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={sendingSMS}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingSMS ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send to Both Numbers
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setSmsMessage("");
                  setSmsStatus({ message: "", type: "" });
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMSPopup;