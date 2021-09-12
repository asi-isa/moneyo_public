import add from "date-fns/add";

export default function getNextDate(currentDate, interval) {
  if (interval === "monthly") return add(currentDate, { months: 1 });
  if (interval === "weekly") return add(currentDate, { weeks: 1 });
  if (interval === "yearly") return add(currentDate, { years: 1 });
  if (interval === "halfYearly") return add(currentDate, { months: 6 });
}
