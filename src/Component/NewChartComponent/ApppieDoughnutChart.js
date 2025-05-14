import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formattedAmount } from "../../util/CurrencyFormattar/formattedAmount";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";
import "./recharts.scss";

const ApppieDoughnutChart = ({
  pietype,
  chartdata,
  ChartDataloader,
  ChartLegend,
  ChartColor,
  uint,
}) => {
  let comChartLegend = (ChartLegend = undefined ? false : true);
  const temchartdata = chartdata;
  let temChartDataloader = ChartDataloader;
  const isEmptyData =
    !temchartdata ||
    temchartdata.length === 0 ||
    temchartdata.every((item) => item.value === 0);
  let dataWithColors = !isEmptyData
    ? temchartdata.map((entry, i) => ({
        ...entry,
        fill: ChartColor != undefined && ChartColor[i], // Add fill based on name, // Add fill based on name // Add fill based on name
      }))
    : "";

  const CustomTooltip = ({ active, payload, name }) => {
    if (active && payload && payload.length) {
      const result = payload.map((item) => {
        console.log(item);
        const valueFromPayload = item.payload[item.dataKey];
        return (
          <>
            {" "}
            <ul className="payloadlabel">
              <li>
                {item.payload.name} : {valueFromPayload} {uint}
              </li>
            </ul>
          </>
        );
      });

      return (
        <div className="custom-tooltip">
          <p className="label">{result}</p>
        </div>
      );
    }

    return null;
  };

  function pagemode() {
    console.log("isEmptyData", dataWithColors,ChartDataloader);
    if (ChartDataloader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      console.log("isEmptyData", dataWithColors, ChartDataloader);
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                data={dataWithColors}
                paddingAngle={4}
                cornerRadius={4}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                // label={(entry) => entry.name}
              />

              <Tooltip content={<CustomTooltip />} />
              {/* <Legend verticalAlign="bottom" align="center" iconType="circle" /> */}

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                payload={dataWithColors.map((item, index) => ({
                  id: item.name,
                  value: `${item.name == "heldAway" ? "Held Away" : item.name} ( ${formattedAmount(
                    item.value
                  )} ${uint})`,
                  color: item.fill,
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  }
  return <>{pagemode()}</>;
};

export default ApppieDoughnutChart;
