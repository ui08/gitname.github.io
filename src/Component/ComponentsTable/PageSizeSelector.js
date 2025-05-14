import React, { useCallback, useState } from "react";

const PageSizeSelectordrop = ({ onPageSizeChange,currentPagePageSize }) => {
  const [selectedPageSize, setSelectedPageSize] = useState(currentPagePageSize);

  //   const handlePageSizeChange = (e) => {

  //   };
  const handlePageSizeChange = useCallback(
    (e) => {
      const newPageSize = parseInt(e.target.value);
      setSelectedPageSize(newPageSize);
      onPageSizeChange(newPageSize); // Call the callback function passed as a prop
    },
    [selectedPageSize]
  );
  return (
    <div className="col-md-6 col-12 selectedPageSize">
                      Page Size : {" "}

      <select
        id="page-size"
        value={selectedPageSize}
        onChange={handlePageSizeChange}
      >
        <option value={100}>100</option>
        <option value={200}>200</option>
        <option value={500}>500</option>
        <option value={1000}>1000</option>
      </select>
    </div>
  );
};

export default PageSizeSelectordrop;
