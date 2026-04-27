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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "menu", element: <Menu /> },
      { path: "kitchen", element: <Kitchen /> },
      { path: "tables", element: <Tables /> },
      { path: "inventory", element: <Inventory /> },
      { path: "employees", element: <Employees /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
