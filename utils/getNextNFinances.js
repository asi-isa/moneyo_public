import getToday from "./getToday";
import getNextNDate from "./getNextNDate";
import getDateAtZero from "./getDateAtZero";

export default function getNextNFinances(n, finances) {
  const today = getToday();
  const todayPlusN = getNextNDate(n, today);
  const income = new Array(n).fill(0);
  const expense = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (const finance of finances) {
      // stop early, optimization
      if (finance.date > todayPlusN) break;
      if (
        getNextNDate(i, today).getTime() ===
        getDateAtZero(finance.date).getTime()
      ) {
        if (finance.amount >= 0) income[i] += finance.amount;
        if (finance.amount < 0) expense[i] += Math.abs(finance.amount);
      }
    }
  }

  return { income, expense };
}
