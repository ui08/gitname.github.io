import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  dataPoints = [250, 275, 230, 260, 290, 270],
  maxY = 1000,
  stepSize = 250,
  lineColor = '#3C47A0',
  fillColor = 'rgba(60, 71, 160, 0.2)',
  buttonLabels = ['1Y', '3Y', '5Y'],
  onTimeframeChange,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(buttonLabels[0]);
  const transactionProductDataKeys = ["Purchase", "Redemption", "NetPurchase"];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: dataPoints,
        borderColor: lineColor,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxY,
        ticks: {
          stepSize,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTimeframeClick = (label) => {
    setSelectedTimeframe(label);
    if (onTimeframeChange) {
      onTimeframeChange(label);
    }
  };

  return (
    <div className="relative">
      <Line data={data} options={options} />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="button_lables">
          {buttonLabels.map((label) => (
            <button
              key={label}
              onClick={() => handleTimeframeClick(label)}
              className={`px-4 py-2 rounded-full pointer-events-auto ${
                selectedTimeframe === label ? 'bg-blue-200 text-blue-700' : 'text-blue-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
