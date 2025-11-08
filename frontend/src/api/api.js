import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1234", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export 
async function registerUser(data) {
  return api.post("/users/register", data);
}
export async function loginUser(data) {
  return api.post("/users/login", data);
}

export async function getUserProfile() {
  return api.get("/users/profile");
}

// Add a new bus 
export async function addBus(data) {
  return api.post("/buses", data);
}


export async function updateBus(id, data) {
  return api.put(`/buses/${id}`, data);
}

// Delete bus 
export async function deleteBus(id) {
  return api.delete(`/buses/${id}`);
}

// buses
export async function getAllBuses() {
  return api.get("/buses");
}
export async function getBusById(id) {
  return api.get(`/buses/${id}`);
}

// bookings 
export async function addBooking(data) {
  return api.post("/bookings/add", data);
}
export async function getBookingsByUser(userId) {
  return api.get(`/bookings/getByUser/${userId}`); 
}
export async function getAllBookings() {
  return api.get("/bookings/getAll");
}

export async function getBookingById(id) {
  return api.get(`/bookings/get/${id}`);
}

export async function updateBooking(id, data) {
  return api.put(`/bookings/update/${id}`, data);
}

export async function deleteBooking(id) {
  return api.delete(`/bookings/delete/${id}`);
}

// Admin login
export async function loginAdmin(data) {
  return api.post("/admin/login", data);
}


export async function registerAdmin(data) {
  return api.post("/admin/register", data);
}

export default api;
