export const dateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
