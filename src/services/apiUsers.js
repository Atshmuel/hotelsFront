import { SERVER_URL } from "../utils/config";

export async function loginUser({ email, password }) {
  const res = await fetch(`${SERVER_URL}users/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);

  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${SERVER_URL}users/userInfo`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);
  return data;
}

export async function logoutUser() {
  const res = await fetch(`${SERVER_URL}users/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);

  return data;
}

export async function refreshTokenFunc() {
  try {
    const res = await fetch(`${SERVER_URL}users/refresh`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const { accessToken } = await res.json();
    if (!accessToken) throw new Error("Failed to get new access Token");
    return accessToken;
  } catch (error) {
    console.error("Token refresh error:", error.message);
  }
}

export async function checkToken() {
  const res = await fetch(`${SERVER_URL}users/login`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) return;
  return data;
}

export async function getAllUsers() {
  const res = await fetch(`${SERVER_URL}users/all`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);
  return data;
}

export async function signupUser(newUserData) {
  const res = await fetch(`${SERVER_URL}users/signup`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUserData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data);
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`${SERVER_URL}users/delete?id=${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || data);
  return data;
}


export async function updateUserData({ firstName, lastName, phone, userAvatar, newPassword, oldPassword, role, id }) {
  const res = await fetch(`${SERVER_URL}users/update/${newPassword ? "password" : "data"}`
    , {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword ? { newPassword, oldPassword } : { firstName, lastName, phone, userAvatar, role, id }),
    });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message);
  return data;
}