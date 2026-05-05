import { useNavigate } from "react-router-dom";
import { House, MoveLeft } from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <MoveLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
