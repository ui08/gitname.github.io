import { Checkbox, ListItemIcon, ListItemText } from "@mui/material";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import InputRadioGroup from "../../../Component/ComponentsInput/InputRadioGroup";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import Pageheader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import {
    decryptData,
    encrypt
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";

export default function CommissionAdd() {
  const pageName = decryptData(useParams().pageName);

  // const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const hasRun = useRef(false); //To prevent multiple reders of useEffect
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
const [filterByType, setFilterByType] = useState("");
const [allMF, setAllMF] = useState([
      {label : "Bandhan Mutual Fund", value : "Badndhan Mutual Fund"},
  {label : "360 ONE Mutual Fund", value : "360 ONE Mutual Fund"},
  {label : "Aditya Birla Sun Life Mutual Fund", value : "Aditya Birla Sun Life Mutual Fund"},
  {label : "Angel One Mutual Fund", value : "Angel One Mutual Fund"},
  {label : "Axis Mutual Fund", value : "Axis mutual Fund"},
  {label : "Bajaj Finserv Mutual Fund", value : "Bajaj Finserv Mutual Fund"},

]);

const [allAIF, setAllAIF] = useState([
  {label : "Abakkus Asset Manager Private Limited", value : "Abakkus Asset Manager Private Limited"},

]);

const [allCategory, setAllCategory] = useState([
  {label : "Cash", value : "Cash"},
  {label : "Debt", value : "Debt"},
  {label : "Equity", value : "Equity"},
  {label : "hybrid", value : "Hybrid"},
  {label : "Others", value : "Others"},

]);

  const [flteredItemsloading, setfilteredItemsloading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([
    {label : "Bandhan Core Equity Fund Reg - (IDCW)", value : "Bandhan Core Equity Fund Reg - (IDCW)"},
    {label : "Bandhan Core Equity Fund Reg - (G)", value : "Bandhan Core Equity Fund Reg - (G)"},
    {label : "Bandhan Large Cap Fund Reg - (IDCW)", value : "Bandhan Large Cap Fund Reg - (IDCW)"},
    {label : "Bandhan Large Cap Fund Reg - (G)", value : "Bandhan Large Cap Fund Reg - (G)"},
    {label : "Bandhan Focused Equity Fund Reg - (IDCW)", value : "Bandhan Focused Equity Fund Reg - (IDCW)"},

  ]);
  const [leftCat, setLeftCat] = useState([
    {label : "Cash", value : "Cash"},
    {label : "Debt", value : "Debt"},
    {label : "Equity", value : "Equity"},
    {label : "Hybrid", value : "Hybrid"},
    {label : "Others", value : "Others"},

  ]);
  const [right, setRight] = React.useState([]);
 const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // Callback for Search
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Callback for Export Button
  const handleExportClick = () => {
    console.log("Export Button Clicked");
  };
  console.log("pageName", pageName);

  // Callback for Reset Button
  const handleResetClick = () => {
    console.log("Reset Button Clicked");
  };
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
  } = useForm();
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };

  const [rowData, setRowData] = useState([
    {
      schemeName: "HDFC Large Cap",
      year1: "0.75",
      year2: "0.5",
      year3: "0.5",
    },
    {
      schemeName: "HDFC Flexi Cap",
      year1: "0.75",
      year2: "0.5",
      year3: "0.5",
    },
    {
      schemeName: "HDFC Mid-Cap Opportuinities Gr.",
      year1: "0.75",
      year2: "0.5",
      year3: "0.5",
    },
    {
      schemeName: "HDFC Focused 30",
      year1: "0.75",
      year2: "0.5",
      year3: "0.5",
    },
  ]);

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.allClientsList}`);
      if (response) {
        toast.success(response.data.message);
        let result = response.data;
        setRowData(result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Scheme Name",
      field: "schemeName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Year 1 (%)",
      field: "year1",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Year 2 (%)",
      field: "year2",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Year 3 (%)",
      field: "year3",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
  ];

  const breadcrumbItems = [
    {
      label: pageName,
      // icon: <FontAwesomeIcon icon={faList} />,
      
    },
    {
      label: "Commission Upload Master",
      patth: "/" + encrypt("CommissionUploadMasterLanding"),
      // icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: "Add Details",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleCategory = (value) => {
    setFilterByType(value.target.value);
    setChecked([])
  };

  function not(a, b) {
    return a.filter((value) => !b.includes(value));
  }

  function intersection(a, b) {
    return a.filter((value) => b.includes(value));
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  console.log("checked",checked)
  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    console.log("right", leftChecked);
    handleCheckedfilter("leftright", leftChecked);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    console.log("rightleft", rightChecked);
    handleCheckedfilter("rightleft", rightChecked);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleCheckedfilter = (permissiontype, permission) => {
    let RoleValues = getValues("Role");
    const tempermission = permission.map((permission) => permission.value);
    let payload;
    if (permissiontype == "rightleft") {
      payload = {
        roleId: parseInt(RoleValues.value),
        updatePermissionList: [],
        deletePermissionList: tempermission,
      };
    }
    if (permissiontype == "leftright") {
      payload = {
        roleId: parseInt(RoleValues.value),
        updatePermissionList: tempermission,
        deletePermissionList: [],
      };
    }
    submitData(payload);
  };

  const customList = (title, items, searchTerm, setSearchTerm, box) => {
    let filteredItems;
    if(box) {
    const filteredItem = items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredItems = filteredItem;
  }
    return (
      <div className="PermissionslistChoicesselected">
        <div className="Permissionslistselectedtitle">
         
          <p className="titletext">{title}</p>
          <div className="mt-4 d-flex align-items-center justify-content-start">
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
          </div>
          {box ?
          <>
          <div className="scheme_element">
          <div className="checkboxdiv mt-1">
            <Checkbox
              className="checkboxdivCheckboxtitletext"
              onClick={handleToggleAll(filteredItems)}
              checked={
                numberOfChecked(filteredItems) === filteredItems.length &&
                filteredItems.length !== 0
              }
              indeterminate={
                numberOfChecked(filteredItems) !== filteredItems.length &&
                numberOfChecked(filteredItems) !== 0
              }
              disabled={filteredItems.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
            <div className="checkboxdivtitletext">Select All</div>
            </div>
            <div className="checkbox_scheme">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Search"
            registerName={title}
            name={title}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={false}
            onChange={(e) => setSearchTerm(e.target.value)}
            // divClassName={"divClassName m-0"}
          />
          </div>
          </div> 
           </>: null}
       
        </div>

        <div className="Permissionslistselectedcard">
          
            <>
            {box ?
            <>
               {filteredItems.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                  <div
                    key={value.value}
                    className="listitem"
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.includes(value)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.label}`} />
                  </div>
                );
              })} </> :
             <>
             {checked.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                  <div
                    key={value.value}
                    className="listitem"
                    onClick={handleToggle(value)}
                  >
                    <ul>
                      <li><ListItemText id={labelId} primary={`${value.label}`} />
                      </li>
                    </ul>
                  </div>
                );
              })}
               
                
             </>}
            </>
          
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pageheader
            pagename={t("Common:App_lms_Common_00269")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pageheader>
          <div className="pagebody">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-6">
                <InputSelect
                  control={control}
                  register={register}
                  setValue={setValue}
                  registerName={"CategoryType"}
                  mandatory={true}
                  labelName={`Select ${pageName}`}
                   options={pageName == "Mutual Fund" ? allMF : allAIF}
                  onSelect={() => {}}
                  divClassName={"divClassName"}
                  // previewFlag={isViewMode}
                />
              </div>

              <div className="col-12 col-md-3 col-lg-3">
                <InputDatePicker
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  labelName=" From Date"
                  registerName="fromDate"
                  mandatory={true}
                  dateformat="DD/MM/YYYY"
                  disabled={false}
                  minDateVal={null} // Optional: Specify the minimum date
                  maxDateVal={dayjs()} // Disable future dates
                />{" "}
              </div>
        

              <div className="col-12 col-md-3 col-lg-3">
                <InputDatePicker
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  labelName=" To Date"
                  registerName="toDate"
                  mandatory={true}
                  dateformat="DD/MM/YYYY"
                  disabled={false}
                  minDateVal={null} // Optional: Specify the minimum date
                  maxDateVal={dayjs()} // Disable future dates
                />{" "}
              </div>

               <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
                                <InputRadioGroup
                                  {...useFromProps}
                                  useForm={useForm}
                                  registerName="Scheme"
                                  type={"radio"}
                                  checked={filterByType === "scheme" ? true : false}
                                  defaultValue="scheme"
                                  labelName={<>Select Scheme</>}
                                  id={"scheme"}
                                  errorLabel={"radio Box"}
                                  onChange={(e) => handleCategory(e)}
                                />
                                <InputRadioGroup
                                  {...useFromProps}
                                  useForm={useForm}
                                  registerName="Category"
                                  type={"radio"}
                                  defaultValue="category"
                                  checked={filterByType === "category" ? true : false}
                                  labelName={<>{`Select Category`}</>}
                                  id={"category"}
                                  errorLabel={"radio Box"}
                                  onChange={(e) => handleCategory(e)}
                                />
                                {/* Account */}
                                
                              </div>

                              {/* <div>
                              <AppModal
                isOpen={showProductTableModal}
                onClose={() => setShowProductTableModal(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                buttonConfigs={[]}
                ModalTitle = {"Product Category" + " ->" + selectedValuePC}
                ModalBody={
                 
                  <AgTable
          columnDefs={columnDefsProductType}
          rowData={ rowDataProductType}
          filenames="Product_Type"
          StyleClass="btn btn-primary"
          type="table"
          gridOptions={{
            getRowStyle,
          }}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
          onExportClick={handleExportClick}
          onResetClick={handleResetClick}
          showDatePicker={false}
        />
        
                }
              />
                              </div> */}

                {filterByType == "scheme" ? 
              <>
              <div className = "row">
              <div className="col-12 col-md-4 col-lg-6">
                <InputSelect
                  control={control}
                  register={register}
                  setValue={setValue}
                  registerName="Category"
                  mandatory={true}
                  labelName={`Select ${pageName} Category`}
                   options={allCategory}
                  onSelect={() => {}}
                  divClassName={"divClassName"}
                  // previewFlag={isViewMode}
                />
              </div>
              </div>
              </> : null}

              {filterByType == "scheme" ||  filterByType == "category" ?
              <>
              <div className = "row">
                   <div className="col-12 col-md-4 col-lg-4">
                          <InputText
                            {...useFromProps}
                            useForm={useForm}
                            readOnly={false}
                            disabled={false}
                            type="text"
                            labelName="Year 1 (%)"
                            minLength={1}
                            // maxLength={255}
                            // pattern={{
                            //   value: ValidationPattern.number,
                            //   message: PatternMessage("number", "Security ID"),
                            // }}
                            registerName={"Year1"}
                            name={"Year1"}
                            mandatory={true}
                            onPaste={false}
                            onCopy={false}
                            previewFlag={false}
                            onChange={() => {}}
                            divClassName={"divClassName"}
                          />
                        </div>
                        <div className="col-12 col-md-4 col-lg-4">
                          <InputText
                            {...useFromProps}
                            useForm={useForm}
                            readOnly={false}
                            disabled={false}
                            type="text"
                            labelName="Year 2 (%)"
                            minLength={1}
                            // maxLength={255}
                            // pattern={{
                            //   value: ValidationPattern.number,
                            //   message: PatternMessage("number", "Security ID"),
                            // }}
                            registerName={"Year2"}
                            name={"Year2"}
                            mandatory={true}
                            onPaste={false}
                            onCopy={false}
                            previewFlag={false}
                            onChange={() => {}}
                            divClassName={"divClassName"}
                          />
                        </div>
                        <div className="col-12 col-md-4 col-lg-4">
                          <InputText
                            {...useFromProps}
                            useForm={useForm}
                            readOnly={false}
                            disabled={false}
                            type="text"
                            labelName="Year 3 (%)"
                            minLength={1}
                            // maxLength={255}
                            // pattern={{
                            //   value: ValidationPattern.number,
                            //   message: PatternMessage("number", "Security ID"),
                            // }}
                            registerName={"Year3"}
                            name={"Year3"}
                            mandatory={true}
                            onPaste={false}
                            onCopy={false}
                            previewFlag={false}
                            onChange={() => {}}
                            divClassName={"divClassName"}
                          />
                        </div>
              </div>
             
                <div className="row justify-content-center">
                              <div className="col-md-10 col-12">
                                <div className="row justify-content-center Permissionslist ">
                                  <div className="col-md-5 col-12 PermissionslistChosen">
                                    {customList(
                                     
                                      filterByType == "scheme" ? "Available Schemes" : "Available Categories",
                                      filterByType == "scheme" ? left : leftCat,
                                      leftSearch,
                                      setLeftSearch,
                                      "box"
                                    )}
                                  </div>
                                  <div className="col-md-2 col-12 PermissionslistButtonComp">
                                    {/* <ButtonComp
                                      wrapperName={"download_temp_wrapper"}
                                      type="button"
                                      btnStyle="box"
                                      btnText={"Assign"}
                                      disabled={leftChecked.length === 0}
                                      onClick={handleCheckedRight}
                                    /> */}
                                    {/* <ButtonComp
                                      wrapperName={"download_temp_wrapper"}
                                      type="button"
                                      btnStyle="box"
                                      btnText={"Remove"}
                                      disabled={rightChecked.length === 0}
                                      onClick={handleCheckedLeft}
                                    /> */}
                                  </div>
                                  <div className="col-md-5 col-12 PermissionslistChosen">
                                    {customList(
filterByType == "scheme" ? "Selected Schemes" : "Selected Categories"                                  
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
              
              </>  : null
              }
              <div className="d-flex gap-3">
                               <ButtonComp
                                 wrapperName={"download_temp_wrapper"}
                                 type="button"
                                 btnStyle="box"
                                 btnText={"Save & Next"}
                                 onClick={() => {
                                  viewReportClick();
                                 }}
                               />
                               </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
