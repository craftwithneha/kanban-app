


import { useState } from "react";
import { LayoutGrid, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Boards", icon: LayoutGrid, active: true },
    { label: "Pages", icon: FileText },
    { label: "Settings", icon: Settings },
  ];

  return (
    <>
      

      {/* 🧭 Sidebar - Hidden on small screens unless toggled */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-white w-full md:w-64 border-r border-gray-200 shadow-sm transition-all duration-300`}
      >
        <div className="p-6 md:pt-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-black-600 mb-6">agency</div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md w-full text-left transition-all ${
                  active
                    ? "bg-blue-50 text-blue-400 font-semibold"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => {
                  console.log(`Clicked ${label}`);
                  // Optionally auto-close sidebar on small screens:
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
