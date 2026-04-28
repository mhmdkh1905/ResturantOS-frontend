import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  console.log("Current theme:", theme);

  useEffect(() => {
    console.log("Setting data-theme to:", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
