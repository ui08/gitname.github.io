// SemiDoughnutChart.js
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const SemiDoughnutChart = ({
  ChartData,
  ChartDatalabels,
  ChartDatabackgroundColor,
  ChartDatahoverBackgroundColor,
  cutoutPercentage
}) => {
  const data = {
    labels: ChartDatalabels,
    datasets: [
      {
        data: ChartData,
        backgroundColor: ChartDatabackgroundColor,
        hoverBackgroundColor: ChartDatabackgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    borderWidth: 5,
    cutout: cutoutPercentage,
    rotation: -90,
    circumference: 180,
    // Boolean - whether or not the chart should be responsive and resize when the browser does.

    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container

    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        fullWidth: true,
        labels: {
          boxWidth: 10,
          fontSize: 14,

          fontColor: "#333",
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]} ${data} cr`,
              fillStyle: datasets[0].backgroundColor[i],
              index: i,
            }));
          },
        },
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

// Define prop types
// SemiDoughnutChart.propTypes = {
//   ChartData,
//   ChartDatalabels,
//   ChartDatabackgroundColor,
//   ChartDatahoverBackgroundColor,
//   cutoutPercentage: PropTypes.string.isRequired,
// };
export default SemiDoughnutChart;
