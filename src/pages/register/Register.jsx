import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Flame } from "lucide-react";
import styles from "./Register.module.css";

const ROLES = ["manager", "chef", "waiter", "cashier", "cleaner"];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "waiter",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Flame size={22} color="#fff" />
          </div>
          <span className={styles.logoText}>RestaurantOS</span>
        </div>

        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Get started with RestaurantOS</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User size={15} className={styles.inputIcon} />
              <input
                className={styles.input}
                type="text"
                placeholder="Ahmad Hassan"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>

         
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={15} className={styles.inputIcon} />
              <input
                className={styles.input}
                type="email"
                placeholder="you@restaurant.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Role</label>
            <select
              className={`${styles.input} ${styles.select}`}
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                className={styles.input}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass((p) => !p)}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

         
          <div className={styles.field}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                className={styles.input}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm((p) => !p)}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Account
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.switchLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
