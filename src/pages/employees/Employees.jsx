import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import EmployeeCard from "../../components/cards/employeeCard/EmployeeCard.jsx";
import AddEmployeeModal from "../../components/modals/addEmployeeModal/AddEmployeeModal.jsx";
import { useEmployees } from "../../hooks/useEmployees.js";
import Toast from "../../components/ui/Toast.jsx";
import styles from "./Employees.module.css";

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
    return <p className={styles.loading}>Loading employees...</p>;
  }

  if (isError) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Employees</h1>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <p className={styles.empty}>No employees yet.</p>
      ) : (
        <div className={styles.grid}>
          {employees.map((emp) => (
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
