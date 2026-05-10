import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import EmployeeCard from "../../components/cards/employeeCard/EmployeeCard.jsx";
import AddEmployeeModal from "../../components/modals/addEmployeeModal/AddEmployeeModal.jsx";
import { useEmployees } from "../../hooks/useEmployees.js";
import Toast from "../../components/ui/Toast.jsx";
import styles from "./Employees.module.css";

function EmployeesSkeleton() {
  const sk = styles.skeleton;
  return (
    <div className={styles.page} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading employees…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
        <div className={`${sk} ${styles.skBtn}`} aria-hidden />
      </div>
      <div className={styles.grid} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skCard} />
        ))}
      </div>
    </div>
  );
}

export default function Employees() {
  const {
    employees,
    isLoading,
    isError,
    error,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    addError,
    deleteError,
    updateError,
    addSuccess,
    deleteSuccess,
    updateSuccess,
  } = useEmployees();

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAdd = (emp) => {
    addEmployee(emp);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  const handleEdit = (id, updated) => {
    updateEmployee({ id, data: updated });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const anyerror = addError || updateError || deleteError;

  useEffect(() => {
    if (anyerror) {
      showToast(anyerror.message || "An error occurred", "error");
    }
  }, [anyerror]);

  const successMessage =
    (addSuccess && "Employee added successfully!") ||
    (updateSuccess && "Employee updated successfully!") ||
    (deleteSuccess && "Employee deleted successfully!");

  useEffect(() => {
    if (successMessage) {
      showToast(successMessage, "success");
    }
  }, [successMessage]);

  if (isLoading) {
    return <EmployeesSkeleton />;
  }

  if (isError) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Employees</h1>
          <p className={styles.subtitle}>
            Roles, hours, salary — keep your roster current.
          </p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <p className={styles.empty}>No employees yet.</p>
      ) : (
        <div className={styles.grid}>
          {employees
            .slice()
            .sort((a, b) => {
              const roleOrder = { Admin: 0, Chef: 1, Waiter: 2 };
              return (roleOrder[a.role] ?? 3) - (roleOrder[b.role] ?? 3);
            })
            .map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
        </div>
      )}

      {showModal && (
        <AddEmployeeModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
