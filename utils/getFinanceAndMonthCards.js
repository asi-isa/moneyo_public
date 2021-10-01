import { useState } from "react";
import Card from "../comps/finance/Card";
import MonthCard from "../comps/cards/MonthCard";
import getMonthName from "./getMonthName";
import getToday from "./getToday";

export default function getFinanceAndMonthCards(
  finances,
  initBalance,
  allBalances,
  showAlterFinanceForm,
  showAlterFinanceFormHandler
) {
  const today = getToday();
  // const [financesAndMonthCards, setFinancesAndMonthCards] = useState([]);
  const financesAndMonthCards = [];
  // const [currentMonth, setCurrentMonth] = useState(null);
  let currentMonth = null;
  if (finances[0]) currentMonth = new Date(finances[0].date).getMonth();

  for (let idx = 0; idx < finances.length; idx++) {
    const finance = finances[idx];
    if (new Date(finance.date).getMonth() !== currentMonth) {
      financesAndMonthCards.push(
        <MonthCard
          month={getMonthName(new Date(finance.date).getMonth())}
          key={getMonthName(new Date(finance.date).getMonth()) + finance.date}
        />
      );
      currentMonth = new Date(finance.date).getMonth();
    }

    financesAndMonthCards.push(
      <Card
        name={finance.name}
        amount={finance.amount}
        expectedBalance={initBalance + allBalances[finance.date]}
        date={finance.date}
        currentDate={today}
        category={finance.category}
        isRecurrent={finance.interval !== "notRecurrent" ? true : false}
        isRevenue={finance.amount > 0 ? true : false}
        key={finance.id}
        id={finance.id}
        showAlterFinanceFormHandler={showAlterFinanceFormHandler}
      />
    );
  }
  return financesAndMonthCards;
}
// export default function getFinanceAndMonthCards(finances) {
//   const [financesAndMonthCards, setFinancesAndMonthCards] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(
//     new Date(finances[0].date).getMonth()
//   );

//   for (let idx = 0; idx < finances.length; idx++) {
//     const finance = finances[idx];
//     if (new Date(finance.date).getMonth() !== currentMonth) {
//       setFinancesAndMonthCards([
//         ...financesAndMonthCards,
//         <MonthCard month={getMonthName(new Date(finance.date).getMonth())} />,
//       ]);
//       setCurrentMonth(new Date(finance.date));
//     }

//     setFinancesAndMonthCards([
//       ...financesAndMonthCards,
//       <Card
//         name={finance.name}
//         amount={finance.amount}
//         expectedBalance={initBalance + allBalances[finance.date]}
//         date={finance.date}
//         currentDate={today}
//         category={finance.category}
//         isRecurrent={finance.interval !== "notRecurrent" ? true : false}
//         isRevenue={finance.amount > 0 ? true : false}
//         key={finance.id}
//         id={finance.id}
//         showAlterFinanceFormHandler={showAlterFinanceFormHandler}
//       />,
//     ]);
//   }
//   console.log(financesAndMonthCards);
//   return financesAndMonthCards;
// }
