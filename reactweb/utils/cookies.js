export const setCookie = (name, value, days = 7) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  document.cookie = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};