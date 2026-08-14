import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import ProductDetails from '../pages/ProductDetails'
import ExpiryMonitor from '../pages/ExpiryMonitor'
import Alerts from '../pages/Alerts'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import Help from '../pages/Help'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

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
  )
}
