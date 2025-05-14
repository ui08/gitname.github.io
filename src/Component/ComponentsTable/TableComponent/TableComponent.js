import "./TableComponent.scss";
function TableComponent({ Valueclassname, totaleCol, tbodydata, thead }) {
  console.log("thead", tbodydata);
  return (
    <div class="table-responsive">
      <table className=" table_Component mb-3">
        <thead>
          <tr>
            {thead.map((item, index) => {
              return (
                <th>
                  <div className={item.theadclass}>
                    {item?.thead === "" ? "-" : item?.thead}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {totaleCol === 4 ? (
            <>
              {" "}
              {tbodydata.map((item, index) => {
                return (
                  <tr>
                    <td className={item.typeclass}>
                      {" "}
                      {item?.type === "" ? "-" : item?.type}
                    </td>
                    <td className={item.valueclass}>
                      {item?.value === "" ? "-" : item?.value}{" "}
                    </td>
                    <td className={item.date}>
                      {item?.date === "" ? "-" : item?.date}{" "}
                    </td>
                    <td className={item.installment}>
                      {item?.installment === "" ? "-" : item?.installment}{" "}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : totaleCol === 3 ? (
            <>
              {" "}
              {tbodydata.map((item, index) => {
                return (
                  <tr>
                    <td className={item.typeclass}>
                      {" "}
                      {item?.type === "" ? "-" : item?.type}
                    </td>
                    <td>
                      <div className={item.valueclass}>
                        {" "}
                        {item?.value === "" ? "-" : item?.value}{" "}
                      </div>
                    </td>
                    <td>
                      <div className={item.valueclass}>
                        {item?.percentageOfPortfolio === ""
                          ? "-"
                          : item?.percentageOfPortfolio}{" "}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              {" "}
              {tbodydata.map((item, index) => {
                return (
                  <tr>
                    <td className={item.typeclass}>
                      {" "}
                      {item?.type === "" ? "-" : item?.type}
                    </td>
                    <td className={item.valueclass}>
                      {item?.value === "" ? "-" : item?.value}{" "}
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
