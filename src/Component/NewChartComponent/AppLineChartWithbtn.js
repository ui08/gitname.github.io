import React, { useCallback, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartColorsFunction } from "../../util/Authenticate";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";

// Example data for each time period (1Y, 2Y, 3Y, and 12 months)

export default function AppLineChartWithbtn({
  BarChart_data,
  ChartDataloader,
  Legendvalue,
  DefaultselectedInterval,
  buttonTimeframe,
  uint,
}) {
  const [temselectedInterval, setTemSelectedInterval] = useState(
    DefaultselectedInterval
  );

  const handleTimeframeClick = useCallback(
    (label) => {
      setTemSelectedInterval(label);
    },
    [temselectedInterval]
  );
  // Default to 12 months
  // Get the data for the selected interval
  const chartData = BarChart_data[temselectedInterval];
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        className="renderCustomBarLabel"
        textAnchor="middle"
        dy={2}
        dx={20}
        fontSize={12}
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`} // Rotate around the center of each bar
      >
        {`${value} `}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, name }) => {
    if (active && payload && payload.length) {
      const result = payload.map((item) => {
        const valueFromPayload = item.payload[item.dataKey];
        return (
          <ul className="payloadlabel">
            <li style={{ color: item.fill }}>
              {item.dataKey} : {valueFromPayload}
            </li>
          </ul>
        );
      });

      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          {result}
        </div>
      );
    }

    return null;
  };

  function pagemode() {
    if (ChartDataloader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (ChartDataloader === "result") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <div>
            {/* LineChart Component */}
            <LineChart
              width={500}
              height={300}
              data={chartData}
            
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45} // Rotate labels 45 degrees to fit them better
                textAnchor="end" // Align the text to the end
                interval={0} // Ensure all labels are displayed
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              {["value"].map((key) => (
                <Line
                  type="monotone"
                  key={key}
                  dataKey={key}
                  name={key}
                  label={renderCustomBarLabel}
                  fill={ChartColorsFunction(key)}
                />
              ))}
            </LineChart>
          </div>
        </ResponsiveContainer>
      );
    } else if (ChartDataloader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  }

  return (
    <div>
      {pagemode()}

      {buttonTimeframe.map((item) => (
        <button
          key={item.btnvalue}
          className={
            item.btnvalue === temselectedInterval ? "btn actbtn" : "btn tbtn"
          }
          onClick={() => handleTimeframeClick(item.btnvalue)}
        >
          {item.btnName}
        </button>
      ))}
      {/* Time interval buttons */}
    </div>
  );
}
