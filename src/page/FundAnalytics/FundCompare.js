import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import AppbarChart from "../../Component/ComponentsChart/AppbarChart";
import InputRadioGroup from "../../Component/ComponentsInput/InputRadioGroup";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import "./FundCompare.scss";
import { GetSvgStyleBox } from "../../assets/img/app/GetSvgStyleBox";
import FundCompareCard from "./FundCompareCard";

function FundCompare() {
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

  // Transactions
  const [loading, setLoading] = useState(false);
  const [mfResponseOne, setMfResponseOne] = useState([]);
  const [mfResponseTwo, setMfResponseTwo] = useState([]);
  const [mfResponseThree, setMfResponseThree] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("mfEquity");

  const [AMCOptions, setAMCOptions] = useState([]);
  const [lineChartDataOne, setLineChartDataOne] = useState([]);
  const [lineChartDataTwo, setLineChartDataTwo] = useState([]);
  const [lineChartDataThree, setLineChartDataThree] = useState([]);

  // Separate states for each AMC's schemes
  const [schemesForAMCOne, setSchemesForAMCOne] = useState([]);
  const [schemesForAMCTwo, setSchemesForAMCTwo] = useState([]);
  const [schemesForAMCThree, setSchemesForAMCThree] = useState([]);

  const [selectedSchemes, setSelectedSchemes] = useState({
    one: null,
    two: null,
    three: null,
  });

  const handleRadioSelect = (e) => {
    setSelectedRadio(e.target.value);
  };

  useEffect(() => {
    setMfResponseOne([]);
    setMfResponseTwo([]);
    setMfResponseThree([]);
    setSelectedSchemes({ one: null, two: null, three: null });

    if (selectedRadio !== "directEquity") {
      setSchemesForAMCOne([]);
      setSchemesForAMCTwo([]);
      setSchemesForAMCThree([]);
      console.log(selectedRadio !== "directEquity", selectedRadio, "yyyyyyyy");
      setValue("SchemeOne", "");
      setValue("SchemeTwo", "");
      setValue("SchemeThree", "");
      setValue("SchemeOneAMC", "");
      setValue("SchemeTwoAMC", "");
      setValue("SchemeThreeAMC", "");
      setSelectedSchemes({ one: null, two: null, three: null });
      GetAMCOptions();
    } else {
      setValue("SchemeOne", "");
      setValue("SchemeTwo", "");
      setValue("SchemeThree", "");
      getDirectEquityOptions();
    }
  }, [selectedRadio]);

  const handleRadioChange = (e) => {
    setValue("SchemeOne", "");
    setValue("SchemeTwo", "");
    setValue("SchemeThree", "");
    setSelectedSchemes({ one: null, two: null, three: null });
  };
  const getDirectEquityOptions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.getFundCompareDropdown + `${undefined}/${undefined}`
      );
      const options = Object.values(response.data).map((item) => ({
        label: item.stockName,
        value: item.isin,
      }));

      // Set the same options for all three dropdowns for direct equity
      setSchemesForAMCOne(options);
      setSchemesForAMCTwo(options);
      setSchemesForAMCThree(options);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetAMCOptions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getAMCName);
      const options = response?.data.map((item) => ({
        label: item.fundHouse,
        value: item.fundHouse,
      }));
      setAMCOptions(options || []);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSchemesForAMC = async (amc, setSchemesFunction, compareBox) => {
    setLoading(true);
    setSchemesFunction([]); // Reset schemes for this AMC
    setValue(compareBox, ""); // Reset the scheme selection

    // Also clear any existing data for this comparison box
    if (compareBox === "SchemeOne") {
      setMfResponseOne([]);
      setLineChartDataOne([]);
    } else if (compareBox === "SchemeTwo") {
      setMfResponseTwo([]);
      setLineChartDataTwo([]);
    } else if (compareBox === "SchemeThree") {
      setMfResponseThree([]);
      setLineChartDataThree([]);
    }
    try {
      const response = await axiosInstance.get(
        Apiurl.getFundCompareDropdown + `${selectedRadio}/${amc}`
      );
      const options = Object.values(response.data).map((item) => ({
        label: item.schemeName,
        value: item.isin,
      }));
      setSchemesFunction(options);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (ISIN, CompareBox) => {
    setLoading(true);
    let url;
    if (selectedRadio == "directEquity") {
      url = Apiurl.analyticsStock;
    } else {
      url = Apiurl.analyticsMF;
    }
    try {
      const response = await axiosInstance.get(
        url +
          `ISIN=${ISIN}` +
          `&startDate=${moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")}&endDate=${moment()
            .subtract(30, "days")
            .format("YYYY-MM-DD")}`
      );
      if (selectedRadio == "directEquity") {
        const StockData = response?.data.masterStockPerformancevsIndexList.map(
          (item) => ({
            name: item.date,
            nav: item.closingPrice,
          })
        );
        if (CompareBox === "SchemeOne") {
          setMfResponseOne(response?.data);
          setLineChartDataOne(StockData || []);
        } else if (CompareBox === "SchemeTwo") {
          setMfResponseTwo(response?.data);
          setLineChartDataTwo(StockData || []);
        } else if (CompareBox === "SchemeThree") {
          setMfResponseThree(response?.data);
          setLineChartDataThree(StockData || []);
        }
      } else {
        const mfData = response?.data.masterFundPerformancevsIndexList.map(
          (item) => ({
            name: item.date,
            nav: item.nav,
          })
        );
        if (CompareBox === "SchemeOne") {
          setMfResponseOne(response?.data);
          setLineChartDataOne(mfData || []);
        } else if (CompareBox === "SchemeTwo") {
          setMfResponseTwo(response?.data);
          setLineChartDataTwo(mfData || []);
        } else if (CompareBox === "SchemeThree") {
          setMfResponseThree(response?.data);
          setLineChartDataThree(mfData || []);
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilter = useCallback(
    (value, selectedOptionName) => {
      // Clear previous response
      if (selectedOptionName === "SchemeOne") setMfResponseOne([]);
      if (selectedOptionName === "SchemeTwo") setMfResponseTwo([]);
      if (selectedOptionName === "SchemeThree") setMfResponseThree([]);

      // Update selected schemes
      setSelectedSchemes((prev) => {
        const newSelection = { ...prev };
        newSelection[selectedOptionName.toLowerCase().replace("scheme", "")] =
          value;
        return newSelection;
      });

      fetchAnalytics(value, selectedOptionName);
    },
    [fetchAnalytics]
  );

  const radioOptions = [
    { value: "mfEquity", label: "Mutual Fund Equity", id: "mfEquityId" },
    { value: "mfDebt", label: "Mutual Fund Debt", id: "mfDebtId" },
    { value: "other", label: "Mutual Fund Others", id: "otherId" },
    { value: "directEquity", label: "Direct Equity", id: "directEquityId" },
  ];

  return (
    <>
      {!loading ? (
        <div>
          <div className="row ">
            <h5 className="mx-2">Select Scheme</h5>
            <div className="col-12 d-flex">
              {radioOptions.map((option) => (
                <InputRadioGroup
                  key={option.id}
                  {...useFromProps}
                  useForm={useForm}
                  registerName="investmentType"
                  type="radio"
                  checked={selectedRadio === option.value}
                  defaultValue={option.value}
                  labelName={<>{option.label}</>}
                  id={option.id}
                  errorLabel="radio Box"
                  onChange={(e) => handleRadioSelect(e)}
                  onSelect={(e) => handleRadioChange(e)}
                />
              ))}
            </div>
          </div>
          {selectedRadio != "directEquity" && (
            <div className="row mt-2">
              <div className="col-12 col-md-4">
                <InputSelect
                  control={control}
                  register={register}
                  setValue={setValue}
                  registerName="SchemeOneAMC"
                  mandatory={true}
                  labelName="Select AMC"
                  options={AMCOptions}
                  onSelect={(e) => {
                    getSchemesForAMC(e.value, setSchemesForAMCOne, "SchemeOne");
                  }}
                  divClassName={"divClassName"}
                />
              </div>
              <div className="col-12 col-md-4">
                <InputSelect
                  control={control}
                  register={register}
                  setValue={setValue}
                  registerName="SchemeTwoAMC"
                  mandatory={true}
                  labelName="Select AMC"
                  options={AMCOptions}
                  onSelect={(e) => {
                    getSchemesForAMC(e.value, setSchemesForAMCTwo, "SchemeTwo");
                  }}
                  divClassName={"divClassName"}
                />
              </div>
              <div className="col-12 col-md-4">
                <InputSelect
                  control={control}
                  register={register}
                  setValue={setValue}
                  registerName="SchemeThreeAMC"
                  mandatory={true}
                  labelName="Select AMC"
                  options={AMCOptions}
                  onSelect={(e) => {
                    getSchemesForAMC(
                      e.value,
                      setSchemesForAMCThree,
                      "SchemeThree"
                    );
                  }}
                  divClassName={"divClassName"}
                />
              </div>
            </div>
          )}
          <div className="row">
            {/* Scheme 1 Dropdown */}
            <div className="col-12 col-md-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="SchemeOne"
                mandatory={true}
                labelName={selectedRadio == "directEquity" ? "Stock 1" : "Scheme 1" }
                options={schemesForAMCOne.filter(
                  (opt) =>
                    opt.value !== selectedSchemes.two &&
                    opt.value !== selectedSchemes.three
                )}
                onSelect={(e) => fetchFilter(e.value, "SchemeOne")}
                divClassName={"divClassName"}
                isDisabled={
                  selectedRadio !== "directEquity" && !watch("SchemeOneAMC")
                }
              />
            </div>

            {/* Scheme 2 Dropdown */}
            <div className="col-12 col-md-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="SchemeTwo"
                mandatory={true}
                labelName={selectedRadio == "directEquity" ? "Stock 2" : "Scheme 2" }
                options={schemesForAMCTwo.filter(
                  (opt) =>
                    opt.value !== selectedSchemes.one &&
                    opt.value !== selectedSchemes.three
                )}
                onSelect={(e) => fetchFilter(e.value, "SchemeTwo")}
                divClassName={"divClassName"}
                isDisabled={
                  selectedRadio !== "directEquity" && !watch("SchemeTwoAMC")
                }
              />
            </div>

            {/* Scheme 3 Dropdown */}
            <div className="col-12 col-md-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="SchemeThree"
                mandatory={true}
                labelName={selectedRadio == "directEquity" ? "Stock 3" : "Scheme 3" }
                options={schemesForAMCThree.filter(
                  (opt) =>
                    opt.value !== selectedSchemes.one &&
                    opt.value !== selectedSchemes.two
                )}
                onSelect={(e) => fetchFilter(e.value, "SchemeThree")}
                divClassName={"divClassName"}
                isDisabled={
                  selectedRadio !== "directEquity" && !watch("SchemeThreeAMC")
                }
              />
            </div>
          </div>
          <div className="row">
            {mfResponseOne && Object.keys(mfResponseOne).length > 0 ? (
              <div className="col-12 col-md-4 mt-3">
                <FundCompareCard
                  lineChartData={lineChartDataOne}
                  fundData={mfResponseOne}
                  selectedRadio={selectedRadio}
                />
              </div>
            ) : (
              <div className="invisible col-12 col-md-4">
                <p>No fund data available</p>
              </div>
            )}

            {mfResponseTwo && Object.keys(mfResponseTwo).length > 0 ? (
              <div className="col-12 col-md-4 mt-3">
                <FundCompareCard
                  lineChartData={lineChartDataTwo}
                  fundData={mfResponseTwo}
                  selectedRadio={selectedRadio}
                />
              </div>
            ) : (
              <div className="invisible col-12 col-md-4">
                <p>No fund data available</p>
              </div>
            )}

            {mfResponseThree && Object.keys(mfResponseThree).length > 0 ? (
              <div className="col-12 col-md-4 mt-3">
                <FundCompareCard
                  lineChartData={lineChartDataThree}
                  fundData={mfResponseThree}
                  selectedRadio={selectedRadio}
                />
              </div>
            ) : (
              <div className="invisible col-12 col-md-4">
                <p>No fund data available</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FundCompare;
