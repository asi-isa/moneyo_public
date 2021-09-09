export default function getNextNDate(n, date) {
  const mydate = new Date(date);
  mydate.setDate(mydate.getDate() + n);
  return mydate;
}
