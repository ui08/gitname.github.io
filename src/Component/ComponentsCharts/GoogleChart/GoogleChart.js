import { PropTypes } from "prop-types";
import React from "react";
import { Chart } from "react-google-charts";

export default function GoogleChart({ Chartoptions, ChartType, Chartdata }) {
  return (
    <div>
      <Chart
        chartType={ChartType}
        width="100%"
        height="400px"
        data={Chartdata}
        options={Chartoptions}
      />
    </div>
  );
}
GoogleChart.propTypes = {
  ChartType: PropTypes.string,
  Chartdata: PropTypes.any,
  Chartoptions: PropTypes.any,
};
