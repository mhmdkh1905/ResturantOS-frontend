import { useState, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Settings } from "lucide-react";
import Sidebar from "../sidebar/Sidebar.jsx";
import { getUser } from "../../../utils/auth.js";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getUser();

  const initials = useMemo(() => {
    const name = (user?.name || user?.email || "?").trim();
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }, [user?.name, user?.email]);

  const roleLabel = user?.role
    ? String(user.role).charAt(0).toUpperCase() + String(user.role).slice(1)
    : "Staff";

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.main}>
        <header className={styles.topBar} aria-label="App bar">
          <div className={styles.topBarStart}>
            <button
              type="button"
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2} aria-hidden />
            </button>
            <div className={styles.topBarBrand}>
              <span className={styles.brandMark}>RestaurantOS</span>
              <span className={styles.brandDivider} aria-hidden />
              <span className={styles.brandTag}>Operations</span>
            </div>
          </div>

          <div className={styles.topBarActions}>
            <Link
              to="/settings"
              className={styles.settingsLink}
              title="Settings"
            >
              <Settings size={18} strokeWidth={2} aria-hidden />
              <span className={styles.srOnly}>Settings</span>
            </Link>
            <div className={styles.userChip}>
              <span className={styles.avatar} aria-hidden>
                {initials}
              </span>
              <div className={styles.userText}>
                <span className={styles.userName}>
                  {user?.name?.trim() || user?.email || "Signed in"}
                </span>
                <span className={styles.rolePill}>{roleLabel}</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
