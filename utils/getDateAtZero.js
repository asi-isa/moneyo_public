export default function getDateAtZero(date) {
  date = new Date(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
}
