export default function jsDateToHtmlDate(jsDate) {
  const day = addLeadingZero(jsDate.getDate());
  const month = addLeadingZero(jsDate.getMonth() + 1);
  const year = jsDate.getFullYear();

  return year + "-" + month + "-" + day;
}

function addLeadingZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
