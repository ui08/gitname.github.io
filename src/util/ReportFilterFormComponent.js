import moment from "moment";
import { PropTypes } from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../Component/ButtonComp/ButtonComp";
import InputDatePickerWithMoment from "../Component/ComponentsInput/InputDatePickerWithMoment";
import InputRadioGroup from "../Component/ComponentsInput/InputRadioGroup";
import InputSelect from "../Component/ComponentsInput/InputSelect";
import MultiSelect from "./../Component/ComponentsInput/MultiSelect";
import { Apiurl } from "./apiurl";
import { getUserFilterDetails } from "./Authenticate";
import { decryptData, encrypt, encryptData } from "./Authenticate/CryptoJS";
import axiosInstance from "./axiosInstance";
import { reportConfigs } from "./ReportCofig";
const ReportFilterFormComponent = ({
  initialData,
  onSubmit,
  handleExportCom,
  handleViewCom,
  pageName,
}) => {
  const Reportmode = decryptData(useParams().Reportmode);
  const [reportsby, setReportsby] = useState("Family");
  const [reportsbyheld, setReportsbyheld] = useState("both");
  const [reportsList, setReportsList] = useState("");
  const [DisableTodate, setDisableTodate] = useState(true);
  const [localfromodate, setLocalFromodate] = useState();
  const [clientOptions, setClientOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [fundOptions, setFundOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [familyMsterOptions, setFamilyMsterOptions] = useState([]);
  const [reportConfigsOptions, setReportConfigsOptions] = useState([]);
  console.log("productOptions:", productOptions);

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
  } = useForm({ defaultValues: initialData });
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
    if (initialData) {
      if (pageName === "EntityReport") {
        setReportsby(Reportmode);

        setValue("selectfund", initialData.selectfund?.value);
        setReportsList(initialData.selectreport?.value);
        setValue("selectreport", initialData.selectreport.value);
      }

      reset(initialData);
      // selectreport
    } else {
    }
    setValue("Repasondate", moment());
  }, [initialData, reset]);

  // HOLDING_REPORT, CAPITAL_GAIN_REPORT, XIRR_REPORT, SECURITY_REPORT, FAMILY_OFFICE_REPORT,
  // SUMMARY_REPORT, TRANSACTION_REPORT;s

  const reportslists = [
    { value: "HOLDING_REPORT", label: "Holding Report" },
    { value: "CAPITAL_GAIN_REPORT", label: "Capital Gain Report" },
    { value: "SUMMARY_REPORT", label: "Summary Report" },
    { value: "TRANSACTION_REPORT", label: "Transaction Report" },
    { value: "XIRR_REPORT", label: "XIRR Report" },
    {
      value: "THREE_SIXTY_DEGREE_WEALTH_REPORT",
      label: " 360 DEGREE WEALTH REPORT",
    },
  ];
  const reportsformatlist = [
    { value: "pdf", label: "PDF" },
    { value: "xlsx", label: "Excel" },
  ];

  const financialYearList = [
    {
      value: "0",
      label: "2025-26",
      fromDate: "2025-04-01",
      toDate: "2026-03-31",
    },
    {
      value: "1",
      label: "2024-25",
      fromDate: "2024-04-01",
      toDate: "2025-03-31",
    },
    {
      value: "2",
      label: "2023-24",
      fromDate: "2023-04-01",
      toDate: "2024-03-31",
    },
    {
      value: "3",
      label: "2022-23",
      fromDate: "2022-04-01",
      toDate: "2023-03-31",
    },
    {
      value: "4",
      label: "2021-22",
      fromDate: "2021-04-01",
      toDate: "2022-03-31",
    },
    {
      value: "5",
      label: "2020-21",
      fromDate: "2020-04-01",
      toDate: "2021-03-31",
    },
  ];

  const [
    Reportsby,
    selectclient,
    selectfamily,
    selectaccount,
    selectproduct,
    selectfund,
    selectreport,
    fromdate,
    todate,
    Repasondate,
    selectreportformat,
    Reportsbyheld,
  ] = watch([
    "Reportsby",
    "selectclient",
    "selectfamily",
    "selectaccount",
    "selectproduct",
    "selectfund",
    "selectreport",
    "fromdate",
    "todate",
    "Repasondate",
    "selectreportformat",
    "Reportsbyheld",
  ]);
  const navigate = useNavigate();
  const handleReportsby = (value) => {
    setReportsby("");
    navigate(
      "/" + encrypt("EnitityReport") + `/${encryptData(value.target.value)}`
    );
    setReportsby(value.target.value);
  };
  const handleReportsbyheld = (value) => {
    setReportsbyheld("");
    setReportsbyheld(value.target.value);
  };

  const handleDateChange = useCallback((value) => {
    setValue("Repasondate", null);

    setDisableTodate(false);
    setLocalFromodate(value);
  }, []);

  useEffect(() => {
    if (pageName + Reportmode + reportsList in reportConfigs) {
      GetFamilyMsterListByRmIdOptions("rm");
      GetClientOptions("rm");
      GetgetAllProductClassMstOptions();
    }

    if (pageName in reportConfigs) {
      console.log("pageName", pageName);
      if (pageName === "ClientHoldingReport") {
        setValue("selectreport", {
          value: "HOLDING_REPORT",
          label: "Holding Report",
        });
        setValue("selectreportformat", {
          label: "PDF",
          value: "pdf",
        });
      } else if (pageName === "CapitalGainReport") {
        setValue("selectreport", {
          value: "CAPITAL_GAIN_REPORT",
          label: "Capital Gain Report",
        });
        setValue("selectreportformat", {
          label: "PDF",
          value: "pdf",
        });
      } else if (pageName === "ClientTransactionReport") {
        setValue("selectreport", {
          value: "TRANSACTION_REPORT",
          label: "Transaction Report",
        });
        setValue("selectreportformat", { value: "xlsx", label: "Excel" });
      } else if (pageName === "ClientSummaryReports") {
        setValue("selectreport", {
          value: "SUMMARY_REPORT",
          label: "Summary Report",
        });

        setValue("selectreportformat", {
          label: "PDF",
          value: "pdf",
        });
      } else if (pageName === "ClientXIRRReports") {
        setValue("selectreport", {
          value: "XIRR_REPORT",
          label: "XIRR REPORT",
        });

        setValue("selectreportformat", {
          label: "PDF",
          value: "pdf",
        });
      } else if (pageName === "Client360DegreeWealth") {
        setValue("selectreport", {
          value: "THREE_SIXTY_DEGREE_WEALTH_REPORT",
          label: "360 DEGREE WEALTH REPORT",
        });

        setValue("selectreportformat", {
          label: "PDF",
          value: "pdf",
        });
      }
      GetAccountOptions("client");
    }
  }, [pageName, Reportmode, reportsList]);

  const onValidReady = useCallback(() => {
    const fruits = [];
    const params =
      reportConfigs[pageName + Reportmode + reportsList]?.selectReportinput ||
      reportConfigs[pageName]?.selectReportinput ||
      [];

    params
      .filter((item) => item.mandatoryby === true)
      .map((item, index) => {
        fruits.push(item.inputName);

        // console.log("onValidReady", fruits.join("&"));
      });
    return fruits.join("&");
  }, [pageName + Reportmode + reportsList]);
  // Valid function simplified for dynamic validation
  const isValid = useMemo(() => {
    const validConditions = {
      EntityReportFamily: onValidReady(),
      EntityReportClient: onValidReady(),

      EntityReportFamilyHOLDING_REPORT: onValidReady(),
      EntityReportFamilyCAPITAL_GAIN_REPORT: onValidReady(),
      EntityReportFamilySECURITY_REPORT: onValidReady(),
      EntityReportFamilySUMMARY_REPORT: onValidReady(),
      EntityReportFamilyTRANSACTION_REPORT: onValidReady(),
      EntityReportFamilyXIRR_REPORT: onValidReady(),
      EntityReportFamilyFAMILY_OFFICE_REPORT: onValidReady(),
      EntityReportFamilyTHREE_SIXTY_DEGREE_WEALTH_REPORT: onValidReady(),
      EntityReportClientHOLDING_REPORT: onValidReady(),
      EntityReportClientCAPITAL_GAIN_REPORT: onValidReady(),
      EntityReportClientSECURITY_REPORT: onValidReady(),
      EntityReportClientSUMMARY_REPORT: onValidReady(),
      EntityReportClientTRANSACTION_REPORT: onValidReady(),
      EntityReportClientXIRR_REPORT: onValidReady(),
      EntityReportClientFAMILY_OFFICE_REPORT: onValidReady(),
      EntityReportClientTHREE_SIXTY_DEGREE_WEALTH_REPORT: onValidReady(),

      ClientTransactionReport: onValidReady(),
      ClientHoldingReport: onValidReady(),
      CapitalGainReport: onValidReady(),
      ClientSummaryReports: onValidReady(),
      ClientXIRRReports: onValidReady(),
      Client360DegreeWealth: onValidReady(),
    };
    return (
      validConditions[pageName + Reportmode + reportsList] ||
      validConditions[pageName]
    );
  }, [Reportmode, pageName, reportsList]);

  const handleExport = useCallback(() => handleExportCom("Export"), []);
  const handleView = useCallback(() => handleViewCom("View"), []);

  const GetFamilyMsterListByRmIdOptions = async (id) => {
    const apiCallby =
      id === "client"
        ? getUserFilterDetails("clientId")
        : getUserFilterDetails("rmAdvId");
    try {
      const response = await axiosInstance.get(
        Apiurl.getFamilyMsterListByRmId + apiCallby
      );

      setFamilyMsterOptions([]);

      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.familyHeadName,
          value: item.familyHeadId,
        };
        setFamilyMsterOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
  const GetClientOptions = async (id) => {
    const apiCallby =
      id === "client"
        ? getUserFilterDetails("clientId")
        : getUserFilterDetails("rmAdvId");

    try {
      const response = await axiosInstance.get(
        Apiurl.getClientDetailsByRmId + apiCallby
      );

      setClientOptions([]);

      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setClientOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
  const GetAccountOptions = async (id) => {
    const apiCallby = id === "client" ? getUserFilterDetails("clientId") : id;
    try {
      const response = await axiosInstance.get(
        Apiurl.getClientAccountListByClientId + apiCallby
      );

      setAccountOptions([]);

      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.accountUniqueId,
          value: item.id,
        };
        setAccountOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };

  const GetAllFundsDropDown = async (products) => {
    console.log("products", products);

    const queryString = products
      .map((product) => `productIds=${product.value}`)
      .join("&");
    try {
      const response = await axiosInstance.get(
        Apiurl.fetchAllAmcNamesByProduct + queryString
      );
      // Combine Bonds / Debentures and Mutual Funds into one array
      // const setFundOptionsproducts = [...data[products.productName]].map(
      //   (item) => {
      //     return {
      //       label: item.instrumentName,
      //       value: item.isin ?? item.securityId ?? item.rtaCode ?? null,
      //     };
      //   }
      // );

      // console.log(setFundOptionsproducts);
      setFundOptions([]);
      let temresponse = response.data;
      // // const responsevalues = {
      // //   data: temresponse.map((fund, index) => ({
      // //     value: index + 1, // Assuming the id is simply an index for now
      // //     label: fund,
      // //   })),
      // // };
      // // console.log("responsevalues", responsevalues.data);
      Object.values(temresponse).map((item) => {
        let SingleData = {
          label: item.instrumentName,
          value: item.securityIds,
        };
        setFundOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
  const GetgetAllProductClassMstOptions = async (id) => {
    try {
      const response = await axiosInstance.get(
        Apiurl.fetchAllProduListFromHolding
      );

      setProductOptions([]);

      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.productName,
          value: item.id,
        };
        setProductOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        {/* select family */}

        {(
          reportConfigs[pageName + Reportmode + reportsList]
            ?.selectReportinput ||
          reportConfigs[pageName]?.selectReportinput ||
          []
        ).map((item, index) => {
          return (
            <>
              {item.inputName === "reportsby" && (
                <div className="col-12  d-flex ">
                  <InputRadioGroup
                    {...useFromProps}
                    useForm={useForm}
                    registerName="Reportsby"
                    type={"radio"}
                    checked={Reportmode === "Family" && true}
                    defaultValue="Family"
                    labelName={<>Family</>}
                    id={"Familyid"}
                    errorLabel={"radio Box"}
                    onChange={(e) => handleReportsby(e)}
                  />
                  <InputRadioGroup
                    {...useFromProps}
                    useForm={useForm}
                    registerName="Reportsby"
                    type={"radio"}
                    defaultValue="Client"
                    checked={Reportmode === "Client" && true}
                    labelName={<>Client</>}
                    id={"Clientid"}
                    errorLabel={"radio Box"}
                    onChange={(e) => handleReportsby(e)}
                  />
                </div>
              )}

              {item.inputName === "selectclient" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectclient"
                    mandatory={
                      item.inputName === "selectclient" && item.mandatoryby
                    }
                    labelName="Select Client"
                    options={clientOptions}
                    onSelect={(e) => {
                      GetAccountOptions(e.value);
                    }}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "selectfamily" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectfamily"
                    mandatory={
                      item.inputName === "selectfamily" && item.mandatoryby
                    }
                    labelName="Select Family"
                    options={familyMsterOptions}
                    onSelect={() => {}}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "selectreport" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectreport"
                    mandatory={true}
                    labelName="Select Report"
                    options={reportslists}
                    previewFlag={pageName === "EntityReport" ? false : true}
                    onSelect={(e) => {
                      setReportsList("");
                      setValue(
                        "selectreportformat",
                        e.value == "TRANSACTION_REPORT"
                          ? {
                              label: "Excel",
                              value: "xlsx",
                            }
                          : {
                              label: "PDF",
                              value: "pdf",
                            }
                      );

                      setReportsList(e.value);
                    }}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "selectreportformat" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectreportformat"
                    mandatory={false}
                    labelName="Select Report Format"
                    options={reportsformatlist}
                    onSelect={() => {}}
                    previewFlag={true}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "financialYear" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="financialYear"
                    mandatory={true}
                    labelName="Financial Year"
                    options={financialYearList}
                    onSelect={(e) => {
                      e.value;
                    }}
                    // previewFlag={pageName === "EntityReport" ? false : truee}
                    previewFlag={false}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "productType" && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectproduct"
                    mandatory={false}
                    labelName="Product Type"
                    options={productOptions}
                    // onSelect={(e) => {
                    //   GetAllFundsDropDown(e);
                    // }}
                    onSelect={(e) => {
                      e.value;
                    }}
                    isMulti={false}
                    divClassName={"divClassName"}
                  />
                </div>
              )}
              {item.inputName === "fromdate" ||
                (item.inputName === "todate" && (
                  <>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputDatePickerWithMoment
                        control={control}
                        setValue={setValue}
                        errors={errors}
                        labelName="From Date"
                        registerName="fromdate"
                        mandatory={true}
                        dateformat="DD/MM/YYYY"
                        disabled={false}
                        dateviews={"year"}
                        minDateVal={null}
                        maxDateVal={moment()}
                        onSelect={(value) => handleDateChange(value)}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputDatePickerWithMoment
                        control={control}
                        setValue={setValue}
                        errors={errors}
                        labelName="To Date"
                        registerName="todate"
                        mandatory={true}
                        dateformat="DD/MM/YYYY"
                        disabled={false}
                        dateviews={"year"}
                        minDateVal={moment(localfromodate).add(1, "days")}
                        maxDateVal={moment()}
                      />
                    </div>
                  </>
                ))}
              {item.inputName === "Repasondate" && (
                <>
                  <div className="col-12 col-md-4 col-lg-4">
                    <InputDatePickerWithMoment
                      control={control}
                      setValue={setValue}
                      errors={errors}
                      labelName="As on date"
                      registerName="Repasondate"
                      mandatory={true}
                      dateformat="DD/MM/YYYY"
                      disabled={false}
                      dateviews={"year"}
                      minDateVal={null}
                      maxDateVal={moment()}
                    />
                  </div>
                </>
              )}

              {item.inputName === "Reportsbyheld" && (
                <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
                  <InputRadioGroup
                    {...useFromProps}
                    useForm={useForm}
                    registerName="Reportsbyheld"
                    type={"radio"}
                    checked={reportsbyheld === "held" ? true : false}
                    defaultValue="held"
                    labelName={<>Held</>}
                    id={"heldid"}
                    errorLabel={"radio Box"}
                    onChange={(e) => handleReportsbyheld(e)}
                  />
                  <InputRadioGroup
                    {...useFromProps}
                    useForm={useForm}
                    registerName="Reportsbyheld"
                    type={"radio"}
                    defaultValue="heldaway"
                    checked={reportsbyheld === "heldaway" ? true : false}
                    labelName={<>Held Away</>}
                    id={"heldawayid"}
                    errorLabel={"radio Box"}
                    onChange={(e) => handleReportsbyheld(e)}
                  />
                  {/* Account */}
                  <InputRadioGroup
                    {...useFromProps}
                    useForm={useForm}
                    registerName="Reportsbyheld"
                    type={"radio"}
                    id={"bothid"}
                    defaultValue="both"
                    checked={reportsbyheld === "both" ? true : false}
                    labelName={<>Both</>}
                    errorLabel={"radio Box"}
                    onChange={(e) => handleReportsbyheld(e)}
                  />
                </div>
              )}
              {item.inputName === "selectaccount" && (
                <div className="col-12 col-md-12 col-lg-12" key={index}>
                  <MultiSelect
                    control={control}
                    name="selectaccount"
                    label="Select Account"
                    options={accountOptions}
                    isRequired={item.inputName === "selectaccount" && item.mandatoryby}
                    errors={errors}
                    previewFlag={false}
                    divClassName={"divClassName"}
                  />

                  {/* <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    isMulti={false}
                    registerName="selectaccount"
                    mandatory={
                      item.inputName === "selectaccount" && item.mandatoryby
                    }
                    labelName="Select Account"
                    options={accountOptions}
                    onSelect={() => {}}
                    divClassName={"divClassName"}
                  /> */}
                </div>
              )}
              {item.inputName === "selectproduct" && (
                <div className="col-12 col-md-12 col-lg-12">

                   <MultiSelect
                    control={control}
                    name="selectproduct"
                    label="Select Product"
                    options={productOptions}
                    isRequired={item.inputName === "selectproduct" && item.mandatoryby}
                    errors={errors}
                    previewFlag={false}
                    divClassName={"divClassName"}
                     onSelect={(e) => {
                      GetAllFundsDropDown(e);
                    }}
                  />
                  {/* <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectproduct"
                    mandatory={
                      item.inputName === "selectproduct" && item.mandatoryby
                    }
                    labelName="Select Product"
                    options={productOptions}
                    onSelect={(e) => {
                      GetAllFundsDropDown(e);
                    }}
                    isMulti={false}
                    divClassName={"divClassName"}
                  /> */}
                </div>
              )} 
               {item.inputName === "selectfund" && (
                <div className="col-12 col-md-12 col-lg-12">
                  {/* <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="selectfund"
                    mandatory={false}
                    labelName="Select Fund"
                    options={fundOptions}
                    divClassName={"divClassName"}
                  /> */}
                          <MultiSelect
                    control={control}
                    name="selectfund"
                    label="Select Fund"
                    options={fundOptions}
                    isRequired={item.inputName === "selectfund" && item.mandatoryby}
                    errors={errors}
                    previewFlag={false}
                    divClassName={"divClassName"}
                     onSelect={(e) => {
                      GetAllFundsDropDown(e);
                    }}
                  />
                </div>
              )}

              {item.NameExport && (
                <div className="col-12 col-md-2 col-lg-2">
                  <ButtonComp
                    wrapperName="submit_btn_wrapper"
                    type={"submit"}
                    btnStyle="box"
                    btnText={"Export"}
                    disabled={!isValid}
                    onClick={() => handleExport("Export")}
                  />
                </div>
              )}
              {item.NameView && (
                <div className="col-12 col-md-2 col-lg-2">
                  <ButtonComp
                    wrapperName="submit_btn_wrapper"
                    type={"submit"}
                    btnStyle="box"
                    btnText={"View"}
                    disabled={!isValid}
                    onClick={() => handleView("View")}
                  />
                </div>
              )}

              {/* )} */}
            </>
          );
        })}

        {/* {reportsList === "TRANSACTION_REPORT" ||
        reportsList === "CAPITAL_GAIN_REPORT" ||
        reportsList === "SECURITY_REPORT" ||
        pageName === "CapitalGainReport" ||
        pageName === "ClientTransactionReport" ? (
          
        ) : null} */}
      </div>
    </form>
  );
};

ReportFilterFormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default ReportFilterFormComponent;
