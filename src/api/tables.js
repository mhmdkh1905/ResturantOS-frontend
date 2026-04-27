import api from "../lib/axios.js";

export const getTables = async () => {
  const res = await api.get("/tables");

  return res.data.map((table) => ({
    id: table._id,
    number: table.number,
    seats: table.capacity,
    status: table.status.toLowerCase(),
  }));
};

export const createTable = async ({ number, seats }) => {
  const res = await api.post("/tables", {
    number,
    capacity: seats,
  });

  return res.data;
};

export const updateTable = async (id, data) => {
  const payload = {
    ...(data.seats && { capacity: data.seats }),
    ...(data.status && {
      status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
    }),
  };

  const res = await api.patch(`/tables/${id}`, payload);
  return res.data;
};

export const deleteTable = async (id) => {
  const res = await api.delete(`/tables/${id}`);
  return res.message;
};

export const updateTableStatus = async (id, status) => {
  const res = await api.patch(`/tables/${id}/status`, {
    status: status.charAt(0).toUpperCase() + status.slice(1),
  });
  return res.data;
};
