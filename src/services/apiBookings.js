import { SERVER_URL } from "../utils/config";
import { refreshTokenFunc } from "./apiUsers";

export const getAllBookings = async ({ filterVal, sortVal, page }) => {
  try {
    const res = await fetch(
      `${SERVER_URL}bookings/all?filter=${filterVal}&sortBy=${sortVal}&page=${page}`
      , {
        credentials: "include",

      });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 403) return await refreshTokenFunc();
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export async function getBooking(id) {
  try {
    const res = await fetch(`${SERVER_URL}bookings?bookingId=${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateBooking(id, newData) {
  const res = await fetch(`${SERVER_URL}bookings?bookingId=${id}`, {
    method: "PATCH",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data.message);
    }
    throw new Error(data?.message || data);
  }
  return data;
}

export async function deleteBookingApi(id) {
  const res = await fetch(`${SERVER_URL}bookings?bookingId=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 403) {
      await refreshTokenFunc();
      throw Error(data?.message);
    }
    throw new Error(data?.message || data);
  }
  return data;
}

export async function getBookingAfterDate(numDays, fields) {
  try {
    const res = await fetch(
      `${SERVER_URL}bookings/from?last=${numDays}&fields=${fields}`
      , {
        credentials: "include",

      });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 403) return await refreshTokenFunc();
      throw new Error(data?.message || data?.error);
    }
    return data;
  } catch (error) {
    return error;
  }
}
