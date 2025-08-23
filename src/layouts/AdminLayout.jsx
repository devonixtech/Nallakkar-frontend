import { useState } from "react";
import AdminSidebar from "../Components/layout/AdminSidebar";
import AdminNavbar from "../components/layout/AdminNavbar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="lg:ml-64">
        {/* <AdminNavbar /> */}
        <AdminNavbar onMenuToggle={() => setIsOpen(true)} title="Dashboard" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
