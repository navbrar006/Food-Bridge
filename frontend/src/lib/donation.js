import { apiRequest } from "./api";

export const createDonation = (data, token) =>
  apiRequest("/donations", "POST", data, token);

export const getDonations = () =>
  apiRequest("/donations");