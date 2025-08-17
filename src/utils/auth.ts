export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return Boolean(token);
}

export function logout(): void {
  localStorage.removeItem("token");
  window.location.href = "/login";
}