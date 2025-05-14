import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import { negativeFormatter } from "../../util/Authenticate";
import "./RangeInputField.scss";

const RangeInputField = ({ data }) => {
  return (
    <div className="range-input-container">
      {data === undefined ? null : (
        <>
          {" "}
          {data.map((item, index) => {
            const { absoluteValue, icon, iconClass } = negativeFormatter(
              item?.value
            );

            return (
              <div key={index} className="range-input-item">
                <div className="label-row">
                  <span className={`label ${item?.labelname}`}>
                    {item?.label}
                  </span>
                  <span className={`value ${iconClass}`}>
                    {absoluteValue} {item?.valuein}
                    {item?.icon && (
                      <span className="icon">
                        <FontAwesomeIcon icon={icon} />
                      </span>
                    )}
                  </span>
                </div>
                <ProgressBar
                  now={(absoluteValue / item.max) * 100}
                  label={`${(absoluteValue / item.max) * 100}%`}
                  visuallyHidden
                  variant={item?.labelname}
                />
                {/* <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      Width: `${(absoluteValue / item.max) * 100} %`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div> */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default RangeInputField;
