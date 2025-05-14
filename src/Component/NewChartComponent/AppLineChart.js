// import React from "react";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { ChartColorsFunction } from "../../util/Authenticate";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//   },
// ];

// export default function AppLineChart({ uint, chartdata }) {
//   const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
//     return (
//       <text
//         x={x + width / 2}
//         y={y + height / 2}
//         className="renderCustomBarLabel"
//         textAnchor="middle"
//         dy={2}
//         dx={20}
//         fontSize={12}
//         transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`} // Rotate around the center of each bar
//       >
//         {`${value} `}
//       </text>
//     );
//   };

//   const CustomTooltip = ({ active, payload, name }) => {
//     if (active && payload && payload.length) {
//       const result = payload.map((item) => {
//         const valueFromPayload = item.payload[item.dataKey];
//         return (
//           <>
//             {" "}
//             <ul className="payloadlabel">
//               <li style={{ color: item.fill }}>
//                 {item.dataKey} : {valueFromPayload}
//               </li>
//             </ul>
//           </>
//         );
//       });

//       return (
//         <div className="custom-tooltip">
//           <p className="label">{payload[0].payload.name}</p>
//           {result}
//         </div>
//       );
//     }

//     return null;
//   };
//   // const chartdata = data;
//   console.log("chartdata", chartdata);
//   const temselectedKeys = ["uv"];
//   return (
//     <ResponsiveContainer width={"100%"} height={"100%"}>
//       <LineChart
//         width={"100%"}
//         height={"100%"}
//         data={chartdata}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
    
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         {/* <Legend /> */}
//         {temselectedKeys.map((key) => (
//           <Line
//             type="monotone"
//             key={key}
//             dataKey={key}
//             name={key}
//             // label={renderCustomBarLabel}
//             fill={ChartColorsFunction(key)}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

import React from "react";
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

const AppLineChart = ({
  chartData = [],
  dataKeys = ["NAV"],
  xAxisKey = "name",
  height = 300,
  width = "100%",
  strokeColors = {},
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}) => {
  if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload[xAxisKey]}</p>
          <ul>
            {payload.map((item, index) => (
              <li key={index} style={{ color: item.stroke }}>
                {item.dataKey}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData} margin={margin}>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {dataKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={strokeColors[key] || ChartColorsFunction(key)}
            dot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AppLineChart;
