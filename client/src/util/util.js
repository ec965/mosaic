export const dateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const getToken = () => {
  return getStorageItem("token");
};

const getStorageItem = (key) => {
  let value = localStorage.getItem(key);
  if (!value) {
    value = sessionStorage.getItem(key);
  }

  return value;
};
