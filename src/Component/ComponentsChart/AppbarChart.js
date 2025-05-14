import { Chart, registerables } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

// Register the components

const AppbarChart = ({
  legendposition,
  legenddisplay,
  Chartdata,
  ChartAxis,
  Chartlabels,
}) => {

  const data = {
    labels: Chartlabels,
    datasets: Chartdata,
  };

  // Chart options
  const options = {
    indexAxis: ChartAxis,
    responsive: true,
    maintainAspectRatio: false, // Prevent default aspect ratio
    plugins: {
      legend: {
        position: legendposition, // Legend position
        display: legenddisplay,
      },
      
    },
    scales: {
      x: {
        title: {
          display: true,
          //   text: scalesX,
        },
        grid: {
          display: false,
          color: "rgba(200, 200, 200, 0.5)", // Custom grid color
        },
      },
      y: {
        title: {
          display: true,
          //   text: scalesy,
        },
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.5)",
        },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default AppbarChart;
