import { useNavigate } from "react-router-dom";
import styles from "./Unauthorized.module.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>403</h1>
        <h2 className={styles.subtitle}>Access Denied</h2>
        <p className={styles.text}>
          You don’t have permission to view this page.
        </p>

        <button
          className={styles.button}
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
