import React, { useMemo, useState, useCallback } from "react";
import AgTable from "../../Component/ComponentsTable/AgTable";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";

export const CapitalGainTable = ({ data, onSubmit }) => {
  const newTaxRegimeData = useMemo(
    () => data?.filter((item) => item.newTaxRegime === true),
    [data]
  );

  const [editableData, setEditableData] = useState(newTaxRegimeData || []);

  const defaultColumnDefs = useMemo(
    () => [
      {
        headerName: "Sr.No",
        valueGetter: "node.rowIndex + 1",
        minWidth: 120,
        maxWidth: 120,
      },
      { headerName: "Scheme Name", field: "schemeName" },
      { headerName: "Folio Number", field: "folioNumber" },
      {
        headerName: "SEBI Asset Type",
        field: "sebiAssetType",
        cellRenderer: (params) => params.data.sebiAssetType !="Debt" || params.data.sebiAssetType !="Equity" ? "Debt" : params.value,
      },
    ],
    []
  );

  const editableColumnDefs = useMemo(
    () => [
      {
        headerName: "Sr.No",
        valueGetter: "node.rowIndex + 1",
        minWidth: 120,
        maxWidth: 120,
      },
      { headerName: "Scheme Name", field: "schemeName" },
      { headerName: "Folio Number", field: "folioNumber" },
      {
        headerName: "SEBI Asset Type",
        field: "sebiAssetType",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Debt", "Equity"],
        },
      },
    ],
    []
  );

  const handleCellEdit = useCallback((params) => {
    const updatedRow = params.data;
    setEditableData((prevData) =>
      prevData.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      )
    );
  }, []);

  const handleSubmit = () => {
    onSubmit?.(data);
  };

  return (
    <>
      <AgTable
        columnDefs={defaultColumnDefs}
        rowData={data}
        filenames="AllSchemes.csv"
        showSearchBar={true}
        showExportButton={true}
        showResetButton={true}
        pagination={true}
        tableHeaderName="All Mutual Fund Holdings"
        pageSize={20}
      />

      {editableData?.length > 0 && (
        <div className="mt-5">
          <AgTable
            columnDefs={editableColumnDefs}
            rowData={editableData}
            filenames="TaxRegimeSchemes.csv"
            showSearchBar={true}
            showExportButton={true}
            showResetButton={true}
            pagination={true}
            tableHeaderName="New Tax Regime Eligible Funds"
            pageSize={20}
            onCellValueChanged={handleCellEdit}
          />
        </div>
      )}

      <div className="row col-2 col-md-2 col-lg-2 col-xl-2">
        <ButtonComp
          wrapperName="submit_btn_wrapper"
          type="submit"
          btnStyle="box"
          btnText="Submit"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};
