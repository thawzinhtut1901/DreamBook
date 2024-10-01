import Cookies from "js-cookie";

const TOKEN_KEY = "DreamBookToken";

export function login(token: string) {
  Cookies.set(TOKEN_KEY, token, {
    expires: 100,
    secure: true,
    sameSite: "strict",
  });
}

export function logout() {
  Cookies.remove(TOKEN_KEY);
  window.location.reload();
  localStorage.removeItem("theme");
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
