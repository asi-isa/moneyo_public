import getToday from "./getToday";

export default function getCurrentBalance(finances) {
  const today = getToday();
  const todayPlusTwoHours = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    2
  ); // dont ask

  let currentBalance = 0;
  for (const finance of finances) {
    if (new Date(finance.date) <= todayPlusTwoHours) {
      currentBalance += finance.amount;
    }
  }

  return currentBalance;
}
