import { useState } from "react";
import { Sun, Globe, LogOut } from "lucide-react";
import SettingsSection from "../../components/sections/settingsSection/SettingsSection.jsx";
import ToggleRow from "../../components/rows/toggleRow/ToggleRow.jsx";
import SelectRow from "../../components/rows/selectRow/SelectRow.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import styles from "./Settings.module.css";

const LANGUAGES = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ar", label: "Arabic", flag: "🇸🇦" },
  { value: "fr", label: "French", flag: "🇫🇷" },
  { value: "es", label: "Spanish", flag: "🇪🇸" },
  { value: "de", label: "German", flag: "🇩🇪" },
  { value: "he", label: "Hebrew", flag: "🇮🇱" },
];

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const darkMode = theme === "dark";

  const [language, setLanguage] = useState("en");

  const handleSignOut = () => {
    //  auth logic
    alert("Signed out");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.card}>
        <SettingsSection label="Appearance">
          <ToggleRow
            icon={<Sun size={18} />}
            label="Dark Mode"
            description="Toggle dark/light theme"
            checked={darkMode}
            onChange={(val) => dispatch(setTheme(val ? "dark" : "light"))}
          />
        </SettingsSection>

        <div className={styles.divider} />

        <SettingsSection label="Language">
          <SelectRow
            icon={<Globe size={18} />}
            label="Display Language"
            description="Choose your preferred language"
            value={language}
            onChange={setLanguage}
            options={LANGUAGES}
          />
        </SettingsSection>

        <div className={styles.divider} />

        <button className={styles.signOutBtn} onClick={handleSignOut}>
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
