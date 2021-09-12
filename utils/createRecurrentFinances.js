import { differenceInMilliseconds } from "date-fns";
import createUUID from "./createUUID";
import getAvgIntervalInMilliSeconds from "./getAvgIntervalInMilliSeconds";
import getNextDate from "./getNextDate";

export default function createRecurrentFinances(firstFinance) {
  console.log("firstFinance", firstFinance);
  // eigtl. nicht unbedingt nötig
  const finance = { ...firstFinance };
  // remove 'old' pk
  delete finance["id"];
  let recurrentFinances = [];

  finance["recurrent_id"] = createUUID();

  // berechne wie viele Finanzen erstellt werden müssen
  const avgIntervalInMilliSeconds = getAvgIntervalInMilliSeconds(
    finance["interval"]
  );
  const endDate = new Date(finance["recurrent_until_date"]);
  const beginDate = new Date(finance["date"]);
  const diffInMilliSeconds = differenceInMilliseconds(endDate, beginDate);
  const numberOfCardsToCreate = Math.ceil(
    diffInMilliSeconds / avgIntervalInMilliSeconds
  );

  recurrentFinances.push(finance);

  for (let i = 1; i < numberOfCardsToCreate; i++) {
    const currentDate = new Date(recurrentFinances.at(-1)["date"]);

    const nextDate = getNextDate(currentDate, finance["interval"]);

    // übernehme zunächst alle Eigenschaften und passe nur das neue Datum an
    const nextFinance = { ...finance };
    nextFinance["date"] = nextDate;
    // recurrentFormDataArray.push(formData);
    recurrentFinances = [...recurrentFinances, nextFinance];
  }

  return recurrentFinances;
}
