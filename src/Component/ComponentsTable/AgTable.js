import { iconSetQuartzLight, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ButtonComp from "../ButtonComp/ButtonComp";
import NodataLoader from "./../../util/NodataLoader";
import InputText from "./../ComponentsInput/InputText";

const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
  accentColor: "#304D76DB",
  backgroundColor: "#ffffff",
  borderColor: "#00000029",
  borderRadius: 1,
  browserColorScheme: "inherit",
  columnBorder: false,
  fontFamily: {
    googleFont: "Roboto",
  },
  foregroundColor: "#000000",
  headerBackgroundColor: "#FFFFFF",
  headerFontFamily: {
    googleFont: "Roboto",
  },
  headerFontSize: 14,
  headerFontWeight: 500,
  headerTextColor: "#000000",
  oddRowBackgroundColor: "#BFBFBF26",
  rowBorder: true,
  sidePanelBorder: false,
  spacing: 10,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
});

export default function AgTable({
  columnKeys,
  columnDefs,
  rowData,
  filenames,
  StyleClass,
  pagination = true,
  rowLoading = false,
  onSearchChange,
  totalRow,
  onDateChange,
  onExportClick,
  onResetClick,
  ResetClickvalue = false,
  ExportClickvalue = false,
  onSearchClick,
  SearchClickvalue = "",
  showSearchBar = true, // Prop to show/hide search bar
  showDatePicker = false, // Prop to show/hide date picker
  showExportButton = true, // Prop to show/hide export button
  showResetButton = true, // Prop to show/hide reset button
  isRowSelection = false,
  onSelectedGetValue,
  pageSize,
  tableHeaderName,
  bodyFontSize = 12, // Default font size
}) {
  const gridRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [exportClicked, setExportClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  } = useForm({ defaultValues: "" });
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  useEffect(() => {
    if (ExportClickvalue) {
      onBtnExport();
    }
  }, [ExportClickvalue]);

  useEffect(() => {
    if (ResetClickvalue) {
      clearFilters();
    }
  }, [ResetClickvalue]);
  const defaultColDef = useMemo(
    () => ({
      editable: false,
      wrapText: false,
      autoHeight: false,
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
      tooltipComponent: "customTooltip",
    }),
    []
  );

  const rowClassRules = {
    "even-row": (params) => params.node.rowIndex % 2 === 0,
    "odd-row": (params) => params.node.rowIndex % 2 !== 0,
  };

  const onGridReady = useCallback((params) => {}, []);
  console.log("SearchClickvalue", SearchClickvalue);
  // Search Input Change Handler
  const onFilterTextBoxChanged = useCallback((event) => {
    const value = event;
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }
  }, []);

  const onBtnExport = useCallback(() => {
    if (gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: filenames || "Export.csv",
      });
    }
  }, []);

  const clearFilters = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.onFilterChanged();
    }
  }, []);

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
      checkboxes: isRowSelection,
      headerCheckbox: isRowSelection,
      enableSelectionWithoutKeys: true,
      enableClickSelection: true,
    };
  }, []);

  const onSelectionChanged = useCallback((event) => {
    if (isRowSelection) {
      const rowCount = event.api.getSelectedRows();
      onSelectedGetValue(rowCount);
      console.log("selection changed, " + rowCount + " rows selected");
    }
  }, []);

  console.log("selection changed, ", ResetClickvalue, ExportClickvalue);
  return (
    <>
      {rowData || rowLoading ? (
        <>
          {rowLoading ? (
            <>
              <button type="button" className="d-none" onClick={onResetClick}>
                {ResetClickvalue && clearFilters()}
              </button>
              {/* <button type="button" className="d-none" onClick={onExportClick}>
                {ExportClickvalue && onBtnExport()}
              </button>*/}

              <button type="button" className="d-none" onClick={onSearchClick}>
                {SearchClickvalue != "" &&
                  onFilterTextBoxChanged(SearchClickvalue)}
              </button>
            </>
          ) : (
            <>
              {showExportButton === true ||
              showResetButton === true ||
              showSearchBar === true ? (
                <>
                  <div className={`row ${rowLoading ? "d-none" : ""}`}>
                    <div className="col-12 col-md-3 col-lg-3">
                      {showSearchBar && (
                        <InputText
                          {...useFromProps}
                          useForm={useForm}
                          readOnly={false}
                          disabled={false}
                          type="text"
                          labelName="Search..."
                          registerName={"name"}
                          name={"name"}
                          mandatory={false}
                          onPaste={false}
                          onCopy={false}
                          previewFlag={false}
                          onChange={(e) => {
                            onFilterTextBoxChanged(e.target.value);
                          }}
                          // onInput={onFilterTextBoxChanged}
                          divClassName={"divClassName"}
                        />
                      )}
                    </div>
                    <div className="col-md-9 col-lg-9 col-12 ">
                      <div className="table_btn_div">
                        {showExportButton && (
                          <ButtonComp
                            wrapperName={"btn_wrapper table_ag_btn"}
                            type="button"
                            btnStyle="box"
                            btnText={"Export"}
                            onClick={() => onBtnExport()}
                          />
                        )}
                        {showResetButton && (
                          <ButtonComp
                            wrapperName={"btn_wrapper table_ag_btn"}
                            type="button"
                            btnStyle="box"
                            btnText={"Reset Filter"}
                            onClick={() => clearFilters()}
                          />
                        )}
                      </div>
                    </div>
                  </div>{" "}
                </>
              ) : null}
            </>
          )}

          <Row>
            {tableHeaderName && <b className="p-0 m-3">{tableHeaderName}</b>}
            <Col className="AgGridTableCol">
              <AgGridReact
                ref={gridRef}
                theme={myTheme}
                className="me-2 AgGridTable"
                columnDefs={columnDefs}
                rowData={rowData}
                suppressMenuHide={true}
                suppressMovableColumns={true}
                enableSorting={true}
                paginationPageSize={pageSize ? pageSize : 100}
                // tooltipShowDelay={5}
                defaultColDef={{
                  ...defaultColDef,
                }}
                onGridReady={onGridReady}
                // onGridReady={(params) => {
                //   gridRef.current = params.api; // Correct way to set the ref
                // }}
                pagination={pagination}
                rowClassRules={rowClassRules}
                rowSelection={rowSelection}
                onSelectionChanged={onSelectionChanged}
                onSelectedGetValue={onSelectedGetValue}
                containerStyle={{ fontSize: `${bodyFontSize}px` }}
                // domLayout="autoHeight"
              />
            </Col>
          </Row>
        </>
      ) : (
        <NodataLoader />
      )}
    </>
  );
}

AgTable.propTypes = {
  columnKeys: PropTypes.any,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object),
  filenames: PropTypes.string,
  onSelectionChanged: PropTypes.func,
  StyleClass: PropTypes.string,
  type: PropTypes.string,
  showTotalRow: PropTypes.bool,
  onSearchChange: PropTypes.func,
  onDateChange: PropTypes.func,
  onExportClick: PropTypes.func,
  onResetClick: PropTypes.func,
  showSearchBar: PropTypes.bool,
  showDatePicker: PropTypes.bool,
  showExportButton: PropTypes.bool,
  showResetButton: PropTypes.bool,
  pageSize: PropTypes.number,
};
// Pass the clearFilters function to exporthandleResetClick as a prop
