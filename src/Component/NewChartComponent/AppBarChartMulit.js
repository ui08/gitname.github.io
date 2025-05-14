import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ReferenceLine,
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

export default function AppBarChartMulit({
  ChartDataloader,
  BarChart_data,
  count,
  selectedKeys,
  Legendvalue,
  uint,
  graphName
}) {
  const chartdata = BarChart_data;
  const temselectedKeys = selectedKeys;

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
        {`${value} ${uint}`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, name }) => {
    if (active && payload && payload.length) {
      const result = payload.map((item) => {
        const valueFromPayload = item.payload[item.dataKey];
        return (
          <>
            {" "}
            <ul className="payloadlabel">
              <li style={{ color: item.fill }}>
                {item.dataKey} : {valueFromPayload} {uint}
              </li>
            </ul>
          </>
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
    const isEmptyData = !chartdata || chartdata.length === 0;
    if (ChartDataloader === "call") {
      return <Chartloader type={"bar"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"bar"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      return (
        <>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart
              data={chartdata}
              margin={{ top: 15, right: 0, bottom: 10, left: 0 }}
              barSize={25}
              barCategoryGap={5}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" fill={"name"} />
              <YAxis />

              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" align="center" iconType="circle" />
              <ReferenceLine y={0} stroke="#000" />
              {/* Loop through selected keys to display each bar */}
              {temselectedKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  name={key}
                  label={graphName == "transactionByProductType" ? "" : renderCustomBarLabel}
                  fill={ChartColorsFunction(key)}
                  radius={[10, 10, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </>
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"bar"}></NoresultLoader>;
    } else {
      return <Chartloader type={"bar"} />;
    }
  }
  return <>{pagemode()}</>;
}
