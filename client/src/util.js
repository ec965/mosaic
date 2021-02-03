export const dateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}