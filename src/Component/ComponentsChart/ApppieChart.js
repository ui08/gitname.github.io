import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Doughnut, Line, Pie, PolarArea, Scatter } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ApppieChart = ({
  type,
  legendposition,
  legenddisplay = true,
  Chartdata,
  Chartlabels,
  isSemiDoughnut, // Support for semi-doughnut
}) => {
  const data = {
    labels: Chartlabels,
    datasets: Chartdata,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: legendposition,
        display: legenddisplay,
        labels: {
          color: "#000000",
          generateLabels: isSemiDoughnut
            ? (chart) => {
                const datasets = chart.data.datasets[0];
                return chart.data.labels.map((label, i) => ({
                  text: `${formatCamelCaseToReadable(label)}: ${datasets.data[i]}`, // Append value to label
                  fillStyle: datasets.backgroundColor[i],
                  strokeStyle: datasets.backgroundColor[i],
                  hidden: false,
                  borderSkipped: false,
                }));
              }
            : undefined, // Return `undefined` when not a semi-doughnut
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    cutout: isSemiDoughnut ? "70%" : "70%", // Adjust thickness for semi-doughnut
    rotation: isSemiDoughnut ? -90 : 0, // Rotate to make it semi-doughnut
    circumference: isSemiDoughnut ? 180 : 360, // Half-circle for semi-doughnut
  };

  const PieChart = () => <Pie data={data} options={options} />;
  const DoughnutChart = () => <Doughnut data={data} options={options} />;
  const LineChart = () => <Line data={data} options={options} />;
  const BarChart = () => <Bar data={data} options={options} />;
  const ScatterChart = () => <Scatter data={data} options={options} />;
  const PolarAreaChart = () => <PolarArea data={data} options={options} />;

  return (
    <>
      {type === "PieChart" && <PieChart />}
      {type === "DoughnutChart" && <DoughnutChart />}
      {type === "LineChart" && <LineChart />}
      {type === "BarChart" && <BarChart />}
      {type === "ScatterChart" && <ScatterChart />}
      {type === "PolarAreaChart" && <PolarAreaChart />}
    </>
  );
};

const formatCamelCaseToReadable = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
    .replace(/^(.)/, (match) => match.toUpperCase()); // Capitalize the first letter
}

export default ApppieChart;
