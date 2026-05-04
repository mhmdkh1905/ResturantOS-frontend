import api from "../lib/axios.js";

export const getEmployees = async () => {
  const res = await api.get("/employees");

  const employees = res.data.data;

  return employees.map((employee) => ({
    id: employee._id,
    name: employee.name,
    role: employee.role,
    phoneNumber: employee.phoneNumber,
    email: employee.email,
    salaryPerHour: employee.salaryPerHour,
    workedHours: employee.workedHours,
    totalSalary: employee.totalSalary,
  }));
};

export const createEmployee = async (data) => {
  const res = await api.post("/employees", {
    name: data.name,
    role: data.role.toLowerCase(),
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: data.password,
    salaryPerHour: data.salaryPerHour,
    workedHours: data.workedHours,
  });
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const payload = {
    ...(data.name && { name: data.name }),
    ...(data.role && { role: data.role }),
    ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
    ...(data.email && { email: data.email }),
    ...(data.salaryPerHour && { salaryPerHour: data.salaryPerHour }),
    ...(data.workedHours && { workedHours: data.workedHours }),
  };
  const res = await api.put(`/employees/${id}`, payload);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.message;
};

export const getEmployeeByName = async (name) => {
  const res = await api.get(`/employees/name/${name}`);
  return res.data.map((employee) => ({
    id: employee._id,
    name: employee.name,
    role: employee.role,
    phoneNumber: employee.phoneNumber,
    email: employee.email,
    salaryPerHour: employee.salaryPerHour,
    workedHours: employee.workedHours,
    totalSalary: employee.totalSalary,
  }));
};

export const getEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  const employee = res.data;
  return {
    id: employee._id,
    name: employee.name,
    role: employee.role,
    phoneNumber: employee.phoneNumber,
    email: employee.email,
    salaryPerHour: employee.salaryPerHour,
    workedHours: employee.workedHours,
    totalSalary: employee.totalSalary,
  };
};

export const getEmployeeTotalSalary = async (id) => {
  const res = await api.get(`/employees/${id}/total-salary`);
  return res.data.totalSalary;
};

export const updateEmployeeWorkedHours = async (id, workedHours) => {
  const res = await api.patch(`/employees/${id}/worked-hours`, { workedHours });
  return res.data;
};

export const updateEmployeeSalary = async (id, salary) => {
  const res = await api.patch(`/employees/${id}/salary`, { salary });
  return res.data;
};

export const resetEmployeeWorkedHours = async (id) => {
  const resetWorkedHours = 0;
  const res = await api.patch(`/employees/reset-worked-hours/${id}`, {
    workedHours: resetWorkedHours,
  });
  return res.data;
};

export const resetAllEmployeesWorkedHours = async () => {
  const resetWorkedHours = 0;
  const res = await api.patch(`/employees/reset-worked-hours`, {
    workedHours: resetWorkedHours,
  });
  return res.data;
};
