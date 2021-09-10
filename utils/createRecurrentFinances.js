import createUUID from "./createUUID";
import getAvgIntervalInMilliSeconds from "./getAvgIntervalInMilliSeconds";
import getNextDate from "./getNextDate";

export default function createRecurrentFinances(firstFinance) {
  // eigtl. nicht unbedingt nötig
  const finance = { ...firstFinance };
  let recurrentFinances = [];

  const recurrentUUID = createUUID();
  finance["recurrent_id"] = recurrentUUID;

  // berechne wie viele Finanzen erstellt werden müssen
  const recurrentUntil = new Date(finance["recurrent_until_date"]);
  const timeUntilInMilliSeconds = recurrentUntil - finance["date"];
  const avgIntervalInMilliSeconds = getAvgIntervalInMilliSeconds(
    finance["interval"]
  );
  const numberOfCardsToCreate = Math.ceil(
    timeUntilInMilliSeconds / avgIntervalInMilliSeconds
  );

  recurrentFinances.push(finance);

  for (let i = 1; i < numberOfCardsToCreate; i++) {
    const currentDate = recurrentFinances.at(-1)["date"];

    const nextDate = getNextDate(currentDate, finance["interval"]);

    // übernehme zunächst alle Eigenschaften und passe nur das neue Datum an
    const nextFinance = { ...finance };
    nextFinance["date"] = nextDate;
    console.log("nextFinance", nextFinance);
    // recurrentFormDataArray.push(formData);
    recurrentFinances = [...recurrentFinances, nextFinance];
    console.log("recurrentFormDataArray", recurrentFinances);
  }

  return recurrentFinances;
}
