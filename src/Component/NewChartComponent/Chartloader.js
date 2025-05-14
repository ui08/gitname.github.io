// import React from "react";
// import "./Chartloader.scss";

// export default function Chartloader({ type }) {
//   return (
//     <div className="cartdiv">
//       {type === "pie" ||
//       type === "doughnut" ||
//       type === "chart" ||
//       type === "bar" ||
//       type === "treemap" ? (
//         <div class="custom-loader"></div>
//       ) : null}
//     </div>
//   );
// }

import React from "react";
import "./Chartloader.scss";

export default function Chartloader({ type }) {
  const supportedTypes = ["pie", "doughnut", "chart", "bar", "treemap"];

  return (
    <div className="cartdiv">

      <div className="Chartloader">
      <span class="loader">Loading</span>
    </div>
    </div>
  );
}
