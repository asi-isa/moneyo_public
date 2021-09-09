export default function thousandPoint(number) {
  let numString = "" + Math.abs(number);

  const numStringArray = [];
  while (numString.length > 3) {
    const lastThree = numString.slice(numString.length - 3);
    numStringArray.push("." + lastThree);
    numString = numString.slice(0, numString.length - 3);
  }
  numStringArray.push(numString);

  numStringArray.reverse();

  let numWithThousandPoint = "";
  for (let num = 0; num < numStringArray.length; num++) {
    numWithThousandPoint += numStringArray[num];
  }

  return numWithThousandPoint;
}
