import { SERVER_URL } from "../utils/config";
import { refreshTokenFunc } from "./apiUsers";

export async function updateSettings(updatedSetting) {
  const res = await fetch(`${SERVER_URL}settings`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify(updatedSetting),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data.message);
    }

    throw Error(data.error);
  }

  return data;
}

export async function getSettings() {
  const res = await fetch(`${SERVER_URL}settings`);
  const data = await res.json();
  //TODO should edit the error message
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
}
