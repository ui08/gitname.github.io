// import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Apiurl } from "../../util/apiurl";
// import axiosInstance from "../../util/axiosInstance";
// import Loader from "../../util/Loader";
// import ButtonComp from "../ButtonComp/ButtonComp";
// import InputRadioGroup from "../ComponentsInput/InputRadioGroup";
// import StockAnalysisPage from "./StockAnalysisPage";
// import "./WatchListModal.scss";

// const WatchListPage = ({ userId, WATCHLISTindex, WATCHLISTdata }) => {
//   console.log(WATCHLISTindex, WATCHLISTdata);
//   const MAX_WATCHLISTS = 5; // Maximum allowed watchlists
//   const [loading, setLoading] = useState(false);
//   const [buttons, setButtons] = useState([]);
//   const [activeButtonIndex, setActiveButtonIndex] = useState(0);
//   const [watchlist, setWatchlist] = useState([]);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [selectedStocktype, setSelectedStocktype] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [page, setPage] = useState(1); // Pagination for API calls
//   const [hasMore, setHasMore] = useState(true); // Check if more data exists
//   const inputRef = useRef();
//   const dropdownRef = useRef();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [watchlistold, setWatchlistOld] = useState([]);
//   const [watchListType, setWatchlistType] = useState("mf");
//   // Function to fetch the watchlist data from the API
//   // const fetchWatchlistData = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axiosInstance.get(`${Apiurl.getAllWatchlist}`);
//   //     const watchListData = response.data;

//   //     if (watchListData && watchListData.length > 0) {
//   //       return watchListData;
//   //     }
//   //     setLoading(false);
//   //     return [];
//   //   } catch (error) {
//   //     console.error("Error fetching data: ", error);
//   //     setLoading(false);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Fetch the watchlist data when the component mounts
//   useEffect(() => {
//     if (buttons.length === 0) {
//       createWatchlists(0); // Ensure at least one button exists
//     }
//     fetchWatchlist(WATCHLISTdata);
//     setActiveButtonIndex(WATCHLISTindex - 1);
//   }, []);

//   // const fetchWatchlistCount = async () => {
//   //   try {
//   //     const response = await axiosInstance.get(Apiurl.watchlistCount);
//   //     // toast.success(t("Messages:UploadTemplate"));
//   //     if (!response.statusText == "OK")
//   //       throw new Error("Network response was not ok");
//   //     const result = await response.data;
//   //     console.log("length", result);
//   //     console.log("length", result.length);

//   //     createWatchlists(result.length, "default"); // Ensure at least one button exists
//   //   } catch (error) {
//   //   } finally {
//   //   }
//   // };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     trigger,
//     control,
//     watch,
//     getValues,
//   } = useForm({});
//   const useFromProps = {
//     register,
//     errors,
//     setValue,
//     trigger,
//     control,
//     watch,
//     getValues,
//   };

//   // Function to create new watchlist buttons
//   // const createWatchlists = (startingIndex, type) => {
//   //   console.log("startingIndex", startingIndex, type);

//   //   // Ensure we do not exceed the maximum allowed watchlists
//   //   if (type == "default" && startingIndex == 0) {
//   //     setButtons([{ label: "Watchlist 1", id: 0 }]); // Ensure at least one button is created
//   //     setActiveButtonIndex(0); // Set first button as active
//   //   } else if (type == "default") {
//   //     const newButtons = [];
//   //     setButtons([]);
//   //     for (let i = 0; i < startingIndex; i++) {
//   //       newButtons.push({
//   //         label: `Watchlist ${startingIndex + i + 1}`,
//   //         id: startingIndex + i,
//   //       });
//   //     }
//   //     setButtons((prevData) => [...prevData, ...newButtons]);
//   //   } else if (buttons.length < MAX_WATCHLISTS) {
//   //     const nextWatchlistIndex = startingIndex;

//   //     let newWatchlistBtn = {
//   //       label: `Watchlist ${nextWatchlistIndex + 1}`,
//   //       id: nextWatchlistIndex,
//   //     };
//   //     setButtons((prevData) => [...prevData, newWatchlistBtn]);
//   //   }
//   // };

//   // Handle "Add" button click event
//   const handleAddButtonClick = () => {
//     const currentWatchlistCount = buttons.length;
//     // Only add a new button if the number of buttons is less than the max
//     if (currentWatchlistCount < MAX_WATCHLISTS) {
//       // createWatchlists(currentWatchlistCount); // Create the next button
//     } else {
//       console.log("Maximum number of watchlists reached.");
//     }
//   };
//   const handleButtonClick = useCallback((index) => {
//     console.log("Maximum number of watchlists reached.", Number(index) + 1);
//     let rowIndex = Number(index) + 1;
//     setActiveButtonIndex(rowIndex);
//     fetchWatchlist(`WATCHLIST${rowIndex}`);
//   }, []);

//   const fetchWatchlist = async (fetchindex) => {
//     setLoading(true);
//     setWatchlist([]);
//     let repfetchindex;
//     try {
//       const response = await axiosInstance.get(
//         `${Apiurl.getWatchlistbyid}` + `${fetchindex}`
//       );
//       const watchListData = response.data;
//       setWatchlist([]);

//       Object.values(watchListData).map((item) => {
//         let SingleData = {
//           id: item.id,
//           stockName: item?.mfShortDescription || item?.stockName,
//           type: item.type,
//           isin: item.isin,
//         };
//         setWatchlist((prevData) => [...prevData, SingleData]);
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error("Login error: ", error);

//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchChange = useCallback(
//     (e) => {
//       // fetchWatchlistSearch(e.target.value);
//       const value = e.target.value;
//       setSearchTerm(value);
//       if (value.length > 2) {
//         // Reset everything when search term changes
//         setSuggestions([]);
//         setPage(1);
//         setHasMore(true);
//         fetchSuggestions(value, 1);
//       }
//     },
//     [searchTerm]
//   );
//   // API call to fetch suggestions
//   const fetchSuggestions = async (query, page) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `${Apiurl.watchListSearch}` + `${query}` + "&type=" + `${watchListType}`
//       );
//       const watchListData = response.data;
//       setSuggestions(watchListData);
//       setLoading(false);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWatchListType = (value) => {
//     setWatchlistType("");
//     setWatchlistType(value.target.value);
//   };

//   console.log("first", selectedStock);

//   const handleScroll = () => {
//     const bottom =
//       dropdownRef.current.scrollHeight ===
//       dropdownRef.current.scrollTop + dropdownRef.current.clientHeight;

//     if (bottom && !loading && hasMore) {
//       setPage((prev) => prev + 1);
//       fetchSuggestions(searchTerm, page + 1);
//     }
//   };

//   const handleClickStock = useCallback((value, type) => {
//     console.log(value, type);
//     setSelectedStock(value);
//     setSelectedStocktype(type);
//   }, []);

//   const handleDelete = () => {
//     setSelectedStock(null);
//     setSearchTerm("");
//     fetchWatchlist(`WATCHLIST${activeButtonIndex}`);
//     // fetchWatchlistData();
//   };

//   const deleteWatchList = async (id) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.delete(
//         `${Apiurl.removeWatchlist}` + id
//       );
//       setSelectedStock(null);

//       const watchListData = response.data;

//       fetchWatchlist(`WATCHLIST${WATCHLISTdata}`);
//       setLoading(false);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {!loading ? (
//         <>
//           {selectedStock ? (
//             <StockAnalysisPage
//               stock={selectedStock}
//               id={userId}
//               Transactionstype={selectedStocktype}
//               watchData={`WATCHLIST` + activeButtonIndex}
//               watchlistold={[]}
//               handleClose={handleDelete}
//             />
//           ) : (
//             <div>
//               <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
//                 <InputRadioGroup
//                   {...useFromProps}
//                   useForm={useForm}
//                   registerName="Stocks"
//                   type={"radio"}
//                   checked={watchListType === "mf" ? true : false}
//                   defaultValue="mf"
//                   labelName={<>Mutual Fund</>}
//                   id={"MF"}
//                   errorLabel={"radio Box"}
//                   onChange={(e) => handleWatchListType(e)}
//                 />
//                 <InputRadioGroup
//                   {...useFromProps}
//                   useForm={useForm}
//                   registerName="Stocks"
//                   type={"radio"}
//                   defaultValue="stock"
//                   checked={watchListType === "stock" ? true : false}
//                   labelName={<>Stocks</>}
//                   id={"Stocks"}
//                   errorLabel={"radio Box"}
//                   onChange={(e) => handleWatchListType(e)}
//                 />
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   {" "}
//                   <div className="tabs ">
//                     {buttons.map((btn, index) => (
//                       <button
//                         key={btn.id}
//                         // onClick={() => setActiveButtonIndex(index)}
//                         onClick={() => handleButtonClick(index)}
//                         className={
//                           activeButtonIndex === index
//                             ? "tabactive tab-button"
//                             : "tab-button"
//                         }
//                       >
//                         Watchlist {index + 1}
//                       </button>
//                     ))}
//                     <button
//                       className={
//                         buttons.length === 5
//                           ? "box_btn btn add-button"
//                           : "box_btn btn add-button"
//                       }
//                       onClick={handleAddButtonClick}
//                       disabled={buttons.length >= MAX_WATCHLISTS}
//                     >
//                       Add More
//                     </button>
//                   </div>
//                   <div className="search-bar-stock">
//                     <FontAwesomeIcon icon={faMagnifyingGlass} />
//                     <input
//                       type="text"
//                       ref={inputRef}
//                       value={searchTerm}
//                       placeholder={"Search for items..."}
//                       onChange={(e) => {
//                         handleSearchChange(e);
//                       }}
//                       className="search-input"
//                     />
//                     <button className="filter-button">
//                       <FontAwesomeIcon icon={faClose} />
//                     </button>
//                   </div>
//                   {searchTerm && (
//                     <div
//                       className="suggestions-dropdown"
//                       ref={dropdownRef}
//                       onScroll={handleScroll}
//                     >
//                       {suggestions.length > 0 ? (
//                         <>
//                           {suggestions.map((stock, index) => (
//                             <button
//                               key={index}
//                               className="listsearch_ul my-2 btn"
//                               onClick={() =>
//                                 handleClickStock({ ...stock }, "search")
//                               }
//                             >
//                               <span className="listsearch_ul_stockname">
//                                 {stock?.shortSchemeDescrip ||
//                                   stock?.stockName ||
//                                   stock?.schemeName}
//                               </span>
//                               {/* <span
//                                 className={`listsearch_ul_stockbadge ${
//                                   stock.type === "mf"
//                                     ? "badge-info"
//                                     : "badge-success"
//                                 }`}
//                               >
//                                 {stock?.type}
//                               </span> */}
//                             </button>
//                           ))}
//                         </>
//                       ) : (
//                         <p>No suggestions found</p>
//                       )}

//                       {loading && <p>Loading...</p>}
//                       {!hasMore && <p>No more suggestions</p>}
//                     </div>
//                   )}
//                   {watchlist.map((stock, index) => (
//                     <button
//                       key={index}
//                       className="listsearch_ul my-2 btn"
//                       onClick={() => handleClickStock({ ...stock }, "list")}
//                     >
//                       <span className="listsearch_ul_stockname">
//                         {stock?.shortSchemeDescrip || stock?.stockName}
//                       </span>
//                       <div className="d-flex">
//                         <span
//                           className={`listsearch_ul_stockbadge ${
//                             stock.type === "mf" ? "badge-info" : "badge-success"
//                           }`}
//                         >
//                           {stock?.type}
//                         </span>
//                         <ButtonComp
//                           wrapperName={"btn_wrapper "}
//                           type="button"
//                           btnStyle="round"
//                           btnText={"Delete"}
//                           onClick={() => deleteWatchList(stock?.id)}
//                         />
//                         {/* <button className="btn round_btn" onClick = {() => deleteWatchList(stock?.id)}>X</button> */}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default WatchListPage;
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import InputText from "../ComponentsInput/InputText";
import ErrorLoader from "../NewChartComponent/ErrorLoader";
import ButtonComp from "./../ButtonComp/ButtonComp";
import InputRadioGroup from "./../ComponentsInput/InputRadioGroup";
import Chartloader from "./../NewChartComponent/Chartloader";
import NoresultLoader from "./../NewChartComponent/NoresultLoader";
import AppModal from "./AppModal";
import StockAnalysisPage from "./StockAnalysisPage";
import "./WatchListModal.scss";
export default function WatchListModel({
  userId,
  WATCHLISTindex,
  WATCHLISTdata,
}) {
  const MAX_WATCHLISTS = 5; // Maximum allowed watchlists
  const [loading, setLoading] = useState(false);
  const [ChartDataloader, setChartDataloader] = useState("call");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStocktype, setSelectedStocktype] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1); // Pagination for API calls
  const [hasMore, setHasMore] = useState(true); // Check if more data exists
  const [modalTypech, setmodalTypech] = useState(true); // Check if more data exists

  const inputRef = useRef();
  const dropdownRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [watchListType, setWatchlistType] = useState("mf");
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
  } = useForm({});
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };

  const [buttons, setButtons] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [activebuttons, setActivebuttons] = useState();
  const [WATCHLISTfulldata, setWATCHLISTfulldata] = useState();

  useEffect(() => {
    // fetchWatchlist(buttons[activeIndex].name);
    // console.log("buttons delete", WATCHLISTdata);
    // setActivebuttons(
    //   buttons[activeIndex].name === WATCHLISTdata
    //     ? WATCHLISTdata
    //     : buttons[activeIndex].name
    // );
    fetchWatchlistCount();
  }, []);
  const fetchWatchlistCount = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.watchlistCount);
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;

      setWATCHLISTfulldata(result);
      if (result.length == 0) {
        setButtons([{ name: "Default" }]);
        setActiveIndex(0);

        fetchWatchlist("Default");

        setActivebuttons("Default");
      } else {
        setButtons([]);
        Object.values(result).map((item) => {
          let SingleData = {
            name: item.watchlistEnum,
          };
          // setButtons([{ name: "Default1" }]);
          setButtons((prev) => [...prev, SingleData]);
        });
        fetchWatchlist(WATCHLISTdata?.watchlistEnum);
        setActiveIndex(WATCHLISTindex - 1);
        setActivebuttons(WATCHLISTdata?.watchlistEnum);
      }
    } catch (error) {
    } finally {
    }
  };
  const openModal = (type, index = null) => {
    setModalType(type);
    setmodalTypech(true);
    setSelectedIndex(index);
    setInputValue(index !== null ? buttons[index]?.name : "");
    setModalOpen(true);

    setValue("ButtonName", index !== null ? buttons[index]?.name : "");
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputValue("");
    setModalType(null);
    setSelectedIndex(null);
    setmodalTypech(true);
  };

  const handleSave = () => {
    if (!inputValue.trim()) return;
    handleSaveWatchlist();
  };
  const handleBtnDelete = () => {
    handleSaveWatchlist();
  };

  const handleSaveWatchlist = async () => {
    let repfetchindex;
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getcheckUniqueName}` + `${inputValue}`
      );
      const watchListcheckData = response.data;
      if (watchListcheckData) {
        setmodalTypech(watchListcheckData);
        if (modalType === "add") {
          setButtons([...buttons, { name: inputValue.trim() }]);
          closeModal();
        } else if (modalType === "edit") {
          const newButtons = [...buttons];

          newButtons[selectedIndex].name = inputValue.trim();
          setButtons(newButtons);
          handleEDITWatchlist(buttons[selectedIndex].name);
        } else if (modalType === "delete") {
          if (
            modalType === "delete" &&
            selectedIndex !== null &&
            selectedIndex !== 0
          ) {
            const newButtons = buttons.filter((_, i) => i !== selectedIndex);
            if (activeIndex === selectedIndex) setActiveIndex(0);
            else if (activeIndex > selectedIndex)
              setActiveIndex((prev) => prev - 1);
            setButtons(newButtons);
          }
          closeModal();
        }
      } else {
        if (modalType === "delete") {
          handledeleteWatchlist();
        }
        setmodalTypech(watchListcheckData);
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
    }
  };
  const handleEDITWatchlist = async (Default) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.editWatchListName}` +
          `${Default}` +
          "&newName=" +
          `${inputValue}`
      );
      const watchListData = response.data;
      fetchWatchlist(buttons[activeIndex].name);
      closeModal();
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
    }
  };

  const handledeleteWatchlist = async () => {
    try {
      const response = await axiosInstance.delete(
        `${Apiurl.removeAllWatchlist}` + `${inputValue}`
      );
      const watchListData = response.data;
      if (
        modalType === "delete" &&
        selectedIndex !== null &&
        selectedIndex !== 0
      ) {
        const newButtons = buttons.filter((_, i) => i !== selectedIndex);
        if (activeIndex === selectedIndex) setActiveIndex(0);
        else if (activeIndex > selectedIndex)
          setActiveIndex((prev) => prev - 1);
        setButtons(newButtons);
      }
      fetchWatchlist(buttons[activeIndex].name);
      closeModal();
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
    }
  };
  const handleButtonClick = (index, btn) => {
    setActiveIndex(index);
    setActivebuttons(btn.name);
    fetchWatchlist(btn.name);
  };

  const handleWatchListType = (value) => {
    setWatchlistType("");
    setWatchlistType(value.target.value);
  };

  const fetchWatchlist = async (fetchindex) => {
    setWatchlist([]);
    setChartDataloader("call");
    let repfetchindex;
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getWatchlistbyid}` + `${fetchindex}`
      );
      const fetchwatchListData = response.data;
      setWatchlist([]);

      Object.values(fetchwatchListData).map((item) => {
        let SingleData = {
          id: item.id,
          stockName: item?.mfShortDescription || item?.stockName,
          type: item.type,
          isin: item.isin,
        };
        setWatchlist((prevData) => [...prevData, SingleData]);
      });
      setChartDataloader(fetchwatchListData ? "result" : "noresult");
    } catch (error) {
      console.error("Login error: ", error);
      setChartDataloader("error");
    } finally {
    }
  };

  const handleSearchChange = useCallback(
    (e) => {
      // fetchWatchlistSearch(e.target.value);
      const value = e.target.value;
      setSearchTerm(value);
      if (value.length > 2) {
        // Reset everything when search term changes
        setSuggestions([]);
        setPage(1);
        setHasMore(true);
        fetchSuggestions(value, 1);
      }
    },
    [searchTerm]
  );
  // API call to fetch suggestions
  const fetchSuggestions = async (query, page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.watchListSearch}` + `${query}` + "&type=" + `${watchListType}`
      );
      const watchListData = response.data;
      setSuggestions(watchListData);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  console.log("first", selectedStock);

  const handleScroll = () => {
    const bottom =
      dropdownRef.current.scrollHeight ===
      dropdownRef.current.scrollTop + dropdownRef.current.clientHeight;

    if (bottom && !loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchSuggestions(searchTerm, page + 1);
    }
  };

  const handleClickStock = useCallback((value, type) => {
    console.log("fetchWatchlistData", value, type);
    setSelectedStock(value);
    setSelectedStocktype(type);
  }, []);

  const handleDelete = (WATCHLISTData) => {
    setSelectedStock(null);
    setSearchTerm("");
    fetchWatchlist(WATCHLISTData);
    // fetchWatchlistData();
  };

  const deleteWatchList = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${Apiurl.removeWatchlist}` + id
      );
      setSelectedStock(null);

      const watchListData = response.data;

      fetchWatchlist(activebuttons);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  function pagemode() {
    const isEmptyData =
      !watchlist ||
      watchlist.length === 0 ||
      watchlist.every((item) => watchlist.y === 0);
    if (ChartDataloader === "call") {
      return <Chartloader type={"treemap"} />;
    } else if (ChartDataloader === "error") {
      return <ErrorLoader type={"treemap"}></ErrorLoader>;
    } else if (ChartDataloader === "result" && !isEmptyData) {
      return (
        <div className="mt-3">
          {watchlist.map((stock, index) => (
            <button
              key={index}
              className="listsearch_ul my-2 btn"
              onClick={() => handleClickStock({ ...stock }, "list")}
            >
              <span className="listsearch_ul_stockname">
                {stock?.shortSchemeDescrip || stock?.stockName}
              </span>
              <div className="d-flex align-items-center">
                <span
                  className={`listsearch_ul_stockbadge ${
                    stock.type === "mf" ? "badge-info" : "badge-success"
                  }`}
                >
                  {stock?.type}
                </span>
                <ButtonComp
                  wrapperName={"btn_wrapper "}
                  type="button"
                  btnStyle="round"
                  btnText={"Delete"}
                  onClick={() => deleteWatchList(stock?.id)}
                />
                {/* <button className="btn round_btn" onClick = {() => deleteWatchList(stock?.id)}>X</button> */}
              </div>
            </button>
          ))}
        </div>
      );
    } else if (ChartDataloader === "noresult" || isEmptyData) {
      return <NoresultLoader type={"treemap"}></NoresultLoader>;
    } else {
      return <Chartloader type={"treemap"} />;
    }
  }

  return (
    <>
      {!loading ? (
        <>
          {!modalOpen && (
            <>
              {" "}
              {selectedStock ? (
                <StockAnalysisPage
                  stock={selectedStock}
                  id={userId}
                  Transactionstype={selectedStocktype}
                  watchData={buttons[activeIndex].name}
                  watchlistold={watchlist}
                  handleClose={handleDelete}
                />
              ) : (
                <>
                  {" "}
                  <div className="row">
                    <div className="col-12 d-flex my-3 align-items-center">
                      {buttons?.map((btn, index) => (
                        <div
                          key={index}
                          className={
                            btn.name === activebuttons
                              ? "d-flex WATCHLISTSbuttons WATCHLISTSactivebuttons"
                              : "d-flex WATCHLISTSbuttons WATCHLISTSnormalbuttons"
                          }
                        >
                          <button
                            className="btnname"
                            onClick={() => handleButtonClick(index, btn)}
                          >
                            {btn.name}
                          </button>

                          <button
                            className="btnEdit"
                            onClick={() => openModal("edit", index)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>

                          {index !== 0 && (
                            <button
                              onClick={() => openModal("delete", index)}
                              className="btnDelete"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        className={
                          buttons?.length === 5
                            ? "box_btn btn add-button"
                            : "box_btn btn add-button"
                        }
                        onClick={() => openModal("add")}
                        disabled={buttons?.length >= MAX_WATCHLISTS}
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
                    <InputRadioGroup
                      {...useFromProps}
                      useForm={useForm}
                      registerName="Stocks"
                      type={"radio"}
                      checked={watchListType === "mf" ? true : false}
                      defaultValue="mf"
                      labelName={<>Mutual Fund</>}
                      id={"MF"}
                      errorLabel={"radio Box"}
                      onChange={(e) => handleWatchListType(e)}
                    />
                    <InputRadioGroup
                      {...useFromProps}
                      useForm={useForm}
                      registerName="Stocks"
                      type={"radio"}
                      defaultValue="stock"
                      checked={watchListType === "stock" ? true : false}
                      labelName={<>Stocks</>}
                      id={"Stocks"}
                      errorLabel={"radio Box"}
                      onChange={(e) => handleWatchListType(e)}
                    />
                  </div>
                  <div className="search-bar-stock my-3">
                    <input
                      type="text"
                      ref={inputRef}
                      value={searchTerm}
                      placeholder={"Search for items..."}
                      onChange={(e) => {
                        handleSearchChange(e);
                      }}
                      className="search-input"
                    />
                  </div>
                  {searchTerm && (
                    <div
                      className="suggestions-dropdown my-3"
                      ref={dropdownRef}
                      onScroll={handleScroll}
                    >
                      {suggestions.length > 0 ? (
                        <>
                          {suggestions.map((stock, index) => (
                            <button
                              key={index}
                              className="listsearch_ul my-2 btn"
                              onClick={() =>
                                handleClickStock({ ...stock }, "search")
                              }
                            >
                              <span className="listsearch_ul_stockname">
                                {stock?.shortSchemeDescrip ||
                                  stock?.stockName ||
                                  stock?.schemeName}
                              </span>
                              {/* <span
                         className={`listsearch_ul_stockbadge ${
                           stock.type === "mf"
                             ? "badge-info"
                             : "badge-success"
                         }`}
                       >
                         {stock?.type}
                       </span> */}
                            </button>
                          ))}
                        </>
                      ) : (
                        <p>No suggestions found</p>
                      )}

                      {loading && <p>Loading...</p>}
                      {!hasMore && <p>No more suggestions</p>}
                    </div>
                  )}
                  {pagemode()}
                </>
              )}
            </>
          )}
          <AppModal
            isOpen={modalOpen}
            onClose={closeModal}
            // handleActon={handleAction} // Ensure this is defined and passed correctly
            ModalTitle={
              modalType === "delete"
                ? "Delete Watchlist Name"
                : modalType === "add"
                ? "Add New Watchlist Name"
                : "Edit Watchlist Name"
            }
            Modalsize="xl"
            buttonConfigs={[]}
            ModalBody={
              // <p>You have been idle for some time. Do you want to continue?</p>
              <div className="row h-75">
                {modalType === "delete" ? (
                  <div className="row p-3   justify-content-center">
                    <div className="col-12">
                      <h3 className="modal-Deletetitle mb-3">Confirm Delete</h3>
                      <p className="modal-Deletetext">
                        {" "}
                        Are you sure you want to delete the watchlist name:{" "}
                        <span>{buttons[selectedIndex]?.name}</span> ?
                      </p>
                    </div>
                    <div className="col-md-5 col-12 mt-3">
                      <div className=" d-flex justify-content-evenly">
                        <ButtonComp
                          wrapperName={"btn_wrapper "}
                          type="button"
                          btnStyle="box"
                          btnText={"Delete"}
                          onClick={handleBtnDelete}
                        />

                        <ButtonComp
                          wrapperName={"btn_wrapper "}
                          type="button"
                          btnStyle="box"
                          btnText={"Cancel"}
                          onClick={closeModal}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row p-3   justify-content-center">
                      <div className="col-12 text-center">
                        <h3 className="modal-title mb-3">
                          {modalType === "add"
                            ? "Add New Watchlist"
                            : "Edit Watchlist Name"}
                        </h3>
                      </div>
                      <div className="col-8">
                        <InputText
                          {...useFromProps}
                          useForm={useForm}
                          readOnly={false}
                          disabled={false}
                          type="text"
                          labelName="Watchlist Name"
                          registerName={"ButtonName"}
                          name={"ButtonName"}
                          mandatory={true}
                          onPaste={false}
                          onCopy={false}
                          previewFlag={false}
                          onChange={(e) => {
                            setInputValue(e.target.value);
                          }}
                          // onInput={onFilterTextBoxChanged}
                          divClassName={"divClassName"}
                        />
                        {/* <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Button Name"
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "5px",
                      }}
                    /> */}
                      </div>

                      <div className="col-12">
                        {!modalTypech && (
                          <p className="modal-Deletetext">
                            <span>
                              This watchlist name already exists. Please choose
                              a different name.
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="col-md-5 col-12 mt-3">
                        <div className=" d-flex justify-content-evenly">
                          <ButtonComp
                            wrapperName={"btn_wrapper "}
                            type="button"
                            btnStyle="box"
                            btnText={"submit"}
                            onClick={handleSave}
                          />

                          <ButtonComp
                            wrapperName={"btn_wrapper "}
                            type="button"
                            btnStyle="box"
                            btnText={"Cancel"}
                            onClick={closeModal}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            }
            ModalType={"Watchlistbtn"}
            ModalScrollable={true}
            // ReactOdometervalue={seconds}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
