import { LayoutGrid, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-70 border-r border-gray-200 p-8 hidden md:block">
      <div className="font-bold text-lg mb-6">agency</div>
      <nav className="space-y-4 text-gray-700 cursor-pointer">
        <div className="flex items-center gap-3 font-semibold text-blue-600">
          <LayoutGrid className="w-5 h-5 " />
          Boards
        </div>
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 " />
          Pages
        </div>
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 " />
          Settings
        </div>
      </nav>
    </aside>
  );
}
