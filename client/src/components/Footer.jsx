import React from "react";
import { Phone, Mail, Palette, Instagram, Facebook, Linkedin } from "lucide-react";


const Footer = () => {
  return (
    <footer id="footer" className="bg-blue-700 text-gray-300 font-inter ">
      {/* Top CTA Section */}
      <div className="border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Design By */}
          <div className="flex items-center justify-center sm:justify-start">
            <Palette className="text-orange-500 w-8 h-8" />
            <div className="ml-3">
              <h4 className="text-white text-lg font-semibold">Design by</h4>
              <span className="text-sm flex items-center gap-1">
                @webugbusters 
              </span>
            </div>
          </div>
          {/* Call Us */}
          <div className="flex items-center justify-center">
            <Phone className="text-orange-500 w-8 h-8" />
            <div className="ml-3">
              <h4 className="text-white text-lg font-semibold">Call us</h4>
              <span className="text-sm">
                <a
                  href="tel:91-8652440318"
                  className="text-blue-300 hover:underline"
                >
                  +91-8652440318
                </a>
              </span>
            </div>
          </div>
          {/* Mail Us */}
          <div className="flex items-center justify-center sm:justify-end">
            <Mail className="text-orange-500 w-8 h-8" />
            <div className="ml-3">
              <h4 className="text-white text-lg font-semibold">Mail us</h4>
              <span className="text-sm">webugbusters@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 text-center md:text-left">
        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo2.png" alt="Logo" className="w-25 mb-4 bg-amber-50" />
          <p className="text-sm leading-relaxed text-gray-300">
            Our team Webugbusters is committed to build reliable and innovative
            digital solutions. Our mission is to create technology that serves
            humanity.
          </p>
          <div className="mt-4">
            <span className="text-white font-semibold block mb-2">
            Connect Us On
            </span>
           
<div className="flex gap-3 flex-wrap justify-center md:justify-start">
  {/* Instagram */}
  <a
    href="/"
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
  >
    <Instagram className="w-4 h-4" />
  </a>

  {/* Facebook */}
  <a
    href="/"
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white"
  >
    <Facebook className="w-4 h-4" />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/vinitkaple0718"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
  >
    <Linkedin className="w-4 h-4" />
  </a>
</div>
          </div>
        </div>

        {/* Emergency Helplines */}
     <div className=" m-auto flex flex-col items-center md:items-start px-6 space-y-5">
  {/* Useful Links */}
  <div>
    <h3 className="text-white text-lg font-semibold mb-1">Useful Links</h3>
    <ul className="text-sm space-y-2">
      <li>
        <a href="/terms-of-service" className="text-blue-300 hover:underline">
          Terms of Service
        </a>
      </li>
      <li>
        <a href="/privacy-policy" className="text-blue-300 hover:underline">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="/contact" className="text-blue-300 hover:underline">
          Contact Us
        </a>
      </li>
    </ul>
  </div>

  {/* Emergency Helplines */}
  <div>
    <h3 className="text-white text-lg font-semibold mb-2">Emergency Helplines</h3>
    <ul className="text-sm space-y-1">
      <li>
        National Emergency:{" "}
        <a href="tel:112" className="text-blue-300 hover:underline">
          112
        </a>
      </li>
      <li>
        Women's Helpline:{" "}
        <a href="tel:1091" className="text-blue-300 hover:underline">
          1091
        </a>
      </li>
    </ul>
  </div>
</div>



        {/* Disclaimer */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white text-lg font-semibold mb-4">Disclaimer</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            This website is under development for{" "}
            <span className="font-semibold">Smart India Hackathon 2025</span>,
            addressing Problem Statement ID{" "}
            <span className="font-semibold">25023</span> —{" "}
            <span className="italic">
              AyurSutra: Panchakarma Patient Management and Therapy Scheduling
              Software
            </span>
            . <br />
            Till development phase all names and references used on this platform are entirely
            imaginary or generated by AI. Any resemblance to real individuals,
            organizations, or entities is purely coincidental and unintended.{" "}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center text-sm text-black text-center">
          <p>© {new Date().getFullYear()} All Rights Reserved | Webugbusters</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
