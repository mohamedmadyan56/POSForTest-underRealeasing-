import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Rocket, Bell, User } from "lucide-react";
import { HiMenu, HiX } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  // محاكاة لحالة المستخدم

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Invoices", path: "/invoices" },
    { name: "Customers", path: "/customers" },
    { name: "Reports", path: "/reports" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#f8f6f1]/80 border-b border-neutral-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-neutral-900">
          <Rocket className="w-6 h-6 text-yellow-500" />
          <span>POS System</span>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? "text-yellow-500"
                  : "text-neutral-500 hover:text-yellow-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          {user ? (
            // User Logged In
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link to="/notifications" className="group">
                <div className="relative transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12">
                  <Bell size={22} className="text-yellow-500" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#f8f6f1]"></span>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="hidden md:block bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 rounded-full font-medium text-white hover:shadow-lg transition-all"
              >
                خروج
              </button>
            </div>
          ) : (
            // User Not Logged In
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-neutral-700 hover:text-yellow-500 font-medium"
              >
                تسجيل الدخول
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 rounded-full text-white font-medium"
              >
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-neutral-900 text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#f8f6f1] border-t border-neutral-300 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 text-neutral-900">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium transition-all duration-300 hover:text-yellow-500 ${
                location.pathname === link.path
                  ? "text-yellow-500"
                  : "text-neutral-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4 mt-2 pt-4 border-t border-neutral-200">
              <Bell size={22} className="text-yellow-500" />
              <User size={22} className="text-yellow-500" />
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-neutral-700 hover:text-red-500 transition-colors"
              >
                خروج
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className="text-neutral-700 hover:text-yellow-500 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 rounded-full text-white font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Header };
