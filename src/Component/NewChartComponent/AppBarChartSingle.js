import React from "react";
import {
  Bar,
  BarChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartColorsFunction } from "../../util/Authenticate";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";
import "./recharts.scss";

// Feel-good color palette (avoiding black)
const DEFAULT_COLORS = [
  "#4E79A7", // Soft blue
  "#F28E2B", // Warm orange
  "#E15759", // Coral red
  "#76B7B2", // Teal
  "#59A14F", // Green
  "#EDC948", // Gold
  "#B07AA1", // Lavender
  "#FF9DA7", // Pink
  "#9C755F", // Tan
  "#BAB0AC", // Light gray
];

const getColorForName = (name) => {
  // Simple hash function to get consistent colors for the same names
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return DEFAULT_COLORS[Math.abs(hash) % DEFAULT_COLORS.length];
};

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;
  console.log("propsprops", ...rest);

  return <Label {...rest} fontSize="12" fill="red" fontWeight="Bold" />;
};

export default function AppBarChartSingle({
  ChartDataloader,
  BarChart_data,
  count,
  Barlayout,
  uint,
  ChartColor,
  showLegend = true,
  radiusStyle,
  labelFontSize = 12, // <-- Default to 12 if not provided
}) {
  const chartdata = BarChart_data;
  let temChartDataloader = ChartDataloader;

  const isEmptyData =
    !chartdata ||
    chartdata.length === 0 ||
    chartdata.every((item) => item.value === 0);

  let dataWithColors = !isEmptyData
    ? chartdata.map((entry, i) => ({
        ...entry,
        fill: ChartColor != undefined && ChartColor[i], // Add fill based on name, // Add fill based on name
      }))
    : "";

  console.log("dataWithColors", dataWithColors, ChartDataloader);

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        className="renderCustomBarLabel"
        textAnchor="right"
        dy={2}
        dx={20}
        fontSize={labelFontSize}
        transform={`rotate(${Barlayout === "horizontal" ? "-90" : "-360"}, ${
          x + width / 2
        }, ${y + height / 2})`}
      >
        {`${value} ${uint}`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, name }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${payload[0].payload.name} : ${payload[0].value} ${uint}`}
          </p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        </div>
      );
    }
    return null;
  };

  // const shortenLabel = (label) => {
  //   if (!label || label.length <= 8) return label;

  //   // Split words, take first character from each
  //   const initials = label
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase())
  //     .join("");

  //   return initials;
  // };

  const shortenLabel = (label) => {
    if (!label) return "";
    if (label.length <= 6) return label;
    return label.slice(0, 6) + "...";
  };

  function pagemode() {
    if (ChartDataloader === "call") {
      return <Chartloader type={"bar"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"bar"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            data={dataWithColors}
            margin={{ top: 15, right: 0, bottom: 10, left: 0 }}
            barSize={60}
            paddingAngle={4}
            cornerRadius={4}
            layout={Barlayout}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/*  */}
            {Barlayout == "horizontal" && (
              <>
                <XAxis dataKey="name" tickFormatter={shortenLabel} />
                <YAxis />
              </>
            )}

            {Barlayout == "vertical" && (
              <>
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  tickFormatter={shortenLabel}
                  type="category"
                />
              </>
            )}

            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                payload={chartdata.map((item, index) => ({
                  id: item.name,
                  value: `${item.name}`,
                  color: ChartColor[index], // Add fill based on name
                }))}
              />
            )}

            <Bar
              dataKey={"value"}
              name={"name"}
              label={renderCustomBarLabel}
              radius={radiusStyle ? radiusStyle : [0, 10, 10, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"bar"}></NoresultLoader>;
    } else {
      return <Chartloader type={"bar"} />;
    }
  }

  return <>{pagemode()}</>;
}
