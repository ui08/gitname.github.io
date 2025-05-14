// Sidebar.js
import {
  faBuilding,
  faFileLines,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightArrowLeft,
  faBars,
  faBookBookmark,
  faBox,
  faBuildingCircleArrowRight,
  faChartPie,
  faDatabase,
  faFileArrowUp,
  faFingerprint,
  faHouseChimney,
  faJetFighterUp,
  faStar,
  faTimes,
  faUser,
  faUserGear,
  faUserPlus,
  faUsersGear,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { getsessionStorage, setsessionStorage } from "../util/Authenticate";
import RouteCurrentAuthorities from "../util/Authenticate/AuthorizedFunction";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../util/Authenticate/CryptoJS";
import AuthorizedFunction from "../util/Authenticate/currentRealmRole";
import { userRole } from "../util/Authenticate/Rolename";
import axiosInstance from "../util/axiosInstance";
import { Apiurl } from "./../util/apiurl";
import LogoutButton from "./../util/Authenticate/logout";
import "./sidebar.scss";

const SidebarComponent = () => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [suburrentUrl, setSubCurrentUrl] = useState("");
  const [urlDomain, setUrlDomain] = useState("");

  useEffect(() => {
    fetchUrl();
  }, []);

  const [collapsedvalue, setCollapsedvalue] = useState(true);

  const handleToggle = () => {
    setCollapsedvalue((prevValue) => !prevValue);
    if (collapsedvalue) {
      document.querySelector(".contentoverlay").classList.add("blur_body_bg");
      document.querySelector(".contentpagediv").classList.add("blur_body");
      document
        .querySelector(".contentoverlay")
        .classList.remove("noblur_body_bg");
    } else {
      document
        .querySelector(".contentoverlay")
        .classList.remove("blur_body_bg");
      document.querySelector(".contentpagediv").classList.remove("blur_body");

      document.querySelector(".contentoverlay").classList.add("noblur_body_bg");
    }
  };

  const [activeItemId, setActiveItemId] = useState(null); // Default active item ID
  const isExpanded = true;

  const handleMenuItemClick = (id) => {
    setActiveItemId();
    setActiveItemId(id);
    handlelogvalidate();
    setTimeout(() => {
      fetchUrl();
    }, 500);
  };
  const handlelogvalidate = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.logvalidate);
      const tokenData = response.data;

      // If token is valid, then call redirectingUserlogin
      if (tokenData) {
        await redirectingUserlogin("validate");
      } else {
        // If not valid, treat as invalid

        <LogoutButton
          logoutType={getsessionStorage(encrypt("Login_Type"))}
          logoutAction={"system"}
        />;
      }
    } catch (error) {
      <LogoutButton
        logoutType={getsessionStorage(encrypt("Login_Type"))}
        logoutAction={"system"}
      />;
    }
  };
  const redirectingUserlogin = async (valus) => {
    try {
      const response = await axiosInstance.get(Apiurl.Loginrefresh);
      const tokenData = response.data;

      if (tokenData) {
        setsessionStorage(encrypt("jwt-secret-app"), tokenData);
        if (valus === "validate") {
          window.location.reload();
        }
      }
      // console.log(tokenData);
    } catch (error) {
      console.error("Login error: ", error);
      setuservalidity("system");
      handleAutoLogout();
    } finally {
    }
  };
  //Fetch url
  const fetchUrl = () => {
    let urlElements = window.location.href.split("/");
    let urlElelement = urlElements[3];
    let urlElelement2 = urlElements[4];
    let urlElelement1 = urlElements[2];
    setUrlDomain(`${urlElelement1}`);
    setCurrentUrl(`${urlElelement}`);
    setSubCurrentUrl(decryptData(urlElelement2));
  };

  return (
    <div>
      <Sidebar
        className={collapsedvalue ? "no_blur" : "blur_bg"}
        height="100%"
        min-height="30rem"
        width="200px"
        collapsedWidth="4rem"
        color="$app_w_color"
        style={{
          height: "100%",
          top: "auto",
          border: 0,
          position: "sticky",
          padding: "0rem",
          margin: "0rem",
          zIndex: 9,
          minHeight: "30rem",
        }}
        collapsed={collapsedvalue}
        transitionDuration={800}
      >
        <div
          className={
            collapsedvalue ? "navbtn collapsedbvbar" : "navbtn collapsedbnotbar"
          }
        >
          <button type="button" onClick={handleToggle} className={"btn"}>
            <FontAwesomeIcon icon={collapsedvalue ? faBars : faTimes} />
          </button>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0 || level === 1) {
                return {
                  backgroundColor: active ? "#889BFF" : "",
                  color: "white",
                  borderRadius: active ? "10px" : null,

                  "&:hover": {
                    backgroundColor: "#889BFF",
                    color: "white",
                  },
                };
              }
            },
          }}
          collapsed={collapsedvalue}
          transitionDuration={500}
        >
          {AuthorizedFunction([
            "relationship_manager",
            "client",
            "operation_manager",
          ]) && (
            <MenuItem
              active={
                activeItemId === "DashboardLandingPage" ||
                currentUrl === encrypt("DashboardLandingPage")
              }
              icon={<FontAwesomeIcon icon={faHouseChimney} />}
              onClick={() => handleMenuItemClick("DashboardLandingPage")}
              component={<Link to={"/" + encrypt("DashboardLandingPage")} />}
              className="dflexMenu"
              title="Dashboard"
            >
              Home
            </MenuItem>
          )}
          {RouteCurrentAuthorities([
            userRole.Instrument_Master_Mutual_Funds_List,
            userRole.Instrument_Master_Direct_Equity_List,
            userRole.Instrument_Master_Bonds_List,
            userRole.Instrument_Master_Other_Products_Create,
            userRole.Instrument_Master_Other_Products_Edit,
            userRole.Instrument_Master_Other_Products_Details,
            userRole.Instrument_Master_Other_Products_Activate_DeActivate,
            userRole.Instrument_Master_Other_Products_Bulk_Upload,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faBookBookmark} />}
                title="Instrument"
                label="Instrument"
                active={
                  currentUrl === encrypt("DirectEquityList") ||
                  currentUrl === encrypt("MutualFundsList") ||
                  currentUrl === encrypt("BondsList") ||
                  currentUrl === encrypt("IMOtherProductListLanding") ||
                  currentUrl === encrypt("OtherProductFormComponent")
                }
              >
                {/*  Direct Equity */}
                {RouteCurrentAuthorities([
                  userRole.Instrument_Master_Direct_Equity_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("DirectEquityList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("IMDirectEquityListed")
                      }
                      component={
                        <Link to={"/" + encrypt("DirectEquityList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity"
                    >
                      Direct Equity
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Instrument_Master_Mutual_Funds_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("MutualFundsList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("IMMutualFunds")}
                      component={<Link to={"/" + encrypt("MutualFundsList")} />}
                      className="SubMenudflexMenu"
                      title="Mutual Funds"
                    >
                      Mutual Funds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Instrument_Master_Bonds_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("BondsList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("IMBonds")}
                      component={<Link to={"/" + encrypt("BondsList")} />}
                      className="SubMenudflexMenu"
                      title="Bonds"
                    >
                      Bonds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Instrument_Master_Other_Products_Create,
                  userRole.Instrument_Master_Other_Products_Edit,
                  userRole.Instrument_Master_Other_Products_Details,
                  userRole.Instrument_Master_Other_Products_Activate_DeActivate,
                  userRole.Instrument_Master_Other_Products_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("IMOtherProductListLanding") ||
                        currentUrl === encrypt("OtherProductFormComponent")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("IMInstrumentType")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("IMOtherProductListLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Other Products"
                    >
                      Other Products
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {/* Valuation Master */}
          {RouteCurrentAuthorities([
            userRole.Valuation_Master_Mutual_Funds_List,
            userRole.Valuation_Master_Direct_Equity_List,
            userRole.Valuation_Master_Bonds_List,
            userRole.Valuation_Master_Other_Products_Create,
            userRole.Valuation_Master_Other_Products_Edit,
            userRole.Valuation_Master_Other_Products_Details,
            userRole.Valuation_Master_Other_Products_Non_Unitized_Bulk_Upload,
            userRole.Valuation_Master_Other_Products_Unitized_Bulk_Upload,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faChartPie} />}
                title="Valuation"
                label="Valuation"
                active={
                  currentUrl === encrypt("VMDirectEquityList") ||
                  currentUrl === encrypt("VMMutualFundsList") ||
                  currentUrl === encrypt("VMBondsList") ||
                  currentUrl === encrypt("VMOtherProductListLanding") ||
                  currentUrl === encrypt("VMOtherProductFormComponent")
                }
              >
                {RouteCurrentAuthorities([
                  userRole.Instrument_Master_Direct_Equity_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("VMDirectEquityList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("VMDirectEquityListed")
                      }
                      component={
                        <Link to={"/" + encrypt("VMDirectEquityList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity Listed"
                    >
                      Direct Equity
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Valuation_Master_Mutual_Funds_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("VMMutualFundsList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("VMMutualFunds")}
                      component={
                        <Link to={"/" + encrypt("VMMutualFundsList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Mutual Funds"
                    >
                      Mutual Funds
                    </MenuItem>
                  )}

                {RouteCurrentAuthorities([
                  userRole.Valuation_Master_Bonds_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === "VMBondsList"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("VMBonds")}
                      component={<Link to={"/" + encrypt("VMBondsList")} />}
                      className="SubMenudflexMenu"
                      title="Bonds"
                    >
                      Bonds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Valuation_Master_Other_Products_Create,
                  userRole.Valuation_Master_Other_Products_Edit,
                  userRole.Valuation_Master_Other_Products_Details,
                  userRole.Valuation_Master_Other_Products_Non_Unitized_Bulk_Upload,
                  userRole.Valuation_Master_Other_Products_Unitized_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("VMOtherProductListLanding") ||
                        currentUrl === encrypt("VMOtherProductFormComponent")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("VMOtherProductType")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("VMOtherProductListLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Other Products"
                    >
                      Other Products
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {/*  Corporate Actions Master Master */}
          {RouteCurrentAuthorities([
            userRole.Corporate_Actions_Master_Direct_Equity_List,
            userRole.Coupon_Payments_Master_Bonds_List,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
                title="Corporate Action"
                label="Corporate Action"
                active={
                  currentUrl === encrypt("CADirectEquityList") ||
                  currentUrl === encrypt("CABondsList")
                }
              >
                {RouteCurrentAuthorities([
                  userRole.Corporate_Actions_Master_Direct_Equity_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("CADirectEquityList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("CAMDirectEquityListed")
                      }
                      component={
                        <Link to={"/" + encrypt("CADirectEquityList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity Master"
                    >
                      Direct Equity
                    </MenuItem>
                  )}

                {RouteCurrentAuthorities([
                  userRole.Coupon_Payments_Master_Bonds_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("CABondsList")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("CAMBonds")}
                      component={<Link to={"/" + encrypt("CABondsList")} />}
                      className="SubMenudflexMenu"
                      title="Bonds Coupon Master"
                    >
                      Bonds
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {RouteCurrentAuthorities([
            userRole.Client_Master_List,
            userRole.Client_Master_Bulk_Upload,
            userRole.Family_Master_Create,
            userRole.Family_Master_Edit,
            userRole.Family_Master_Details,
            userRole.Family_Master_Bulk_Upload,
            userRole.Family_Mapping_List,
            userRole.Family_Mapping_Bulk_Upload,
            userRole.Family_Unmap_Family_Head,
            userRole.Family_Unmap_Client,
            userRole.Family_Map,
            userRole.Family_Family_Head_Mapping_list,
            userRole.Family_Mapping_Change_Head,
            userRole.Client_RM_Mapping_List,
            userRole.Client_RM_Mapping_Bulk_Upload,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faUserTie} />}
                title="Client Masters"
                label="Client Masters"
                active={
                  currentUrl === encrypt("ClientMasterProductLanding") ||
                  currentUrl === encrypt("ClientMasterFormComponent") ||
                  currentUrl === encrypt("FamilyMasterFormComponent") ||
                  currentUrl === encrypt("FamilyMasterLanding") ||
                  currentUrl === encrypt("ClientMappingFormComponent") ||
                  currentUrl === encrypt("ClientMappingLanding")
                }
              >
                {RouteCurrentAuthorities([
                  userRole.Client_Master_List,
                  userRole.Client_Master_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("ClientMasterProductLanding") ||
                        currentUrl === encrypt("ClientMasterFormComponent")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("CMClientMaster")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("ClientMasterProductLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Client Master"
                    >
                      Client Master
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Family_Master_Create,
                  userRole.Family_Master_Edit,
                  userRole.Family_Master_Details,
                  userRole.Family_Master_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("FamilyMasterFormComponent") ||
                        currentUrl === encrypt("FamilyMasterLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("CMFamilyMaster")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("FamilyMasterLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Family Master"
                    >
                      Family Master
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Family_Mapping_List,
                  userRole.Family_Mapping_Bulk_Upload,
                  userRole.Family_Unmap_Family_Head,
                  userRole.Family_Unmap_Client,
                  userRole.Family_Map,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl ===
                          encrypt("FamilyClientMappingFormComponent") ||
                        currentUrl === encrypt("FamilyClientMappingLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("CMFamilyClientMapping")
                      }
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("FamilyClientMappingLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Family Client Mapping"
                    >
                      Family Client Mapping
                    </MenuItem>
                  )}

                {RouteCurrentAuthorities([
                  userRole.Family_Family_Head_Mapping_list,
                  userRole.Family_Mapping_Change_Head,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("ChangeFamilyHead")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("CMChangeFamilyHead")}
                      component={
                        <Link to={"/" + encrypt("ChangeFamilyHead")} />
                      }
                      className="SubMenudflexMenu"
                      title="Change Family Head"
                    >
                      Change Family Head
                    </MenuItem>
                  )}

                {RouteCurrentAuthorities([
                  userRole.Client_RM_Mapping_List,
                  userRole.Client_RM_Mapping_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("ClientMappingFormComponent") ||
                        currentUrl === encrypt("ClientMappingLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("CMClientMapping")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("ClientMappingLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Client RM Mapping"
                    >
                      Client RM Mapping
                    </MenuItem>
                  )}
              </SubMenu>
            )}

{/* {AuthorizedFunction(["operation_manager"]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <>
            
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={
                  <FontAwesomeIcon
                    icon={faArrowRightArrowLeft}
                    style={{ transform: "rotate(90deg)" }}
                  />
                }
                title="Transaction Upload Delete"
                label="Transaction Upload Delete"
                active={
                  currentUrl === encrypt("TransactionDirectEquityLandingDelete") ||
                  currentUrl === encrypt("TransactionBondsLandingDelete") ||
                  currentUrl === encrypt("TransactionMutualFundsLandingDelete") ||
                  currentUrl === encrypt("TransactionOtherProductLandingDelete")
                }
              >
                {RouteCurrentAuthorities([
                  // userRole.Transaction_Direct_Equity_Delete
                  userRole.Transaction_Direct_Equity_list
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionDirectEquityLandingDelete")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUDirectEquityDelete")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionDirectEquityLandingDelete") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity Delete"
                    >
                      Direct Equity Delete
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  // userRole.Transaction_Mutual_Funds_Delete,
                  userRole.Transaction_Mutual_Funds_list,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionMutualFundsLandingDelete")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUMutualFundsDelete")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionMutualFundsLandingDelete") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Mutual Funds Delete"
                    >
                      Mutual Funds Delete
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  // userRole.Transaction_Bonds_Delete,
                  userRole.Transaction_Bonds_List,
                  
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("TransactionBondsLandingDelete")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUBondsDelete")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionBondsLandingDelete") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Bonds Delete"
                    >
                      Bonds Delete
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  // userRole.Transaction_Other_Products_Delete,
                  userRole.Transaction_Other_Products_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionOtherProductLandingDelete")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUOtherProductsDelete")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionOtherProductLandingDelete") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Other Products Delete"
                    >
                      Other Products Delete
                    </MenuItem>
                  )}
              </SubMenu>
                </>
            )} */}

          {RouteCurrentAuthorities([
            userRole.Transaction_Direct_Equity_list,
            userRole.Transaction_Direct_Equity_Bulk_Upload,
            userRole.Transaction_Bonds_List,
            userRole.Transaction_Bonds_Bulk_Upload,
            userRole.Transaction_Mutual_Funds_list,
            userRole.Transaction_Mutual_Funds_Bulk_Upload,
            userRole.Transaction_Other_Products_List,
            userRole.Transaction_Other_Products_List,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={
                  <FontAwesomeIcon
                    icon={faArrowRightArrowLeft}
                    style={{ transform: "rotate(90deg)" }}
                  />
                }
                title="Transaction Upload"
                label="Transaction Upload"
                active={
                  currentUrl === encrypt("TransactionDirectEquityLanding") ||
                  currentUrl === encrypt("TransactionBondsLanding") ||
                  currentUrl === encrypt("TransactionMutualFundsLanding") ||
                  currentUrl === encrypt("TransactionOtherProductLanding")
                }
              >
                {RouteCurrentAuthorities([
                  userRole.Transaction_Direct_Equity_list,
                  userRole.Transaction_Direct_Equity_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionDirectEquityLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUDirectEquity")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionDirectEquityLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity"
                    >
                      Direct Equity
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Transaction_Mutual_Funds_list,
                  userRole.Transaction_Mutual_Funds_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionMutualFundsLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUMutualFunds")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionMutualFundsLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Mutual Funds"
                    >
                      Mutual Funds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Transaction_Bonds_List,
                  userRole.Transaction_Bonds_Bulk_Upload,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={currentUrl === encrypt("TransactionBondsLanding")}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUBonds")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionBondsLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Bonds"
                    >
                      Bonds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Transaction_Other_Products_List,
                  userRole.Transaction_Other_Products_List,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        currentUrl === encrypt("TransactionOtherProductLanding")
                      }
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("TFUOtherProducts")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("TransactionOtherProductLanding") +
                            `/${encryptData("List")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Other Products"
                    >
                      Other Products
                    </MenuItem>
                  )}
              </SubMenu>
            )}

          {RouteCurrentAuthorities([
            userRole.Product_Master_Create,
            userRole.Product_Master_Edit,
            userRole.Product_Master_Activate_DeActivate,
            userRole.Product_Master_Details,
            userRole.Product_Master_Delete,
            userRole.Transaction_Master_Create,
            userRole.Transaction_Master_Edit,
            userRole.Transaction_Master_Activate_DeActivate,
            userRole.Transaction_Master_Details,
            userRole.Transaction_Master_Delete,
            userRole.Asset_Class_Master_Activate_DeActivate,
            userRole.Asset_Class_Master_Create,
            userRole.Asset_Class_Master_Edit,
            userRole.Asset_Class_Master_Details,
            userRole.Asset_Class_Master_Delete,
            userRole.Direct_Equity_Industry_Sector,
            userRole.Mutual_Funds_Underlying_Holdings,
            userRole.SEBI_Category_Master_Mutual_Funds_list,
            userRole.Mutual_FundsIndustry_Sector,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faDatabase} />}
                title="Other Masters"
                label="Other Masters"
              >
                {RouteCurrentAuthorities([
                  userRole.Product_Master_Create,
                  userRole.Product_Master_Edit,
                  userRole.Product_Master_Activate_DeActivate,
                  userRole.Product_Master_Details,
                  userRole.Product_Master_Delete,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMProductTypeMaster"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("OMProductTypeMaster")}
                      component={
                        <Link to={"/" + encrypt("ProductTypeMasterList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Product Type Master"
                    >
                      Product Type Master
                    </MenuItem>
                  )}
                {/* )} */}
                {RouteCurrentAuthorities([
                  userRole.Transaction_Master_Create,
                  userRole.Transaction_Master_Edit,
                  userRole.Transaction_Master_Activate_DeActivate,
                  userRole.Transaction_Master_Details,
                  userRole.Transaction_Master_Delete,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMTransactionTypeMaster"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("OMTransactionTypeMaster")
                      }
                      component={
                        <Link to={"/" + encrypt("TransactionTypeMasterList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Transaction Type Master"
                    >
                      Transaction Type Master
                    </MenuItem>
                  )}
                {/* )} */}
                {RouteCurrentAuthorities([
                  userRole.Asset_Class_Master_Activate_DeActivate,
                  userRole.Asset_Class_Master_Create,
                  userRole.Asset_Class_Master_Edit,
                  userRole.Asset_Class_Master_Details,
                  userRole.Asset_Class_Master_Delete,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMAssetClassMaster"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("OMAssetClassMaster")}
                      component={<Link to={"/" + encrypt("AssetClassList")} />}
                      className="SubMenudflexMenu"
                      title="Asset Class Master"
                    >
                      Asset Class Master
                    </MenuItem>
                  )}
                {/* )} */}
                {RouteCurrentAuthorities([
                  userRole.SEBI_Category_Master_Mutual_Funds_list,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMSEBICategoryMaster"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("OMSEBICategoryMaster")
                      }
                      component={
                        <Link to={"/" + encrypt("SEBICategoryMasterList")} />
                      }
                      className="SubMenudflexMenu"
                      title="SEBI Category Master - Mutual Funds"
                    >
                      SEBI Category Master - Mutual Funds
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Mutual_Funds_Underlying_Holdings,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMMutualFunds"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("OMMutualFunds")}
                      component={
                        <Link
                          to={
                            "/" + encrypt("MutualFundsUnderlyingHoldingsList")
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Mutual Funds - Underlying Holdings"
                    >
                      Mutual Funds - Underlying Holdings
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Mutual_FundsIndustry_Sector,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMMutualFundsIndustrySectors"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() =>
                        handleMenuItemClick("OMMutualFundsIndustrySectors")
                      }
                      component={
                        <Link
                          to={"/" + encrypt("MutualFundsIndustrySectorsList")}
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Mutual Funds - Industry Sectors"
                    >
                      Mutual Funds - Industry Sectors
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Direct_Equity_Industry_Sector,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={activeItemId === "OMDirectEquity"}
                      icon={
                        <FontAwesomeIcon icon={faChartPie} className="d-none" />
                      }
                      onClick={() => handleMenuItemClick("OMDirectEquity")}
                      component={
                        <Link
                          to={"/" + encrypt("DirectEquityIndustrySectorsList")}
                        />
                      }
                      className="SubMenudflexMenu"
                      title="Direct Equity - Industry Sectors"
                    >
                      Direct Equity - Industry Sectors
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {/********************** Menu Starts for client ***********************/}
          {decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true" && (
            <>
              {" "}
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faFileLines} />}
                title="Client Reports"
                label="Client Reports"
              >
                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "ClientHoldingReport"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("ClientHoldingReport")}
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("ClientHoldingReport")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Holding Report"
                  >
                    Holding Report
                  </MenuItem>
                )}
                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "CapitalGainReport"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("CapitalGainReport")}
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("CapitalGainReport")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Capital Gain"
                  >
                    Capital Gain
                  </MenuItem>
                )}
                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "ClientTransactionReport"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() =>
                      handleMenuItemClick("ClientTransactionReport")
                    }
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("ClientTransactionReport")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Transaction Report"
                  >
                    Transaction Report
                  </MenuItem>
                )}

                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "ClientSummaryReports"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("ClientSummaryReports")}
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("ClientSummaryReports")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Summary Report"
                  >
                    Summary Report
                  </MenuItem>
                )}
                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "ClientXIRRReports"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("ClientSummaryReports")}
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("ClientXIRRReports")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title=" XIRR Report"
                  >
                    XIRR Report
                  </MenuItem>
                )}
                {decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                  "true" && (
                  <MenuItem
                    active={activeItemId === "Client360DegreeWealth"}
                    icon={
                      <FontAwesomeIcon icon={faFileLines} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("Client360DegreeWealth")}
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("ClientReportsComponent") +
                          `/${encryptData("Client360DegreeWealth")}`
                        }
                      />
                      // <Link
                      //   to={
                      //     "/" +
                      //     encrypt("Client360DegreeWealth")
                      //   }
                      // />
                    }
                    className="SubMenudflexMenu"
                    title="360 Degree Wealth"
                  >
                    360 Degree Wealth
                  </MenuItem>
                )}
              </SubMenu>
            </>
          )}
          {decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true" && (
            <MenuItem
              active={
                activeItemId === "RiskProfiling" ||
                currentUrl === encrypt("RiskProfiling")
              }
              icon={<FontAwesomeIcon icon={faUserGear} />}
              onClick={() => handleMenuItemClick("RiskProfiling")}
              component={<Link to={"/" + encrypt("RiskProfiling")} />}
              className="dflexMenu"
              title="Risk Profiling"
            >
              Risk Profiling
            </MenuItem>
          )}
          {/********************** Menu Starts for RM dashboard *******************/}{" "}
          {RouteCurrentAuthorities([
            userRole.Corporate_Reports,
            userRole.RM_Entity_Report,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                icon={
                  <FontAwesomeIcon
                    icon={faFileLines}
                    defaultCollapsed={true}
                    collapsed={!isExpanded}
                  />
                }
                title="Reports"
                label="Reports"
                className="dSubflexMenu"
                active={
                  activeItemId === "CorporateReports" ||
                  activeItemId === "EnitityReport" ||
                  currentUrl === encrypt("CorporateReports") ||
                  currentUrl === encrypt("EnitityReport")
                }
              >
                {/* {RouteCurrentAuthorities([userRole.Corporate_Reports]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        activeItemId === "CorporateReports" ||
                        currentUrl === encrypt("CorporateReports")
                      }
                      icon={<FontAwesomeIcon icon={faUsersGear} />}
                      onClick={() => handleMenuItemClick("CorporateReports")}
                      component={
                        <Link to={"/" + encrypt("CorporateReports")} />
                      }
                      className="SubMenudflexMenu"
                    >
                      {t("Common:App_lms_Common_00247")}
                    </MenuItem>
                  )} */}
                {RouteCurrentAuthorities([userRole.RM_Entity_Report]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        activeItemId === "EnitityReport" ||
                        currentUrl === encrypt("EnitityReport")
                      }
                      icon={<FontAwesomeIcon icon={faBuilding} />}
                      onClick={() => handleMenuItemClick("EnitityReport")}
                      component={
                        <Link
                          to={
                            "/" +
                            encrypt("EnitityReport") +
                            `/${encryptData("Family")}`
                          }
                        />
                      }
                      className="SubMenudflexMenu"
                    >
                      {t("Common:App_lms_Common_00248")}
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {RouteCurrentAuthorities([
            userRole.Fund_Analytics_Fund_Compare,
            userRole.Fund_Analytics_Fund_Overlap,
            userRole.Fund_Analytics_Sector_Holding,
            userRole.Fund_Analytics_Security_Holding,
            userRole.Fund_Analytics_Stcoks_Overlapping,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <>
                <SubMenu
                  className="MenuItem dSubflexMenu"
                  icon={<FontAwesomeIcon icon={faChartPie} />}
                  title="Fund Analytics"
                  label="Fund Analytics"
                >
                  {RouteCurrentAuthorities([
                    userRole.Fund_Analytics_Fund_Compare,
                  ]) &&
                    (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      "false" ||
                      decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                        undefined) && (
                      <MenuItem
                        active={activeItemId === "FundCompare"}
                        icon={
                          <FontAwesomeIcon
                            icon={faChartPie}
                            className="d-none"
                          />
                        }
                        onClick={() => handleMenuItemClick("FundCompare")}
                        component={
                          <Link
                            to={
                              "/" +
                              encrypt("FundAnalyticsComponent") +
                              `/${encryptData("FundCompare")}`
                            }
                          />
                        }
                        className="SubMenudflexMenu"
                        title="Fund Compare"
                      >
                        Fund Compare
                      </MenuItem>
                    )}
                  {RouteCurrentAuthorities([
                    userRole.Fund_Analytics_Fund_Overlap,
                  ]) &&
                    (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      "false" ||
                      decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                        undefined) && (
                      <MenuItem
                        active={activeItemId === "FundOverlap"}
                        icon={
                          <FontAwesomeIcon
                            icon={faChartPie}
                            className="d-none"
                          />
                        }
                        onClick={() => handleMenuItemClick("FundOverlap")}
                        component={
                          <Link
                            to={
                              "/" +
                              encrypt("FundAnalyticsComponent") +
                              `/${encryptData("FundOverlap")}`
                            }
                          />
                        }
                        className="SubMenudflexMenu"
                        title="Fund Overlap"
                      >
                        Fund Overlap
                      </MenuItem>
                    )}
                  {RouteCurrentAuthorities([
                    userRole.Fund_Analytics_Stcoks_Overlapping,
                  ]) &&
                    (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      "false" ||
                      decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                        undefined) && (
                      <MenuItem
                        active={activeItemId === "StocksOverlapping"}
                        icon={
                          <FontAwesomeIcon
                            icon={faChartPie}
                            className="d-none"
                          />
                        }
                        onClick={() => handleMenuItemClick("StocksOverlapping")}
                        component={
                          <Link
                            to={
                              "/" +
                              encrypt("FundAnalyticsComponent") +
                              `/${encryptData("StocksOverlapping")}`
                            }
                          />
                        }
                        className="SubMenudflexMenu"
                        title="Stocks Overlapping"
                      >
                        Stocks Overlapping
                      </MenuItem>
                    )}
                  {RouteCurrentAuthorities([
                    userRole.Fund_Analytics_Security_Holding,
                  ]) &&
                    (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      "false" ||
                      decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                        undefined) && (
                      <MenuItem
                        active={activeItemId === "SecurityHolding"}
                        icon={
                          <FontAwesomeIcon
                            icon={faChartPie}
                            className="d-none"
                          />
                        }
                        onClick={() => handleMenuItemClick("SecurityHolding")}
                        component={
                          <Link
                            to={
                              "/" +
                              encrypt("FundAnalyticsComponent") +
                              `/${encryptData("SecurityHolding")}`
                            }
                          />
                        }
                        className="SubMenudflexMenu"
                        title="Security Holding"
                      >
                        Security Holding
                      </MenuItem>
                    )}
                  {RouteCurrentAuthorities([
                    userRole.Fund_Analytics_Sector_Holding,
                  ]) &&
                    (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      "false" ||
                      decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                        undefined) && (
                      <MenuItem
                        active={activeItemId === "SectorHolding"}
                        icon={
                          <FontAwesomeIcon
                            icon={faChartPie}
                            className="d-none"
                          />
                        }
                        onClick={() => handleMenuItemClick("SectorHolding")}
                        component={
                          <Link
                            to={
                              "/" +
                              encrypt("FundAnalyticsComponent") +
                              `/${encryptData("SectorHolding")}`
                            }
                          />
                        }
                        className="SubMenudflexMenu"
                        title="Sector Holding"
                      >
                        Sector Holding
                      </MenuItem>
                    )}
                </SubMenu>
              </>
            )}
          {RouteCurrentAuthorities([
            userRole.User_Role_Create,
            userRole.User_Role_Edit,
            userRole.User_Role_Activate_DeActivate,
            userRole.User_Role_Details,
            userRole.User_Role_Delete,
            userRole.Access_Mapping_update,
            userRole.Access_Mapping_Activate_DeActivate,
            userRole.Access_Mapping_Edit,
            userRole.Access_Mapping_Delete,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <SubMenu
                className="MenuItem dSubflexMenu"
                icon={
                  <FontAwesomeIcon
                    icon={faUserGear}
                    defaultCollapsed={true}
                    collapsed={!isExpanded}
                  />
                }
                active={
                  activeItemId === "UploadsComponent" ||
                  currentUrl === encrypt("UploadsComponent") ||
                  currentUrl === encrypt("AccessRightMasterList") ||
                  activeItemId === "AccessRightMasterFormComponent" ||
                  currentUrl === encrypt("UserRoleMasterList") ||
                  currentUrl === encrypt("UserRoleMasterFormComponent")
                }
                title="User Access Right"
                label="User Access Right"
              >
                {RouteCurrentAuthorities([
                  userRole.User_Role_Create,
                  userRole.User_Role_Edit,
                  userRole.User_Role_Activate_DeActivate,
                  userRole.User_Role_Details,
                  userRole.User_Role_Delete,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        activeItemId === "UserRoleMasterList" ||
                        currentUrl === encrypt("UserRoleMasterList") ||
                        currentUrl === encrypt("UserRoleMasterFormComponent")
                      }
                      icon={
                        <FontAwesomeIcon
                          icon={faFileArrowUp}
                          className="d-none"
                        />
                      }
                      onClick={() =>
                        handleMenuItemClick("UploadsComponentHolding")
                      }
                      component={
                        <Link to={"/" + encrypt("UserRoleMasterList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Holding"
                    >
                      User Role Master
                    </MenuItem>
                  )}
                {RouteCurrentAuthorities([
                  userRole.Access_Mapping_update,
                  userRole.Access_Mapping_Activate_DeActivate,
                  userRole.Access_Mapping_Edit,
                  userRole.Access_Mapping_Delete,
                ]) &&
                  (decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                    "false" ||
                    decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                      undefined) && (
                    <MenuItem
                      active={
                        activeItemId === "AccessRightMasterFormComponent" ||
                        suburrentUrl === "AccessRightMasterList"
                      }
                      icon={
                        <FontAwesomeIcon
                          icon={faFileArrowUp}
                          className="d-none"
                        />
                      }
                      onClick={() =>
                        handleMenuItemClick("AccessRightMasterList")
                      }
                      component={
                        <Link to={"/" + encrypt("AccessRightMasterList")} />
                      }
                      className="SubMenudflexMenu"
                      title="Holding Underlying"
                    >
                      Access Right Mapping
                    </MenuItem>
                  )}
              </SubMenu>
            )}
          {RouteCurrentAuthorities([
            userRole.User_Create,
            userRole.User_Edit,
            userRole.User_Activate_DeActivate,
            userRole.User_Details,
            userRole.User_Bulk_Upload,
            userRole.User_Delete,
          ]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <MenuItem
                active={
                  activeItemId === "UserCreation" ||
                  currentUrl === encrypt("UserCreationListLanding") ||
                  currentUrl === encrypt("UserCreationFormComponent")
                }
                icon={<FontAwesomeIcon icon={faUserPlus} />}
                onClick={() => handleMenuItemClick("UserCreation")}
                component={
                  <Link
                    to={
                      "/" +
                      encrypt("UserCreationListLanding") +
                      `/${encryptData("List")}`
                    }
                  />
                }
                className="dflexMenu"
                title="User Creation"
              >
                User Creation
              </MenuItem>
            )}
          {AuthorizedFunction(["operation_manager"]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <>
                <SubMenu
                  className="MenuItem dSubflexMenu"
                  icon={<FontAwesomeIcon icon={faStar} />}
                  // icon={<img src={Icon3} />}

                  title="Incentive"
                  label="Incentive"
                  active={
                    currentUrl === encrypt("IncentiveRateUploadLanding") ||
                    currentUrl === encrypt("IncentiveReportListLanding")
                  }
                >
                  {/*  Incentive */}

                  <MenuItem
                    active={
                      currentUrl === encrypt("IncentiveRateUploadLanding")
                    }
                    icon={
                      <FontAwesomeIcon icon={faChartPie} className="d-none" />
                    }
                    onClick={() =>
                      handleMenuItemClick("IncentiveRateUploadLanding")
                    }
                    component={
                      <Link to={"/" + encrypt("IncentiveRateUploadLanding")} />
                    }
                    className="SubMenudflexMenu"
                    title="Rate Upload"
                  >
                    Rate Upload
                  </MenuItem>

                  <MenuItem
                    active={
                      currentUrl === encrypt("IncentiveReportListLanding")
                    }
                    icon={
                      <FontAwesomeIcon icon={faChartPie} className="d-none" />
                    }
                    onClick={() =>
                      handleMenuItemClick("IncentiveReportListLanding")
                    }
                    component={
                      <Link
                        to={
                          "/" +
                          encrypt("IncentiveReportListLanding") +
                          `/${encryptData("Firm")}`
                        }
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Rate Upload"
                  >
                    Firm Level Report
                  </MenuItem>

                  <MenuItem
                    active={currentUrl === encrypt("IncentiveRMLanding")}
                    icon={
                      <FontAwesomeIcon icon={faChartPie} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("IncentiveRMLanding")}
                    component={
                      <Link to={"/" + encrypt("IncentiveRMLanding")} />
                    }
                    className="SubMenudflexMenu"
                    title="Report"
                  >
                    RM Report
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  className="MenuItem dSubflexMenu"
                  icon={<FontAwesomeIcon icon={faBox} />}
                  // icon={<img src={Icon2} />}

                  title="Receivable"
                  label="Receivable"
                  active={
                    currentUrl === encrypt("CommissionUploadMasterLanding") ||
                    currentUrl === encrypt("CommissionReceivableReport")
                  }
                >
                  {/*  Incentive */}

                  {/*  Incentive */}

                  <MenuItem
                    active={
                      currentUrl === encrypt("CommissionUploadMasterLanding")
                    }
                    icon={
                      <FontAwesomeIcon icon={faChartPie} className="d-none" />
                    }
                    onClick={() =>
                      handleMenuItemClick("CommissionUploadMasterLanding")
                    }
                    component={
                      <Link
                        to={"/" + encrypt("CommissionUploadMasterLanding")}
                      />
                    }
                    className="SubMenudflexMenu"
                    title="Commission Upload Master"
                  >
                    Commission Upload Master
                  </MenuItem>

                  <MenuItem
                    active={
                      currentUrl === encrypt("CommissionReceivableReport")
                    }
                    icon={
                      <FontAwesomeIcon icon={faChartPie} className="d-none" />
                    }
                    onClick={() =>
                      handleMenuItemClick("CommissionReceivableReport")
                    }
                    component={
                      <Link to={"/" + encrypt("CommissionReceivableReport")} />
                    }
                    className="SubMenudflexMenu"
                    title="Commission Receivable Report"
                  >
                    Commission Receivable Report
                  </MenuItem>
                </SubMenu>

                <SubMenu
                  className="MenuItem dSubflexMenu"
                  icon={<FontAwesomeIcon icon={faPaperPlane} />}
                  // icon={<img src={Icon2} />}

                  title="Payable"
                  label="Payable"
                  active={
                    currentUrl === encrypt("PayableDefineLanding") ||
                    currentUrl === encrypt("PayableReportLanding")
                  }
                >
                  <MenuItem
                    active={currentUrl === encrypt("PayableDefineLanding")}
                    icon={
                      <FontAwesomeIcon icon={faPaperPlane} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("PayableDefineLanding")}
                    component={
                      <Link to={"/" + encrypt("PayableDefineLanding")} />
                    }
                    className="SubMenudflexMenu"
                    title="Define"
                  >
                    Define
                  </MenuItem>

                  <MenuItem
                    active={currentUrl === encrypt("PayableReportLanding")}
                    icon={
                      <FontAwesomeIcon icon={faPaperPlane} className="d-none" />
                    }
                    onClick={() => handleMenuItemClick("PayableReportLanding")}
                    component={
                      <Link to={"/" + encrypt("PayableReportLanding")} />
                    }
                    className="SubMenudflexMenu"
                    title="Report"
                  >
                    Report
                  </MenuItem>
                </SubMenu>
              </>
            )}
          {AuthorizedFunction(["super_admin"]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <>
                {/* Access Right */}

                <SubMenu
                  className="MenuItem dSubflexMenu"
                  icon={
                    <FontAwesomeIcon
                      icon={faFingerprint}
                      defaultCollapsed={true}
                      collapsed={!isExpanded}
                    />
                  }
                  active={
                    activeItemId === "UserSessions" ||
                    (currentUrl === encrypt("UserSessions")) |
                      (activeItemId === "Rolepermission") ||
                    currentUrl === encrypt("Rolepermission")
                  }
                  title="Admin "
                  label="Admin "
                >
                  <MenuItem
                    active={
                      activeItemId === "Rolepermission" ||
                      currentUrl === "Rolepermission"
                    }
                    icon={
                      <FontAwesomeIcon
                        icon={faJetFighterUp}
                        className="d-none"
                      />
                    }
                    onClick={() => handleMenuItemClick("Rolepermission")}
                    component={<Link to={"/" + encrypt("Rolepermission")} />}
                    className="SubMenudflexMenu"
                    title="Rolepermission"
                  >
                    Role permission
                  </MenuItem>
                  {/* CLIENT_MASTER_BULK_UPLOAD */}
                  <MenuItem
                    active={
                      activeItemId === "UserSessions" ||
                      suburrentUrl === "UserSessions"
                    }
                    icon={
                      <FontAwesomeIcon
                        icon={faFileArrowUp}
                        className="d-none"
                      />
                    }
                    onClick={() => handleMenuItemClick("UserSessions")}
                    component={<Link to={"/" + encrypt("UserSessions")} />}
                    className="SubMenudflexMenu"
                    title="UserSessions"
                  >
                    User Sessions
                  </MenuItem>
                </SubMenu>
              </>
            )}
          {AuthorizedFunction(["relationship_manager"]) &&
            (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "false" ||
              decryptData(getsessionStorage(encrypt("Clienttorm"))) ==
                undefined) && (
              <>
                <MenuItem
                  active={
                    activeItemId === "RiskProfileAdvisorMain" ||
                    currentUrl === encrypt("RiskProfileAdvisorMain")
                  }
                  icon={<FontAwesomeIcon icon={faUser} />}
                  onClick={() => handleMenuItemClick("RiskProfileAdvisorMain")}
                  component={
                    <Link to={"/" + encrypt("RiskProfileAdvisorMain")} />
                  }
                  className="dflexMenu"
                  title="RM Risk Master"
                >
                  RM Risk Master
                </MenuItem>
              </>
            )}
          <>
            {/* Instrument Master */}

            {/* <SubMenu
                className="MenuItem dSubflexMenu"
                icon={<FontAwesomeIcon icon={faSheetPlastic} />}
                title="Factsheets"
                label="Factsheets"
                active={
                  currentUrl === encrypt("FactsheetBondsList") ||
                  currentUrl === encrypt("FactsheetDirectEquityList") ||
                  currentUrl === encrypt("FactsheetMutualFundsList")
                }
              >
                <MenuItem
                  active={currentUrl === encrypt("FactsheetDirectEquityList")}
                  icon={
                    <FontAwesomeIcon icon={faChartPie} className="d-none" />
                  }
                  onClick={() => handleMenuItemClick("FactsheetsDirectEquity")}
                  component={
                    <Link to={"/" + encrypt("FactsheetDirectEquityList")} />
                  }
                  className="SubMenudflexMenu"
                  title="Direct Equity"
                >
                  Direct Equity
                </MenuItem>
                <MenuItem
                  active={currentUrl === encrypt("FactsheetBondsList")}
                  icon={
                    <FontAwesomeIcon icon={faChartPie} className="d-none" />
                  }
                  onClick={() => handleMenuItemClick("FactsheetsBonds")}
                  component={<Link to={"/" + encrypt("FactsheetBondsList")} />}
                  className="SubMenudflexMenu"
                  title="Bonds"
                >
                  Bonds
                </MenuItem>
                <MenuItem
                  active={currentUrl === encrypt("FactsheetMutualFundsList")}
                  icon={
                    <FontAwesomeIcon icon={faChartPie} className="d-none" />
                  }
                  onClick={() => handleMenuItemClick("FactsheetsMutualFunds")}
                  component={
                    <Link to={"/" + encrypt("FactsheetMutualFundsList")} />
                  }
                  className="SubMenudflexMenu"
                  title="Mutual Funds"
                >
                  Mutual Funds
                </MenuItem>
              </SubMenu> */}
          </>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;

SidebarComponent.propTypes = {
  collapsedvalue: PropTypes.any,
};
