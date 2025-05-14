import React from "react";
import PropTypes from "prop-types";
import "../util/ViewArea.scss";
import viewReport from '../assets/img/viewReport.png'
const ViewArea = ({ data }) => {

    // Example Mock data for reports
    // const reports = [
    //   {
    //     id: 1,
    //     title: "Sales Report",
    //     content: "This is the detailed sales report for Q1 2024.",
    //   },
    //   {
    //     id: 2,
    //     title: "Inventory Report",
    //     content: "This report shows the current inventory status.",
    //   },
    //   {
    //     id: 3,
    //     title: "Performance Report",
    //     content: "A performance report for the current month.",
    //   },
    // ];

  return (
    <div className="view-area">
  {data ? (
    <div>
      <h4 className="report-title">{data.title}</h4>
      <p className="report-content">{data.content}</p>
    </div>
  ) : (
    <div>
      <img
        src={viewReport}
        alt="No report selected"
        className="placeholder-image"
      />
      <p className="placeholder-text">Select a report to view here!</p>
    </div>
  )}
</div>

  );
};

ViewArea.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ViewArea;
