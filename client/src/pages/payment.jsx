import React, { useState } from "react";

const Payment = () => {
  const [method, setMethod] = useState("card");
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    setTimeout(() => {
      setPaid(true);
    }, 1500);
  };

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[400px]">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Successful
          </h2>
          <p className="text-gray-500 mb-6">
            Your APICA Subscription has been activated.
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-5xl p-8 grid md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE - PAYMENT FORM */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Complete Your Payment
          </h2>

          {/* Payment Method Tabs */}
          <div className="flex gap-4 mb-6">
            {["card", "upi", "netbanking"].map((type) => (
              <button
                key={type}
                onClick={() => setMethod(type)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium ${
                  method === type
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {type === "card"
                  ? "Card"
                  : type === "upi"
                  ? "UPI"
                  : "Net Banking"}
              </button>
            ))}
          </div>

          {/* CARD FORM */}
          {method === "card" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* UPI FORM */}
          {method === "upi" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter UPI ID (example@upi)"
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                Supported Apps: Google Pay, PhonePe, Paytm, BHIM
              </div>
            </div>
          )}

          {/* NET BANKING */}
          {method === "netbanking" && (
            <div className="space-y-4">
              <select className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Select Your Bank</option>
                <option>SBI</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
              <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
                You will be redirected to your bank’s secure page.
              </div>
            </div>
          )}

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            className="w-full mt-8 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Pay Securely
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Secured by RBI-compliant encrypted gateway. All transactions are protected.
          </p>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <span>APICA Pro Plan</span>
            <span>₹4,999</span>
          </div>

          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <span>GST (18%)</span>
            <span>₹899</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>₹5,898</span>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            ✔ AI Recommendation Engine  
            ✔ Command Center Dashboard  
            ✔ Generative Insight Module  
            ✔ RBI Compliance Wrapper  
            ✔ Multi-bank Secure Access  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;