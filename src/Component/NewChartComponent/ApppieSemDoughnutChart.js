import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";
import "./recharts.scss";

const ApppieSemDoughnutChart = ({ ChartDataloader, chartdata }) => {
  const temchartdata = chartdata;

  // error
  // result

  function pagemode() {
    if (ChartDataloader === "call") {
      return <Chartloader type={"chart"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"chart"}></ErrorLoader>;
    } else if (ChartDataloader === "result") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={"100%"} height={"100%"}>
            <Pie
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              paddingAngle={4}
                cornerRadius={4}
              data={temchartdata}
              label={(entry) => entry.name}
            />

            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              payload={temchartdata.map((item, index) => ({
                id: item.name,
                value: `${item.name} ( ${item.value} ${uint})`,
                color: item.fill,
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (ChartDataloader === "noresult") {
      return <NoresultLoader type={"chart"}></NoresultLoader>;
    } else {
      return <Chartloader type={"chart"} />;
    }
  }
  return <>{pagemode()}</>;
};

export default ApppieSemDoughnutChart;
