export default function getDatesFromObjArr(objArr) {
  const dates = [];
  for (let index = 0; index < objArr.length; index++) {
    const element = objArr[index];
    const rawDate = new Date(element.date);
    dates.push(
      new Date(
        rawDate.getFullYear(),
        rawDate.getMonth(),
        rawDate.getDate(),
        0
      ).getTime()
    );
  }
  return dates;
}
