import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 flex items-center justify-center px-6">
      
      {/* Outer Rounded Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-[36px] shadow-2xl p-10 md:p-14">
        
        {/* Decorative soft shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-200 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-60"></div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          
          {/* LEFT SECTION */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-sky-600 mb-3">
              Let’s talk
            </h1>

            <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
              To request a quote or discuss collaboration,
              contact us directly or fill out the form and we’ll
              get back to you promptly.
            </p>

            <div className="space-y-5 mb-8">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <textarea
                rows="4"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-sky-100 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button className="px-10 py-3 rounded-full bg-sky-500 text-white font-semibold shadow-md hover:bg-sky-600 active:scale-95 transition">
              Send Message
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-center justify-center relative">
            
            {/* Illustration circle */}
            <div className="w-56 h-56 bg-sky-100 rounded-full flex items-center justify-center relative">
              <div className="w-32 h-24 bg-white rounded-xl shadow-md flex items-center justify-center text-sky-500 text-xl">
                ✉️
              </div>

              {/* Floating elements */}
              <span className="absolute top-6 left-10 w-3 h-3 bg-sky-400 rounded-full"></span>
              <span className="absolute bottom-10 right-12 w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="absolute top-16 right-8 text-sky-400">✈️</span>
            </div>

            {/* Contact Info */}
            <div className="mt-10 text-sm text-gray-500 space-y-3 text-center">
              <p>
                📍 Thakur Village, Kandivali (E),<br />
                Mumbai, India
              </p>
              <p>📞 +91 12345 67890</p>
              <p>✉️ apica@465154.com</p>
            </div>

            {/* Partner LinkedIn Icons */}
            <div className="flex gap-4 mt-6">
              {[
                { label: "V", link: "http://linkedin.com/in/vinitkaple0718/" },
                { label: "A", link: "https://www.linkedin.com/in/alok-jha-933943357/" },
                { label: "R", link: "https://www.linkedin.com/in/ravishankar-kanaki-355661269/" },
              ].map((partner) => (
                <a
                  key={partner.label}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 font-semibold flex items-center justify-center hover:bg-sky-200 hover:scale-110 transition cursor-pointer"
                  title={`LinkedIn – ${partner.label}`}
                >
                  {partner.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;