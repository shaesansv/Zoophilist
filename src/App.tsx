import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForestAnimations from "./components/ForestAnimations";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";

// User Pages
import Home from "./pages/user/Home";
import Order from "./pages/user/Order";
import Contact from "./pages/user/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <ForestAnimations />
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/home"
              element={
                <PrivateRouteAdmin>
                  <AdminHome />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRouteAdmin>
                  <AdminProducts />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <PrivateRouteAdmin>
                  <AdminCustomers />
                </PrivateRouteAdmin>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
