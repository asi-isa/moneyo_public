import getToday from "./getToday";

export default function getCurrentBalance(finances) {
  const today = getToday();

  let currentBalance = 0;
  for (const finance of finances) {
    if (new Date(finance.date) <= today) {
      currentBalance += finance.amount;
    }
  }

  return currentBalance;
}
