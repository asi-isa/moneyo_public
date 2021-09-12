export default function getBalancesForAllDates(finances) {
  const allBalances = {};
  allBalances[finances[0].date] = finances[0].amount;
  for (let idx = 1; idx < finances.length; idx++) {
    const finance = finances[idx];
    const previousFinance = finances[idx - 1];
    allBalances[finance.date] =
      finance.amount + allBalances[previousFinance.date];
  }
  return allBalances;
}
