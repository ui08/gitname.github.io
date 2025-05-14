// import React from "react";
// import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import Chartloader from "./Chartloader";
// import ErrorLoader from "./ErrorLoader";
// import NoresultLoader from "./NoresultLoader";
// import "./recharts.scss";

// const ApppieChart = ({ pietype, chartdata, ChartDataloader, uint }) => {
//   const CustomTooltip = ({ active, payload, name }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`${payload[0].name} : ${payload[0].value} ${uint}`}</p>
//           {/* <p className="intro">{getIntroOfPage(label)}</p> */}
//         </div>
//       );
//     }

//     return null;
//   };
//   const temchartdata = chartdata;
//   function pagemode() {
//     if (ChartDataloader === "call") {
//       return <Chartloader type={"pie"} />;
//     } else if (ChartDataloader === "error") {
//       return <ErrorLoader type={"pie"}></ErrorLoader>;
//     } else if (ChartDataloader === "result") {
//       return (
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart width={"100%"} height={"100%"}>
//             <Pie
//               outerRadius={100}
//               dataKey="value"
//               data={temchartdata}
//               label={(entry) => entry.name}
//             />

//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               verticalAlign="bottom"
//               align="center"
//               iconType="circle"
//               payload={temchartdata.map((item, index) => ({
//                 id: item.name,
//                 value: `${item.name} (${item.value} ${uint})`,
//                 color: item.fill,
//               }))}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       );
//     } else if (ChartDataloader === "noresult") {
//       return <NoresultLoader type={"pie"}></NoresultLoader>;
//     } else {
//       return <Chartloader type={"pie"} />;
//     }
//   }
//   return <>{pagemode()}</>;
// };

// export default ApppieChart;
import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartColorsFunction } from "../../util/Authenticate";
import Chartloader from "./Chartloader";
import ErrorLoader from "./ErrorLoader";
import NoresultLoader from "./NoresultLoader";
import "./recharts.scss";

const ApppieChart = ({
  pietype,
  chartdata,
  ChartDataloader,
  uint,
  ChartLegend,
  ChartColor,
}) => {
  console.log("ChartColor",ChartColor);
  const temchartdata = chartdata;
  let temChartDataloader = ChartDataloader;
  const isEmptyData =
    !temchartdata ||
    temchartdata.length === 0 ||
    temchartdata.every((item) => item.value === 0);
  let dataWithColors = !isEmptyData
    ? temchartdata.map((entry, i) => ({
        ...entry,
        fill: ChartColor != undefined && ChartColor[i], // Add fill based on name, // Add fill based on name
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
    if (ChartDataloader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={"100%"} height={"100%"}>
            <Pie
              outerRadius={100}
              dataKey="value"
              data={dataWithColors}
              paddingAngle={4}
              cornerRadius={4}
              labelLine={true}
              // label={(entry) => entry.name}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              payload={dataWithColors.map((item, index) => ({
                id: item.name,
                value: `${item.name} ( ${item.value} ${uint})`,
                color: ChartColor != undefined && ChartColor[index],
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  }
  return <>{pagemode()}</>;
};

export default ApppieChart;
