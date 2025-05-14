import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AgTable from "./AgTable";
import "./CustomCard.scss";

const CustomCard = ({
  title,
  data,
  weight,
  mutualFundOptions,
  onSelectFund,
  dropdownOptions,
}) => {
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

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowData2, setRowData2] = useState([]);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
    // console.log("Clicked", dropdownOpen, mutualFundOptions);//
  };

  const handleOptionSelect = (option) => {
    onSelectFund(option); // Handle selection logic
    setDropdownOpen(false); // Close dropdown after selecting
  };

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleAction = () => {};

  const columnDefs = [
    {
      headerName: "Mutual Fund Name",
      field: "firstName",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "Current Value",
      field: "lastName",
      cellRenderer: (params) => AmountFormatterFunction(params.data.age),

      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Invested Value",
      field: "lastName",
      cellRenderer: (params) => AmountFormatterFunction(params.data.age),
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "IRR",
      field: "lastName",
      cellRenderer: (params) => AmountFormatterFunction(params.data.age),
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Gain/Loss",
      field: "lastName",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "STCG",
      field: "lastName",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "LTCG",
      field: "lastName",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Weight(%)",
      field: "lastName",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
  ];

  return (
    <div className="custom-wrapper">
      <div className="custom-header"></div>
      <div className="custom-body">
        {/* <h2 className="custom-title">{title}</h2> */}
        {data.map((item, index) => (
          <>
          <div key={index} className="custom-item">
            <h3 className="custom-item-label">{item.label}</h3>
            <p className="custom-item-value">{item.value}</p>
          </div>
          
        </>
        ))}
        <div className="custom-weight">
          <h3 className="custom-item-label">Weight (%)</h3>
          <p className="custom-weight-value">{weight}%</p>
        </div>
        <div className="custom-weight-bar-container">
          <div className="custom-weight-bar-bg">
            <div
              className="custom-weight-bar-fill"
              style={{ width: `${weight}%` }}
            ></div>
          </div>
        </div>
        {/* Dropdown */}
        {/* <div className="custom-dropdown">
        
          <FontAwesomeIcon
            icon={faSquareCaretDown}
            className="dropdown-icon"
            onClick={handleOpenModal}
          />
        </div> */}
      </div>
      {showModal ? (
        <>
          <div className="dashbordchart mixbar">
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData2}
              filenames="TopHoldings"
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
              showDatePicker={false}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CustomCard;
