import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import {
  faAdd,
  faBoxArchive,
  faCartShopping,
  faCircleChevronLeft,
  faCircleChevronRight,
  faEye,
  faSitemap,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clients from "../../../assets/img/Clients.svg";
import Families from "../../../assets/img/Families.svg";
import RMs from "../../../assets/img/RM’s.svg";
import { ThemeChartcolormaste } from "../../../Component/ComponentsChart/ThemeChartcolormaste";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import WatchListPage from "../../../Component/Modal/WatchListModel";
import AppBarChartMulit from "../../../Component/NewChartComponent/AppBarChartMulit";
import ApppieDoughnutChart from "../../../Component/NewChartComponent/ApppieDoughnutChart";
import Chartloader from "../../../Component/NewChartComponent/Chartloader";
import {
  default as AppBarLineChart,
  default as AppComposedChart,
} from "../../../Component/NewChartComponent/ComposedChart";
import ErrorLoader from "../../../Component/NewChartComponent/ErrorLoader";
import NoresultLoader from "../../../Component/NewChartComponent/NoresultLoader";
import Pagehader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import {
  getsessionStorage,
  getUserFilterDetails,
  getUserId,
  setsessionStorage,
} from "../../../util/Authenticate";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import NewsSliderClient from "../NewsSliderClient";
import {
  decryptData,
  encrypt,
  encryptData,
} from "./../../../util/Authenticate/CryptoJS";
import "./RmDashbord.scss";

export default function Rmdashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("family");
  const [selectedOptioncard, setSelectedOptioncard] = useState("Families");

  const [fullname, setFullname] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [chartDataloader, setChartDataloader] = useState("result");
  const [watchlistCount, setWatchlistCount] = useState("");
  const [watchlistData, setWatchlistData] = useState([]);
  const [clientValueData, setClientValueData] = useState([]);
  const [aumLabels, setAUMLabels] = useState([]);
  const [aumValues, setAumValues] = useState([]);
  const [aumDataLabels, setAumDatalabels] = useState([]);
  const [aumDataLoader, setAUMDataLoader] = useState("call");
  const [aumData, setAumData] = useState("");
  const [rmData, setRMData] = useState("");
  const [rmDetailsLoader, setRMDetailsLoader] = useState("call");

  const [assetWiseAUMData, setAssetWiseAUMData] = useState([]);
  const [assetWiseAUMDataLoader, setAssetWiseAUMDataLoader] = useState("call");

  const [productWiseAUMData, setProductWiseAUMData] = useState([]);
  const [productWiseAUMDataLoader, setProductWiseAUMDataLoader] =
    useState("call");
  const [rowData, setRowData] = useState([]);
  const [rowDataLoader, setRowDataLoader] = useState("call");

  const [transactionProductData, setTransactionProductData] = useState([]);
  const [transactionProductDataLoader, setTransactionProductDataLoader] =
    useState("call");

  const [clientTotalAUMData, setClientTotalAUMData] = useState();
  const [clientTotalAUMDataLoader, setClientTotalAUMDataLoader] =
    useState("call");
  const [transactionAssetData, setTransactionAssetData] = useState([]);
  const [transactionAssetDataLoader, setTransactionAssetDataLoader] =
    useState("call");

  const [sipGraphData, setSipGraphData] = useState([
    {
      name: "Oct-24",
      TotalSIPBusiness: 158,
      TotalSIPValue: 35.2,
    },
    {
      name: "Nov-24",
      TotalSIPBusiness: 165,
      TotalSIPValue: 36.3,
    },
    {
      name: "Dec-24",
      TotalSIPBusiness: 170,
      TotalSIPValue: 39.6,
    },
    {
      name: "Jan-25",
      TotalSIPBusiness: 183,
      TotalSIPValue: 41.2,
    },
    {
      name: "Feb-25",
      TotalSIPBusiness: 190,
      TotalSIPValue: 42.5,
    },
    {
      name: "Mar-25",
      TotalSIPBusiness: 215,
      TotalSIPValue: 43.8,
    },
  ]);
  const [sipGraphDataLoader, setSipGraphDataLoader] = useState("call");
  const [watchlistCountData, setWatchlistCountData] = useState({});

  useEffect(() => {
    if (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true") {
      navigate(`/${encrypt("DashboardLandingPage")}`);
      window.location.reload();
    }
  }, [getsessionStorage(encrypt("Clienttorm"))]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    fetchAUMData();
    fetchRMData();
    fetchRelationshipDetailsByClient("family");
    fetchProductAllocationByRmId(getUserFilterDetails("rmAdvId"));
    fetchAllAssetAllocationByRmId(getUserFilterDetails("rmAdvId"));

    fetchTransactionsByAssetClass(getUserFilterDetails("rmAdvId"));
    fetchTransactionsByProductType(getUserFilterDetails("rmAdvId"));
    fetchAUMPerCategory(getUserFilterDetails("rmAdvId"));
    fetchWatchlist();

    // fetchAUMClientwise();
  }, []);

  const handleActivation = async (data) => {
    console.log("Clienttormid", data?.clientId);

    // Check if encrypt and encryptData work as expected
    const clienttormValue = encrypt("Clienttorm");
    const clienttormidValue = encrypt("ClienttormID");
    const clienttormnameValue = encrypt("ClienttormName");

    // Set values in sessionStorage
    setsessionStorage(clienttormValue, encryptData(true)); // "true" will be encrypted
    setsessionStorage(clienttormidValue, encryptData(data?.clientId));
    setsessionStorage(clienttormnameValue, encryptData(data?.name));

    // Navigate to the dashboard page
    navigate(`/${encrypt("DashboardLandingPage")}`);
    window.location.reload();
    console.log("setsessionStorage", data);
  };

  const handleOpenModal = (typeWatch, Watch) => {
    console.log("sanjaysetsessionStorage", typeWatch, Watch);
    setShowModal(true);
    setWatchlistCountData(Watch);
    setWatchlistCount(typeWatch);
    // navigate("/" + encrypt("WatchListModel"));
  };
  const handleCloseModal = () => {
    fetchWatchlist(), setShowModal(false);
  };

  const handleAction = () => {};

  const handleOptionChange = (event, cardname) => {
    setSelectedOption(event);
    setSelectedOptioncard(cardname);

    fetchRelationshipDetailsByClient(event);
  };

  // Array of card data
  const cardData = [
    {
      title: "Families",
      iconSrc: Families, // Replace with actual icon path
      value: "family",
      color: "#6076FA",
    },
    {
      title: "Clients",
      iconSrc: Clients,
      value: "client",
      color: "#FA60A9",
    },
    {
      title: "RM's",
      iconSrc: RMs,
      value: "rm",
      color: "#FFC444",
    },
    // {
    //   title: "Prospect",
    //   iconSrc: Prospect,
    //   value: "prospect",
    //   color: "#F36F56",
    // },
  ];

  const columnDefs = [
    {
      headerName:
        selectedOption == "family"
          ? "Family Name"
          : selectedOption == "client"
          ? "Client Name"
          : selectedOption == "rm"
          ? "RM Name"
          : "Prospect Name",
      field: "name",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "Total AUM",
      field: "currentValue",
      // cellRenderer: (params) =>
      //   AmountFormatterFunction(params.data.currentValue),

      sortable: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "AUM Held",
      field: "aumHeld",
      // cellRenderer: (params) => AmountFormatterFunction(params.data.aumHeld),
      sortable: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "AUM Held Away",
      field: "aumHeldAway",
      // cellRenderer: (params) =>
      //   AmountFormatterFunction(params.data.aumHeldAway),
      sortable: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Total Gain / Loss",
      field: "gainOrLoss",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Actions",
      minWidth: 250,
      field: "clientId",
      hide: true,
    },
    {
      headerName: "Actions",
      minWidth: 250,

      hide:
        selectedOption == "family"
          ? true
          : selectedOption == "client"
          ? false
          : selectedOption == "rm"
          ? true
          : true,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [{ label: "dashboard" }];

  const transactionAssetDataKeys = ["Purchase", "Redemption", "NetPurchase"];

  const transactionProductDataKeys = ["Purchase", "Redemption", "NetPurchase"];

  const getTableFunction = () => {
    // console.log("selectedOption", selectedOption);
    if (rowDataLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (rowDataLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (rowDataLoader === "result") {
      return (
        <div className="InformationTable">
          <AgTable
            columnKeys={columnDefs.field}
            columnDefs={columnDefs}
            rowData={rowData}
            filenames={`${selectedOptioncard}` + "_" + "Information"}
            StyleClass={"ag_export_btn ripple_btn"}
            downloadbtnstext={true}
            showDatePicker={false}
            // onSelectionChanged={onSelectionChangedContribution}
          />
        </div>
      );
    } else if (rowDataLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };

  const fetchAUMData = async () => {
    try {
      setAUMDataLoader("call");
      const response = await axiosInstance.get(Apiurl.aumData);
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;

      setAumValues([]);
      setAumData();
      const filteredData = result.data.filter(
        (item) => item.type === "heldAUM" || item.type === "heldAwayAUM"
      );

      Object.values(filteredData).map((item) => {
        let SingleData = {
          name: item.type === "heldAUM" ? "Held AUM" : "Held Away AUM",
          value: Number(item.value),
        };

        setAumValues((prevData) => [...prevData, SingleData]);
      });
      setAumData(response.data);
      setAUMDataLoader(result ? "result" : "noresult");
    } catch (error) {
      setAUMDataLoader("error");
    } finally {
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.watchlistCount);
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;

      setWatchlistData(result);
      setWatchlistCount(result.length);
    } catch (error) {
    } finally {
    }
  };

  const fetchRMData = async () => {
    try {
      setRMDetailsLoader("call");
      const response = await axiosInstance.get(Apiurl.rmDetails);
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setRMData(result);
      setRMDetailsLoader(result ? "result" : "noresult");
    } catch (error) {
      setRMDetailsLoader("error");
    } finally {
    }
  };

  const fetchRelationshipDetailsByClient = async (type) => {
    setRowDataLoader("call");
    try {
      const response = await axiosInstance.get(
        `${Apiurl.relationshipDetailsByClient}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      if (type == "rm") {
        setRowData(result.filter((item) => !item.headOffice));
      } else {
        setRowData(result);
      }
      getTableFunction();
      setRowDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      setRowDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };
  const fetchProductAllocationByRmId = async (type) => {
    setProductWiseAUMDataLoader("call");

    try {
      const response = await axiosInstance.get(
        `${Apiurl.getProductAllocationByRmId}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setProductWiseAUMData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          name: item.product,
          value: Number(item.percentageValue),
        };
        setProductWiseAUMData((prevData) => [...prevData, SingleData]);
      });
      setProductWiseAUMDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      setProductWiseAUMDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };
  const fetchAllAssetAllocationByRmId = async (type) => {
    setAssetWiseAUMDataLoader("call");

    try {
      const response = await axiosInstance.get(
        `${Apiurl.getAllAssetAllocationByRmId}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setAssetWiseAUMData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          name: item.description,
          value: Number(item.percentageValue),
        };
        setAssetWiseAUMData((prevData) => [...prevData, SingleData]);
      });

      setAssetWiseAUMDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      setAssetWiseAUMDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };
  const fetchTransactionsByAssetClass = async (type) => {
    setTransactionAssetDataLoader("call");
    setTransactionAssetData([]);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getTransactionsByAssetClass}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      // setTransactionAssetData(result);
      setTransactionAssetData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          name: item.name,
          Purchase: item.purchases,
          Redemption: item.redemptions,
          NetPurchase: item.netPurchases,
        };
        setTransactionAssetData((prevData) => [...prevData, SingleData]);
      });
      setTransactionAssetDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      setTransactionAssetDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };
  const fetchTransactionsByProductType = async (type) => {
    setTransactionProductDataLoader("call");
    setTransactionProductData([]);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getTransactionsByProductType}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      // (result);
      setTransactionProductData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          name: item.name,
          Purchase: item.purchases,
          Redemption: item.redemptions,
          NetPurchase: item.netPurchases,
        };
        setTransactionProductData((prevData) => [...prevData, SingleData]);
      });
      setTransactionProductDataLoader(
        result.length > 0 ? "result" : "noresult"
      );
    } catch (error) {
      setTransactionProductDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };
  const fetchAUMPerCategory = async (type) => {
    setClientTotalAUMDataLoader("call");
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getAUMPerCategory}${type}`
      );
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setClientTotalAUMData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          name: item.name,
          TotalClients: item.totalClint,
          TotalAUM: item.totalAum,
        };
        setClientTotalAUMData((prevData) => [...prevData, SingleData]);
      });

      setClientTotalAUMDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      setClientTotalAUMDataLoader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };

  //
  //
  //

  // const assetWiseAUMData = [
  //   {
  //     name: "Equity",
  //     value: 15.3,
  //   },
  //   {
  //     name: "Debt",
  //     value: 25.4,
  //   },
  //   {
  //     name: "Hybrid",
  //     value: 10.5,
  //   },

  //   {
  //     name: "Alternate",
  //     value: 6.8,
  //   },
  //   {
  //     name: "Liquid",
  //     value: 3.2,
  //   },
  // ];

  // const  = [
  //   {
  //     name: "Mutual Funds",
  //     value: 15.3,
  //   },
  //   {
  //     name: "PMS",
  //     value: 25.4,
  //   },
  //   {
  //     name: "AIF",
  //     value: 10.5,
  //   },

  //   {
  //     name: "Direct Equity",
  //     value: 6.8,
  //   },
  //   {
  //     name: "Bonds",
  //     value: 1.6,
  //   },
  //   {
  //     name: "Others",
  //     value: 1.6,
  //   },
  // ];

  //  ui div

  const fetchTotalFamilies = useCallback(
    (Datatype, Sec, DataLoader) => {
      console.log("filteredData ", aumData);
      if (DataLoader === "call") {
        return <Chartloader type={"Count"} />;
      } else if (DataLoader === "error") {
        return <ErrorLoader type={"Count"}></ErrorLoader>;
      } else if (DataLoader === "result") {
        let Datatypes = Datatype;
        return Sec === "total" ? (
          <span>
            {aumData?.[Datatypes] == 0 || aumData?.[Datatypes] == null
              ? 0
              : aumData?.[Datatypes]}
          </span>
        ) : (
          <span>
            {rmData?.[Datatypes] == 0 || rmData?.[Datatypes] == null
              ? 0
              : rmData?.[Datatypes]}
          </span>
        );
      } else if (DataLoader === "noresult") {
        return <NoresultLoader type={"Count"}></NoresultLoader>;
      } else {
        return <Chartloader type={"Count"} />;
      }
    },
    [aumData, rmData]
  );
  const handleTableFunction = (params, action) => {
    if (action === "handleActivation") {
      handleActivation(params.data);
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const gowatchToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % watchlistData.length); // Loop back to the first item
  };

  const gowatchToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + watchlistData.length) % watchlistData.length
    ); // Loop back to the last item
  };

  const currentwatchlists = useMemo(
    () => watchlistData[currentIndex],
    [watchlistData, currentIndex]
  );
  return (
    <>
      {loading ? (
        <Loader pagename="Dashboard" />
      ) : (
        <>
          {" "}
          <Pagehader
            pagename="Dashboard"
            getfullName={fullname}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
            showScroller={"true"}
          ></Pagehader>
          <div className="pagebody rm_Dashboard">
            <div className="row Rm_scr_content_1">
              {/* Main Tile Section */}
              <div className="col-12 col-md-4 reaumcharts_sidebar">
                {/* Total and Invest Values with Chart */}

                <div className="card-body">
                  <div className="mb-3 text-center">AUM Break up</div>

                  <div className="reaumcharts text-center">
                    <ApppieDoughnutChart
                      chartdata={aumValues}
                      ChartDataloader={aumDataLoader}
                      uint={"Cr"}
                      ChartLegend={true}
                      ChartColor={ThemeChartcolormaste.investmentChartData}
                    />
                  </div>

                  <div className="d-flex justify-content-evenly gap-3">
                    <div className="totaldivRM">
                      <p className="totalcardtext">Total Families</p>
                      <div className="divvalue">
                        <FontAwesomeIcon icon={faUserGroup} />
                        {fetchTotalFamilies(
                          "totalFamily",
                          "total",
                          aumDataLoader
                        )}
                      </div>
                    </div>
                    <div className="totaldivRM">
                      <p className="totalcardtext">Total Clients</p>
                      <div className="divvalue">
                        <FontAwesomeIcon icon={faUserGroup} />
                        {fetchTotalFamilies(
                          "totalClients",
                          "total",
                          aumDataLoader
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Range Input Section */}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className=" RMUndermeauto">
                  {/* RM Under me */}
                  <div className="RMUnderme my-auto">
                    <div className="Under">
                      <div className="Undericon">
                        <FontAwesomeIcon icon={faSitemap} />
                      </div>
                      <div className="UnderBox">
                        <span className="Underlable">RM Under me</span>
                        <span className="Undervalue">
                          {fetchTotalFamilies(
                            "rmUnderMeCount",
                            "Under",
                            rmDetailsLoader
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* New Revenue (MTD) */}
                  <div className="RMUnderme my-auto">
                    <div className="Under">
                      <div className="Undericon">
                        <FontAwesomeIcon icon={faBoxArchive} />
                      </div>
                      <div className="UnderBox">
                        <span className="Underlable">
                          Total Purchases (MTD)
                        </span>
                        <span className="Undervalue">
                          {" "}
                          {fetchTotalFamilies(
                            "totalPurchases",
                            "Under",
                            rmDetailsLoader
                          )}
                          {/* {rmData?.totalNetRevenue == 0 ||
                              rmData?.totalNetRevenue == null
                                ? 0
                                : rmData?.totalNetRevenue} */}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Net New Assets (MTD) (Held) */}
                  <div className="RMUnderme my-auto">
                    <div className="Under">
                      <div className="Undericon">
                        <FontAwesomeIcon icon={faWallet} />
                      </div>
                      <div className="UnderBox">
                        <span className="Underlable">
                          Redemptions
                        </span>
                        <span className="Undervalue">
                          {fetchTotalFamilies(
                            "redemptions",
                            "Under",
                            rmDetailsLoader
                          )}
                          {/* {rmData?.totalNetNewAssets == 0 ||
                              rmData?.totalNetNewAssets == null
                                ? 0
                                : rmData?.totalNetNewAssets} */}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Net New Assets (MTD) (Held) */}
                  <div className="RMUnderme my-auto">
                    <div className="Under">
                      <div className="Undericon">
                        <FontAwesomeIcon icon={faCartShopping} />
                      </div>
                      <div className="UnderBox">
                        <span className="Underlable">
                          Net Purchases
                        </span>
                        <span className="Undervalue">
                          {fetchTotalFamilies(
                            "netPurchase",
                            "Under",
                            rmDetailsLoader
                          )}
                          {/* {rmData?.totalNetNewAssets == 0 ||
                              rmData?.totalNetNewAssets == null
                                ? 0
                                : rmData?.totalNetNewAssets} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* News and Carousel Section */}
              <div className="col-12 col-md-4 p-0 ">
                {/* First News/Carousel Card */}
                <div className="NewsCarouselrm p-0">
                  {" "}
                  <NewsSliderClient />
                </div>
                <div className="card Watchlistcard">
                  {/* AddWatchlist */}
                  <div className="WatchlistcardValuediv">
                    {watchlistCount > 0 ? (
                      <>
                        <p className="Watchlistcardtext_name">View Watchlist</p>
                        <div className="Niftybox">
                          <div className="watchBox">
                            <>
                              <div className="watchoverlay">
                                <div className="watchnavigation">
                                  {currentIndex !== 0 && (
                                    <button
                                      className={`btn Previousbtn btn`}
                                      onClick={gowatchToPrevious}
                                    >
                                      <FontAwesomeIcon
                                        icon={faCircleChevronLeft}
                                        style={{
                                          color: "#38479B",
                                          fontSize: "2rem",
                                        }}
                                      />
                                    </button>
                                  )}

                                  <p
                                    onClick={() =>
                                      handleOpenModal(
                                        watchlistCount,
                                        currentwatchlists
                                      )
                                    }
                                  >
                                    {currentwatchlists.watchlistEnum}
                                  </p>

                                  <button
                                    className={`btn Nextbtn btn`}
                                    onClick={gowatchToNext}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCircleChevronRight}
                                      style={{
                                        color: "#38479B",
                                        fontSize: "2rem",
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="Watchlistcardtext_name">Add Watchlist</p>
                        <button
                          type="button"
                          className="btn Watchlistcardtext_btn"
                          onClick={() => handleOpenModal(0, "Default")}
                        >
                          <FontAwesomeIcon icon={faAdd} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-12 col-sm-12 col-md-12  ">
                <div className="row">
                  {cardData.map((card) => (
                    <div className={`col-12 col-md-4 p-0`} key={card.value}>
                      <button
                        className={`buttonGrocard `}
                        onClick={() =>
                          handleOptionChange(card.value, card.title)
                        }
                      >
                        <div
                          className={
                            card.value === selectedOption
                              ? `card dashbordcard btnGrocard active` +
                                selectedOption
                              : " card dashbordcard btnGrocard"
                          }
                        >
                          <div className="card-body dashbordcardTitle btnGrocardTitle p-2 card_desgn">
                            <div className="btnGrocardtext">
                              <div
                                className="icon"
                                style={{ color: `${card.color}` }}
                              >
                                {card.value === selectedOption ? (
                                  <FontAwesomeIcon icon={faCircleDot} />
                                ) : (
                                  <FontAwesomeIcon icon={faCircle} />
                                )}
                              </div>
                              <div
                                className="text"
                                style={{ color: `${card.color}` }}
                              >
                                {card.title}
                              </div>
                            </div>
                            <div className="btnGrovalue btn_desgn">
                              <img src={card.iconSrc} className="image_desgn" />
                              {/* <FontAwesomeIcon
                                icon={card.iconSrc}
                                style={{ color: `${card.color}` }}
                                size="2xl"
                              /> */}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-sm-12 col-md-12  Rm_screen_content_2">
                    <div
                      className={
                        `card rmdashbordcard Informationcard active` +
                        selectedOption
                      }
                    >
                      <div className="card-body dashbordcardTitle InformationcardValue">
                        {getTableFunction()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Table */}
            <div className="row my-3 ">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">Asset Wise AUM</div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <ApppieDoughnutChart
                        chartdata={assetWiseAUMData}
                        ChartDataloader={assetWiseAUMDataLoader}
                        uint={"%"}
                        ChartColor={
                          ThemeChartcolormaste.securityExposureChartcolor
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">Product wise AUM</div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <ApppieDoughnutChart
                        chartdata={productWiseAUMData}
                        ChartDataloader={productWiseAUMDataLoader}
                        uint={"%"}
                        ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-3 ">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">
                    Transactions By Asset Class
                  </div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <AppBarChartMulit
                        BarChart_data={transactionAssetData}
                        ChartDataloader={transactionAssetDataLoader}
                        Legendvalue={true}
                        uint={"cr"}
                        graphName={"transactionByProductType"}
                        selectedKeys={transactionAssetDataKeys}
                        ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">
                    Transaction By Product Type
                  </div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <AppBarChartMulit
                        BarChart_data={transactionProductData}
                        ChartDataloader={transactionProductDataLoader}
                        selectedKeys={transactionProductDataKeys}
                        Legendvalue={true}
                        uint={"cr"}
                        ChartColor={ThemeChartcolormaste.AssetWiseColor}
                        graphName={"transactionByProductType"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-3 ">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">
                    Client and Total AUM as per AUM Category
                  </div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <AppComposedChart
                        BarLineChart_data={clientTotalAUMData}
                        ChartDataloader={clientTotalAUMDataLoader}
                        graphName={"client"}
                        uint={"%"}
                        ChartColor={ThemeChartcolormaste.ProductWisePortfolio}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                <div className=" RmDashbord_card">
                  <div className="RmDashbord_card_header">SIP Business</div>
                  <div className="RmDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <AppBarLineChart
                        BarLineChart_data={sipGraphData}
                        ChartDataloader={"result"}
                        graphName={"sip"}
                        uint={"cr"}
                        ChartColor={ThemeChartcolormaste.assetPerformancecolor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <AppModal
        isOpen={showModal}
        onClose={handleCloseModal}
        handleActon={handleAction} // Ensure this is defined and passed correctly
        ModalTitle="Watch List"
        Modalsize="xl"
        buttonConfigs={[{ text: "Continue", icon: null, action: "continue" }]}
        ModalBody={
          // <p>You have been idle for some time. Do you want to continue?</p>
          <div className="row h-75">
            <WatchListPage
              userId={getUserId()}
              WATCHLISTindex={watchlistCount}
              WATCHLISTdata={watchlistCountData}
              WATCHLISTfulldata={watchlistData}
            />
          </div>
        }
        ModalType="Watchlist"
        ModalScrollable={true}
        // ReactOdometervalue={seconds}
      />
    </>
  );
}

function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          action: "handleActivation",
          show: true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}
