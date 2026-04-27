import { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import styles from "./Toast.module.css";

export default function Toast({
  message,
  type = "error",
  onClose,
  duration = 5000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>
        {type === "success" ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
      </div>
      <p className={styles.message}>{message}</p>
      <button
        className={styles.closeBtn}
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
}
