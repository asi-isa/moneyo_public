import { memoize } from "lodash";
import getToday from "./getToday";

function doGetExpectedBalance(date, currentBalance, finances) {
  const jsDate = new Date(date);
  const today = getToday();

  let sumOfFinances = 0;
  for (let index = 0; index < finances.length; index++) {
    const finance = finances[index];
    // alle finanzen von heute bis zu dem tag, an dem die neue rechnung fällig wird
    // da in currentBalance bereits die 'alten' Rechnungen enthalten sein sollten
    if (new Date(finance.date) > today && new Date(finance.date) <= jsDate) {
      sumOfFinances += finance.amount;
    }
    // kleine Optimierung
    else if (new Date(finance.date) > jsDate) {
      break;
    }
  }
  return currentBalance + sumOfFinances;
}

const getExpectedBalance = memoize(doGetExpectedBalance);

export default getExpectedBalance;

// export default function getExpectedBalance(date, currentBalance, finances) {
//   const jsDate = new Date(date);
//   const today = getToday();

//   let sumOfFinances = 0;
//   for (let index = 0; index < finances.length; index++) {
//     const finance = finances[index];
//     // alle finanzen von heute bis zu dem tag, an dem die neue rechnung fällig wird
//     // da in currentBalance bereits die 'alten' Rechnungen enthalten sein sollten
//     if (new Date(finance.date) >= today && new Date(finance.date) <= jsDate)
//       sumOfFinances += finance.amount;
//   }
//   return currentBalance + sumOfFinances;
// }
