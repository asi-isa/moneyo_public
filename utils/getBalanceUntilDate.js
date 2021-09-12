export default function getBalanceUntilDate(finances, dateUntil) {
  let balance = 0;
  for (const finance of finances) {
    if (new Date(finance.date) <= new Date(dateUntil)) {
      balance += finance.amount;
    } else {
      break;
    }
  }
  return balance;
}
