import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Brain,
  Phone,
  Power,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [bank, setBank] = useState({});

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/bank-analytics/info@thakurbankfinance.com`,
    )
      .then((res) => res.json())
      .then((data) => setBank(data || {}))
      .catch((err) => console.error(err));
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Customers", icon: Users, path: "/dashboard/customers" },
      { name: "AI Engine", icon: Brain, path: "/dashboard/ai-engine" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
      { name: "Contact us ", icon: Phone, path: "/dashboard/contactus" },
      { name: "Log Out ", icon: Power, path: "/" }
  ];

  return (
 <div className="w-64 h-screen bg-gray-50 border-r flex flex-col justify-between p-6">

      {/* Top Section */}
      <div>
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600">
            {bank.name || "Thakur Bank of Finance"}
          </h1>
          <p className="text-sm text-gray-500">
            {bank.email || "info@thakurbankfinance.com"}
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
          <NavLink
  key={index}
  to={item.path}
  end={item.path === "/dashboard"}
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`
  }
>
  <Icon size={18} />
  {item.name}
</NavLink>

            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t pt-4 text-sm text-gray-400">© 2026 APICA</div>
    </div>
  );
};

export default Sidebar;
