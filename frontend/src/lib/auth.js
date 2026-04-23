// import { apiRequest } from "./api";

// // ✅ FIXED
// export const registerUser = (data) =>
//   apiRequest("/api/auth/signup", "POST", data);

// export const loginUser = (data) =>
//   apiRequest("/api/auth/login", "POST", data);;
import { apiRequest } from "./api";

export const registerUser = (data) =>
  apiRequest("/auth/signup", "POST", data);

export const loginUser = (data) =>
  apiRequest("/auth/login", "POST", data);