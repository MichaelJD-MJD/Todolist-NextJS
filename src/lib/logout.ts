import { axiosInstance } from "./axios";
import { useUserStore } from "./store";

export const logout = async () => {
  await axiosInstance.post("/users/auth/logout");

  localStorage.removeItem("token");
  useUserStore.getState().clearUser();
  window.location.href = "/login";
};
