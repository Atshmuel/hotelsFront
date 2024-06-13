import { SERVER_URL } from "../utils/config";

export const getGuest = async (id) => {
  const res = await fetch(`${SERVER_URL}guests?id=${id}`, {
    credentials: "include",

  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};
