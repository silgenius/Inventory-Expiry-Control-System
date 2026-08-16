import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import AddProduct from "../pages/AddProduct";
import Alerts from "../pages/Alerts";
import CheckEmail from "../pages/CheckEmail";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/EditProduct";
import ExpiryMonitor from "../pages/ExpiryMonitor";
import ForgotPassword from "../pages/ForgotPassword";
import Help from "../pages/Help";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Signup from "../pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/check-email" element={<CheckEmail />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout title="Dashboard" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<DashboardLayout title="Products" />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Route>
        <Route element={<DashboardLayout title="Expiry Monitor" />}>
          <Route path="/expiry-monitor" element={<ExpiryMonitor />} />
        </Route>
        <Route element={<DashboardLayout title="Alerts" />}>
          <Route path="/alerts" element={<Alerts />} />
        </Route>
        <Route element={<DashboardLayout title="Reports" />}>
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route element={<DashboardLayout title="Settings" />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<DashboardLayout title="Help" />}>
          <Route path="/help" element={<Help />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
