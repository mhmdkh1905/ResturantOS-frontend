import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layout/rootLayout/RootLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Orders from "../pages/orders/Orders.jsx";
import Menu from "../pages/menu/Menu.jsx";
import Kitchen from "../pages/kitchen/Kitchen.jsx";
import Tables from "../pages/tables/Tables.jsx";
import Inventory from "../pages/inventory/Inventory.jsx";
import Employees from "../pages/employees/Employees.jsx";
import Analytics from "../pages/analytics/Analytics.jsx";
import Settings from "../pages/settings/Settings.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import AdminRoute from "../routes/AdminRoute.jsx";
import AdminChefRoute from "../routes/AdminChefRoute.jsx";
import AdminWaiterRoute from "../routes/AdminWaiterRoute.jsx";
import Unauthorized from "../pages/unauthorized/Unauthorized.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "menu",
        element: (
          <ProtectedRoute>
            <AdminWaiterRoute>
              <Menu />
            </AdminWaiterRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "kitchen",
        element: (
          <ProtectedRoute>
            <AdminChefRoute>
              <Kitchen />
            </AdminChefRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "tables",
        element: (
          <ProtectedRoute>
            <AdminWaiterRoute>
              {" "}
              <Tables />
            </AdminWaiterRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <ProtectedRoute>
            <AdminChefRoute>
              <Inventory />
            </AdminChefRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <Employees />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
