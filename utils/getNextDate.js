export default function getNextDate(currentDate, interval) {
  let nextDate;
  if (interval === "monthly") {
    nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate() + 1 // +1 da sonst Vortag
    );
  }
  return nextDate;
}
