export default function dateToString(date) {
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return day + "." + month + "." + year;
}

function addLeadingZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
