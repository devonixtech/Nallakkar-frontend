import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    products: false,
    settings: false,
  });

  const toggleSubmenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      hasSubmenu: true,
      submenu: [
        { label: "Add Product", href: "/admin/products/add" },
        { label: "Product List", href: "/admin/products" },
        { label: "Categories", href: "/admin/categories" },
      ],
    },
    // {
    //   id: "categories",
    //   label: "Categories",
    //   icon: Package,
    //   hasSubmenu: true,
    //   submenu: [
    //     { label: "Add Category", href: "/admin/categories/add" },
    //     { label: "Category List", href: "/admin/categories" },
    //   ],
    // },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { label: "Profile", href: "/admin/settings/profile" },
        { label: "Change Password", href: "/admin/settings/password" },
        { label: "Logout", href: "/admin/logout", icon: LogOut },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <button
              onClick={onClose}
              className="lg:hidden w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedMenus[item.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedMenus[item.id] && (
                        <ul className="mt-1 ml-8 space-y-1">
                          {item.submenu?.map((subItem, index) => (
                            <li key={index}>
                              <Link
                                to={subItem.href}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                  location.pathname === subItem.href
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                                onClick={onClose}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                        location.pathname === item.href
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={onClose}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
