import {
  faFileCsv,
  faRetweet,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconSetQuartzLight, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import NodataLoader from "./../../util/NodataLoader";

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

export default function BigAgTable({
  columnKeys,
  columnDefs,
  rowData,
  filenames,
  onSelectionChanged,
  PageSizeSelector,
  StyleClass,
  type,
  showTotalRow = false,
  onSearchChange,
  onDateChange,
  onExportClick,
  onpaginationNumberChange,
  onResetClick,
  showSearchBar = true, // Prop to show/hide search bar
  showDatePicker = true, // Prop to show/hide date picker
  showExportButton = true, // Prop to show/hide export button
  showResetButton = true, // Prop to show/hide reset button
}) {
  const gridRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [exportClicked, setExportClicked] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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

  // Search Input Change Handler
  const onFilterTextBoxChanged = useCallback((event) => {
    const value = event.target.value;
    setSearchText(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
    gridRef.current.api.setGridOption("quickFilterText", value);
  }, []);

  const handleDateChange = useCallback((event) => {
    const value = event.target.value;
    setSelectedDate(value);
    if (onDateChange) {
      onDateChange(value);
    }
  }, []);

  const onBtnExport = useCallback(() => {
    setExportClicked(true);
    if (onExportClick) {
      onExportClick();
    }
    if (gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: filenames || "Export.csv",
      });
    }
  }, []);

  const clearFilters = useCallback(() => {
    setResetClicked(true);
    if (onResetClick) {
      onResetClick();
    }
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.onFilterChanged();
    }
  }, []);
  const paginationPageSizeSelector = useMemo(() => {
    return [50, 100, 200, 500, 1000];
  }, []);
  const paginationNumberFormatter = useCallback((params) => {
    onpaginationNumberChange(params.value.toLocaleString());

    return params.value.toLocaleString();
  }, []);

  return (
    <>
      {rowData ? (
        <>
          <div className="row mb-3">
            <div className="col-md-8 col-12 d-flex align-items-center">
              {showSearchBar && (
                <div className="search-container">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onInput={onFilterTextBoxChanged}
                    className="search-input-class ps-5"
                  />
                </div>
              )}
              {showDatePicker && (
                <div className="search-container">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="SelectDateClass"
                  />
                </div>
              )}
              {/* <InputDatePicker
                control={control}
                setValue={setValue}
                errors={errors}
                labelName="Select Date"
                registerName="selectedDate"
                // mandatory={true}
                dateformat="DD/MM/YYYY"
                // disabled={isViewMode}
                minDateVal={null} // Optional: Specify the minimum date
                maxDateVal={dayjs()} // Disable future dates
              /> */}
            </div>
            <div className="col-md-4 col-12 d-flex justify-content-end align-items-center gap-3">
              {showExportButton && (
                <button className={StyleClass} onClick={onBtnExport}>
                  <FontAwesomeIcon icon={faFileCsv} />
                </button>
              )}
              {showResetButton && (
                <button className={StyleClass} onClick={clearFilters}>
                  <FontAwesomeIcon icon={faRetweet} />
                </button>
              )}
            </div>
          </div>
          <Row>
            <Col style={{ height: "100vh" }}>
              {/* <div>
                Page Size:
                <select onchange={onPageSizeChanged} id="page-size">
                  <option value={10}>10</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
              </div> */}

              <AgGridReact
                ref={gridRef}
                theme={myTheme}
                className="me-2 AgGridTable"
                columnDefs={columnDefs}
                rowData={rowData}
                tooltipShowDelay={5}
                defaultColDef={{
                  ...defaultColDef,
                }}
                pagination={false}
                onGridReady={onGridReady}
                rowClassRules={rowClassRules}
                paginationPageSize={PageSizeSelector}
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

BigAgTable.propTypes = {
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
};
