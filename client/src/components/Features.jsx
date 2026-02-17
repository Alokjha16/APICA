import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { featuresData } from "../assets/featuresData";
import { 
  Stethoscope, FileText, BookOpen, CheckCircle, 
  LayoutDashboard, MessageSquare, ShoppingBag, 
  PackageSearch, Megaphone, MapPin 
} from "lucide-react";

const iconMap = { 
  Stethoscope, FileText, CheckCircle, LayoutDashboard, 
  BookOpen, MessageSquare, ShoppingBag, PackageSearch, 
  Megaphone, MapPin 
};

const Features = () => {
  const navigate = useNavigate();

  const handleCardClick = (feature) => {
    // Special case for AyurBot
    if (feature.title === "AyurBot") {
      toast.success("AyurBot is available at the bottom right corner.");
      return;
    }

    // Direct navigation for everything else
    if (feature.route) {
      navigate(feature.route);
    }
  };

  return (
    <section id="features" className="py-4 mb-4 mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Discover AyurSutra To Elevate Your Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Simplified Dashboard Card */}
          <div
            onClick={() => navigate("/admin")} // Direct navigation to admin/dashboard
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-start space-y-4"
          >
            <LayoutDashboard className="h-10 w-10 text-blue-600" />
            <h3 className="text-xl font-semibold">Go to Dashboard</h3>
            <p className="text-gray-600">
              Access your personalized dashboard and manage your tasks efficiently.
            </p>
          </div>

          {/* Render all features from the data file */}
          {featuresData.slice(1).map((feature, index) => {
            const Icon = iconMap[feature.iconName];
            return (
              <div
                key={index}
                onClick={() => handleCardClick(feature)}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-start space-y-4"
              >
                {feature.image ? (
                  <img src={feature.image} alt={feature.title} className="h-10 w-10" />
                ) : (
                  Icon && <Icon className="h-10 w-10 text-blue-600" />
                )}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <Toaster />
      </div>
    </section>
  );
};

export default Features;