import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  return <Label {...rest} fontSize="12" fill="red" fontWeight="Bold" />;
};

export default function AppComposedChart({
  ChartDataloader,
  BarLineChart_data,
  graphName,
}) {
  const chartdata = BarLineChart_data;
  let leftYAxisTicks, rightYAxisTicks;
  if (graphName == "sip") {
    leftYAxisTicks = 50;
    rightYAxisTicks = 50;
  } else {
    leftYAxisTicks = 10;
    rightYAxisTicks = 20;
  }
  console.log("chartdata", chartdata);
  function pagemode() {
    if (ChartDataloader === "call") {
      return <Chartloader type={"bar"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"bar"}></ErrorLoader>;
    } else if (ChartDataloader === "result") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={chartdata}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="name"
              scale="band"
              tick={{ textAnchor: "middle", dx: 30 }} // Ensure textAnchor is "middle" and dx is adjusted
            />
            <YAxis
              dataKey={graphName == "sip" ? "TotalSIPBusiness" : "TotalAUM"}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={graphName == "sip" ? "TotalSIPValue" : "TotalClients"}
              barSize={50}
              fill="#413ea0"
              yAxisId="right"
            >
              <LabelList
                dataKey={"uv"}
                position="top"
                content={renderCustomizedLabel}
              />
            </Bar>
            {/* <CartesianGrid strokeDasharray="2 2" /> */}
            <Line
              type="monotone"
              dataKey={graphName == "sip" ? "TotalSIPBusiness" : "TotalAUM"}
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      );
    } else if (ChartDataloader === "noresult") {
      return <NoresultLoader type={"bar"}></NoresultLoader>;
    } else {
      return <Chartloader type={"bar"} />;
    }
  }
  return <>{pagemode()}</>;
}
