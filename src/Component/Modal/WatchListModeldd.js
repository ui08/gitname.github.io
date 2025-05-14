import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../../util/Loader";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import StockAnalysisPage from "./StockAnalysisPage";
import "./WatchListModal.scss";

const WatchListPage = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [watchdata, setWatchData] = useState(["Watchlist1"]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStocktype, setSelectedStocktype] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistold, setWatchlistOld] = useState([]);
  const [searchwatchlist, setsearchWatchlist] = useState([]);

  const [buttons, setButtons] = useState([{ label: "Watchlist 1", id: 1 }]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Pagination for API calls
  const [hasMore, setHasMore] = useState(true); // Check if more data exists
  const inputRef = useRef();
  const dropdownRef = useRef();

  // Function to add a new button to the list
  const addButton = () => {
    if (buttons.length < 5) {
      const newButton = {
        label: `Watchlist ${buttons.length + 1}`,
        id: `Watchlist` + buttons.length + 1,
      };
      setButtons([...buttons, newButton]);
    }
  };

  useEffect(() => {
    fetchWatchlist(activeButtonIndex);
    fetchgetAllWatchlist();
    return () => {};
  }, [activeButtonIndex]);

  const handleSearchChange = useCallback(
    (e) => {
      // fetchWatchlistSearch(e.target.value);
      const value = e.target.value;
      setSearchTerm(value);
      if (value.length > 3) {
        // Reset everything when search term changes
        setSuggestions([]);
        setPage(1);
        setHasMore(true);
        fetchSuggestions(value, 1);
      }
    },
    [searchTerm]
  );

  const handleClickStock = useCallback((value, type) => {
    setSelectedStock(value);
    setSelectedStocktype(type);
  }, []);

  const handleButtonClick = useCallback((index) => {
    setActiveButtonIndex(index);
    fetchWatchlist(index);
  }, []);
  // Function to set the active class on a button
  const fetchgetAllWatchlist = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.getAllWatchlist}`);
      const watchListData = response.data;

      setWatchlistOld(watchListData);
      getHighestWatchlistNumber(watchListData);
      setLoading(false);
    } catch (error) {
      console.error("Login error: ", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchWatchlist = async (index) => {
    setLoading(true);
    setWatchlist([]);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getWatchlistbyid}` + `WATCHLIST` + `${index + 1}`
      );
      const watchListData = response.data;
      setWatchlist([]);

      Object.values(watchListData).map((item) => {
        let SingleData = {
          id: item.id,
          stockName: item?.mfShortDescription || item?.stockName,
          type: item.type,
        };
        setWatchlist((prevData) => [...prevData, SingleData]);
      });
      setLoading(false);
    } catch (error) {
      console.error("Login error: ", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const filteredStocks = watchlist?.filter(
    (stock) =>
      stock?.stockName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock?.shortSchemeDescrip
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      stock?.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // API call to fetch suggestions
  const fetchSuggestions = async (query, page) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.watchListSearch}` + `${query}`
      );
      const watchListData = response.data;
      setsearchWatchlist(watchListData);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Handle search term change

  // Handle scroll event to trigger more API calls
  const handleScroll = () => {
    const bottom =
      dropdownRef.current.scrollHeight ===
      dropdownRef.current.scrollTop + dropdownRef.current.clientHeight;

    if (bottom && !loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchSuggestions(searchTerm, page + 1);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm, page);
    }
  }, [searchTerm, page]);

  const handleDelete = () => {
    setSelectedStock(null);
    setSearchTerm("");
    fetchWatchlist(activeButtonIndex);
    fetchgetAllWatchlist();
  };

  const getHighestWatchlistNumber = (data) => {
    // Extract the numeric part of the watchlistEnum and find the highest number
    const highestWatchlist = Math.max(
      ...data.map((item) =>
        parseInt(item.watchlistEnum.replace("WATCHLIST", ""))
      )
    );
    // setActiveButtonIndex(highestWatchlist - 1);
    // createWatchlists(highestWatchlist);
    console.log(highestWatchlist - 1);
    return highestWatchlist;
  };

  return (
    <>
      {!loading ? (
        <>
          {selectedStock ? (
            <StockAnalysisPage
              stock={selectedStock}
              id={userId}
              Transactionstype={selectedStocktype}
              watchData={`WATCHLIST` + (activeButtonIndex + 1)}
              watchlistold={watchlistold}
              handleClose={handleDelete}
            />
          ) : (
            <div className="col-12">
              <div className="">
                <div className="tabs ">
                  {" "}
                  {buttons.map((button, index) => (
                    <button
                      key={button.id}
                      className={
                        activeButtonIndex === index
                          ? "tabactive tab-button"
                          : "tab-button"
                      }
                      onClick={() => handleButtonClick(index)}
                    >
                      {button.label}
                    </button>
                  ))}
                  <button
                    className={
                      watchdata.length === 5
                        ? "box_btn btn add-button"
                        : "box_btn btn add-button"
                    }
                    onClick={() => {
                      addButton();
                    }}
                    disabled={buttons.length >= 5}
                  >
                    Add More
                  </button>
                </div>
              </div>

              <div className="search-bar-stock">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
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
                <button className="filter-button">
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              {searchTerm && (
                <div
                  className="suggestions-dropdown"
                  ref={dropdownRef}
                  onScroll={handleScroll}
                >
                  {searchwatchlist.length > 0 ? (
                    <>
                      {searchwatchlist.map((stock, index) => (
                        <button
                          key={index}
                          className="listsearch_ul my-2 btn"
                          onClick={() =>
                            handleClickStock({ ...stock }, "search")
                          }
                        >
                          <span className="listsearch_ul_stockname">
                            {stock?.shortSchemeDescrip || stock?.stockName}
                          </span>
                          <span
                            className={`listsearch_ul_stockbadge ${
                              stock.type === "mf"
                                ? "badge-info"
                                : "badge-success"
                            }`}
                          >
                            {stock?.type}
                          </span>
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

              <>
                {watchlist.map((stock, index) => (
                  <button
                    key={index}
                    className="listsearch_ul my-2 btn"
                    onClick={() => handleClickStock({ ...stock }, "list")}
                  >
                    <span className="listsearch_ul_stockname">
                      {stock?.shortSchemeDescrip || stock?.stockName}
                    </span>
                    <span
                      className={`listsearch_ul_stockbadge ${
                        stock.type === "mf" ? "badge-info" : "badge-success"
                      }`}
                    >
                      {stock?.type} <button className="btn round_btn">X</button>
                    </span>
                  </button>
                ))}
              </>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default WatchListPage;
