import { SERVER_URL } from "../utils/config";
import { refreshTokenFunc } from "./apiUsers";

export const getGuest = async (id) => {
  const res = await fetch(`${SERVER_URL}guests?id=${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};
