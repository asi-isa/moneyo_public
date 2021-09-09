export default function getAvgIntervalInMilliSeconds(interval) {
  if (interval === "monthly") return new Date(1970, 12).getTime() / 12;
  if (interval === "weekly") return new Date(1970, 12).getTime() / 52;
  if (interval === "yearly") return new Date(1970, 12).getTime();
  if (interval === "halfYearly") return new Date(1970, 12).getTime() / 2;
}
