import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layout/rootLayout/RootLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Orders from "../pages/orders/Orders.jsx";
import Menu from "../pages/menu/Menu.jsx";
import Kitchen from "../pages/kitchen/Kitchen.jsx";
import Tables from "../pages/tables/Tables.jsx";
import Inventory from "../pages/inventory/Inventory.jsx";
import Employees from "../pages/employees/Employees.jsx";
import Settings from "../pages/settings/Settings.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import AdminRoute from "../routes/AdminRoute.jsx";
import AdminChefRoute from "../routes/AdminChefRoute.jsx";
import AdminWaiterRoute from "../routes/AdminWaiterRoute.jsx";
import Unauthorized from "../pages/unauthorized/Unauthorized.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
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
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "menu",
        element: (
          <AdminWaiterRoute>
            <Menu />
          </AdminWaiterRoute>
        ),
      },
      {
        path: "kitchen",
        element: (
          <AdminChefRoute>
            <Kitchen />
          </AdminChefRoute>
        ),
      },
      {
        path: "tables",
        element: (
          <AdminWaiterRoute>
            <Tables />
          </AdminWaiterRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <AdminChefRoute>
            <Inventory />
          </AdminChefRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <AdminRoute>
            <Employees />
          </AdminRoute>
        ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
