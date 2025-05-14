import React from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AumClientWiseChart = () => {
  // Data for the chart
  const data = {
    labels: ["<10L", "10L-1Cr", ">1Cr"],
    datasets: [
      {
        type: "bar",
        label: "AUM",
        data: [20, 75, 30], // Replace with actual AUM data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Clients",
        data: [25, 50, 10], // Replace with actual Clients data
        borderColor: "rgba(0, 0, 0, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        fill: false,
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0, 0, 0, 1)",
        pointHoverBorderColor: "rgba(0, 0, 0, 1)",
        pointRadius: 3,
        pointHitRadius: 10,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    // Boolean - whether or not the chart should be responsive and resize when the browser does.
  
    responsive: true,
  
    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
  
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AumClientWiseChart;
