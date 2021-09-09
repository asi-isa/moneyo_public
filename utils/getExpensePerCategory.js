export default function getExpensePerCategory(finances) {
  const categorys = [];
  const expenses = [];
  const expensePerCategory = {};

  for (const finance of finances) {
    if (finance.amount < 0) {
      if (finance.category in expensePerCategory) {
        expensePerCategory[finance.category] += finance.amount;
      } else {
        expensePerCategory[finance.category] = finance.amount;
      }
    }
  }

  for (const category in expensePerCategory) {
    categorys.push(category);
    expenses.push(expensePerCategory[category]);
  }

  return { categorys, expenses };
}
