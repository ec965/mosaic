export const dateString = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  let month = months[d.getMonth()];

  let year = d.getFullYear();
  let day = d.getDate();
  let time = d.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

  if (year === new Date().getFullYear()) {
    return `${month} ${day} at ${time}`;
  } else {
    return `${month} ${day}, ${year} at ${time}`;
  }
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

export function redirect(path) {
  window.location.replace(window.location.origin + path);
}

export function maxPixelSize(length) {
  if (window.innerWidth < 495) return 240 / length;
  return 450 / length;
}

export function maxPixelCardWidth() {
  if (window.innerWidth < 495) return 340;
  if (window.innerWidth < 830) return 340;
  return 450;
}

export function maxProjectWidth() {
  if (window.innerWidth < 495) return 340;
  if (window.innerWidth < 1200) return window.innerWidth * 0.75;
  return window.innerWidth * 0.5;
}
