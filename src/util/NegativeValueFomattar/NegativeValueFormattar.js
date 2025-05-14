import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./NegativeValueFormattar.scss"
const NegativeValueFormattar = ({ value }) => {

  // Convert the input to a number to handle numeric operations
  const numericValue = parseFloat(value);

  // Check if the value is negative and remove the "-" sign
  const isNegative = numericValue < 0;
  const absoluteValue = Math.abs(numericValue);

  // Determine the appropriate class and icon
  const iconClass = isNegative ? "negativeClass" : "positiveClass";
  const icon = isNegative ? faArrowDown : faArrowUp;

  return (
    <div className={`value-display ${iconClass}`}>
      <FontAwesomeIcon icon={icon} /> {absoluteValue}
    </div>
  );
};

export default NegativeValueFormattar;
