import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[50vh] flex items-center">
      <div className="max-w-[90rem] mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-5">
        {/* Left Content */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl md:text-6xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Streamline Your{" "}
            <span className="block text-blue-600">Ayurvedic Journey</span>
          </h2>

          <span className="block mt-1 text-lg md:text-2xl lg:text-3xl text-gray-700">
            With Our Holistic Panchakarma Management Platform
          </span>

          <h5 className="mt-4 text-gray-500 italic text-base md:text-lg lg:text-xl">
          "Rediscover your balance. Embrace Ayurveda."

          </h5>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/join"
              className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white text-sm md:text-lg rounded-lg shadow-md hover:bg-blue-700 transition w-fit mx-auto sm:mx-0"
            >
              Join as Practitioner
            </Link>
            <Link
              to="/book"
              className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-blue-600 text-blue-600 text-sm md:text-lg rounded-lg shadow-md hover:bg-blue-50 transition w-fit mx-auto sm:mx-0"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/hero.png"
            alt="Landing"
            className="max-w-xs md:max-w-md lg:max-w-2xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
