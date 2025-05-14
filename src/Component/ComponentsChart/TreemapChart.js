import React from "react";
import ReactApexChart from "react-apexcharts";
import Chartloader from "../NewChartComponent/Chartloader";
import ErrorLoader from "../NewChartComponent/ErrorLoader";
import NoresultLoader from "../NewChartComponent/NoresultLoader";

const TreemapChart = ({ data, label, temcolors, ChartDataloader }) => {
  const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 300,
      type: "treemap",
    },
    title: {
      text: label || "",
    },
    colors: temcolors,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text, op) {
        const maxLength = 7; // Maximum length for labels
        let num = op.value - 50;
        let n = num.toFixed(2);
        const trimmedText =
          text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        return `${trimmedText} (${n}%)`; // Show trimmedText label with value
      },
      offsetY: -1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          let num = val - 50;
          let n = num.toFixed(2);
          return `${n}%`; // Tooltip shows the value as percentage
        },
      },
      x: {
        show: false, // Show full label in the tooltip
      },
    },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },

    plotOptions: {
      treemap: {
        enableShades: true,
        distributed: false,
        reverseNegativeShade: true,
      },
    },

    // formatter: function (text, op) {
    //   const maxLength = 10; // Maximum length for labels
    //   const trimmedText =
    //     text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    //   return `${trimmedText}(${op.value}%)`; // Show trimmedText label with value
    // },
  };
  function pagemode() {
    const isEmptyData =
      !data || data.length === 0 || data.every((item) => item.y === 0);
    if (ChartDataloader === "call") {
      return <Chartloader type={"treemap"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"treemap"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      return (
        <ReactApexChart
          options={options}
          series={data}
          type="treemap"
          height={300}
        />
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"treemap"}></NoresultLoader>;
    } else {
      return <Chartloader type={"treemap"} />;
    }
  }
  return <>{pagemode()}</>;
};

export default TreemapChart;
