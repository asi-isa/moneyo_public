import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import getExpensePerCategory from "../../utils/getExpensePerCategory";

export default function DoughnutChart({ chartData }) {
  const [data, setData] = useState({
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#716F81",
          "#B97A95",
          "#F2E1C1",
          "#3A6351",
          "#907FA4",
        ],
        hoverBackgroundColor: [
          "#716F81",
          "#B97A95",
          "#F2E1C1",
          "#3A6351",
          "#907FA4",
        ],
      },
    ],
  });

  useEffect(() => {
    const { categorys, expenses } = getExpensePerCategory(chartData);
    setData({
      labels: categorys,
      datasets: [
        {
          data: expenses,
        },
      ],
    });
  }, [chartData]);

  return (
    <article>
      <Doughnut data={data} />
    </article>
  );
}
