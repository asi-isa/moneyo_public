export default function truncateString(str, n) {
  if (str.length > n) {
    return str.slice(0, n) + "...";
  }
  return str.slice(0, n);
}
