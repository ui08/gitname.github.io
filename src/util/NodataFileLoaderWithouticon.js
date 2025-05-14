import React from "react";
import "./NodataFileLoaderWithouticon.scss";

const NodataFileLoaderWithouticon = ({
  labelName,
  mandatory,
  divClassName,
}) => {
  return (
    <div className="app-input-text-group-control divClassName-control">
      <div className="Singalfileloader__skeleton">
        {" "}
        <span>loading ...</span>
      </div>
    </div>
  );
};

export default NodataFileLoaderWithouticon;
