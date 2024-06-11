import { SERVER_URL } from "../utils/config";
import { refreshTokenFunc } from "./apiUsers";

export const getCabin = async (id) => {
  const res = await fetch(`${SERVER_URL}cabins/byID?id=${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const getCabins = async () => {
  const res = await fetch(`${SERVER_URL}cabins`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};

export const createCabin = async (newCabinData) => {
  const res = await fetch(`${SERVER_URL}cabins`, {
    method: "POST",
    mode: "cors",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCabinData),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data.message);
    }
    throw new Error(data?.message || data?.error);
  }
  return data;
};

export const deleteCabin = async (id) => {
  const res = await fetch(`${SERVER_URL}cabins?id=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data.message);
    }
    throw new Error(data?.error);
  }
  return data;
};

export const editCabin = async (id, newCabinData) => {
  if (!id) throw new Error(`Could not edit cabin without ID.`);
  const res = await fetch(`${SERVER_URL}cabins?id=${id}`, {
    method: "PATCH",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCabinData),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data.message);
    }
    throw new Error(data?.error || data?.message || "Could not perform your request.");
  }
  return data;
};
