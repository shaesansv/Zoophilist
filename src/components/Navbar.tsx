import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/admin/home"
                className="text-xl font-bold text-forest-glow"
              >
                🌲 Zoophilist Admin
              </Link>
              <div className="flex space-x-6">
                <Link
                  to="/admin/home"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/admin/home"
                      ? "bg-primary text-primary-foreground"
                      : "text-forest-text hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/admin/products"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/admin/products"
                      ? "bg-primary text-primary-foreground"
                      : "text-forest-text hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/admin/customers"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/admin/customers"
                      ? "bg-primary text-primary-foreground"
                      : "text-forest-text hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-forest-text hover:text-foreground text-sm"
              >
                View Site
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("admin_token");
                  window.location.href = "/admin/login";
                }}
                className="forest-button text-sm px-3 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-forest-glow">
            🐾 Zoophilist
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-forest-text hover:text-foreground hover:bg-accent"
              }`}
            >
              Home
            </Link>
            <Link
              to="/order"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/order"
                  ? "bg-primary text-primary-foreground"
                  : "text-forest-text hover:text-foreground hover:bg-accent"
              }`}
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "bg-primary text-primary-foreground"
                  : "text-forest-text hover:text-foreground hover:bg-accent"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
