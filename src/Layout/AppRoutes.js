import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import WatchListModal from "../Component/Modal/WatchListModel";
import ClientReportsComponent from "../page/ClientReportsComponent/ClientReportsComponent";
import ClientDashboard from "../page/Dashboard/ClientDashboard/ClientDashboard";
import DashboardLandingPage from "../page/Dashboard/DashboardLandingPage";
import FundAnalyticsComponent from "../page/FundAnalytics/FundAnalyticsComponent";
import BondsFormComponent from "../page/InstrumentMaster/Bonds/BondsFormCompoent";
import BondsList from "../page/InstrumentMaster/Bonds/BondsList";
import CreateInstrumentFormComponent from "../page/InstrumentMaster/CreateInstrument/CreateInstrumentFormCompoent";
import CreateInstrumentLanding from "../page/InstrumentMaster/CreateInstrument/CreateInstrumentLanding";
import CreditRatingFormComponent from "../page/InstrumentMaster/CreditRating/CreditRatingFormComponent";
import CreditRatingList from "../page/InstrumentMaster/CreditRating/CreditRatingList";
import SectorList from "../page/InstrumentMaster/CreditRating/Sector/SectorList";
import SectorListFormComponent from "../page/InstrumentMaster/CreditRating/Sector/SectorListFormComponet";
import DirectEquityFormComponent from "../page/InstrumentMaster/DirectEquity/DirectEquityFormCompoent";
import DirectEquityList from "../page/InstrumentMaster/DirectEquity/DirectEquityList";
import InstrumentCategoryFormComponent from "../page/InstrumentMaster/InstrumentCategory/InstrumentCategoryFormComponent";
import InstrumentCategoryList from "../page/InstrumentMaster/InstrumentCategory/InstrumentCategoryList";
import InstrumentTypeFormComponent from "../page/InstrumentMaster/InstrumentType/InstrumentTypeFormComponent";
import InstrumentTypeList from "../page/InstrumentMaster/InstrumentType/InstrumentTypeList";
import MutualFundsFormComponent from "../page/InstrumentMaster/MutualFunds/MutualFundsFormCompoent";
import MutualFundsList from "../page/InstrumentMaster/MutualFunds/MutualFundsList";
import IMOtherProductListLanding from "../page/InstrumentMaster/OtherProduct/IMOtherProductListLanding";
import OtherProductFormComponent from "../page/InstrumentMaster/OtherProduct/OtherProductFormComponent";
import AssetClassFormComponent from "../page/OtherMaster/AssetClass/AssetClassFormComponent";
import AssetClassList from "../page/OtherMaster/AssetClass/AssetClassList";
import RiskProfiling from "../page/RiskProfiling/RiskProfiling";
import UnderConstruction from "../page/UnderConstruction";
import UploadsComponent from "../page/Uploads/UploadsComponent";
import { encrypt } from "../util/Authenticate/CryptoJS";
import CorporateReports from "./../page/CorporateReports/CorporateReports";
import EnitityReport from "./../page/EnitityReport/EnitityReport";
import Loader from "./../util/Loader";
{
  /* Instrument Master */
}

import VMBondsFormComponent from "../page/ValuationMaster/Bonds/VMBondsFormCompoent";
import VMBondsList from "../page/ValuationMaster/Bonds/VMBondsList";
import VMDirectEquityFormComponent from "../page/ValuationMaster/DirectEquity/VMDirectEquityFormCompoent";
import VMDirectEquityList from "../page/ValuationMaster/DirectEquity/VMDirectEquityList";
import VMMutualFundsFormComponent from "../page/ValuationMaster/MutualFunds/VMMutualFundsFormCompoent";
import VMMutualFundsList from "../page/ValuationMaster/MutualFunds/VMMutualFundsList";
import VMOtherProductFormComponent from "../page/ValuationMaster/OtherProduct/VMOtherProductFormComponent";

import CABondsFormComponent from "../page/CorporateActionMaster/Bonds/CABondsFormCompoent";
import CABondsList from "../page/CorporateActionMaster/Bonds/CABondsList";
import CADirectEquityFormComponent from "../page/CorporateActionMaster/DirectEquity/CADirectEquityFormCompoent";
import CADirectEquityList from "../page/CorporateActionMaster/DirectEquity/CADirectEquityList";
import BondsLanding from "../page/Transaction/Bonds/BondsLanding";

//Transaction
import TransactionBondsFormComponent from "../page/Transaction/Bonds/BondsFormCompoent";
import TransactionBondsLanding from "../page/Transaction/Bonds/BondsLanding";
import TransactionDirectEquityFormComponent from "../page/Transaction/DirectEquity/TransactionDirectEquityFormCompoent";
import TransactionDirectEquityLanding from "../page/Transaction/DirectEquity/TransactionDirectEquityLanding";
import TransactionMutualFundsFormComponent from "../page/Transaction/MutualFunds/TransactionMutualFundsFormCompoent";
import TransactionMutualFundsLanding from "../page/Transaction/MutualFunds/TransactionMutualFundsLanding";
import TransactionOtherProductFormComponent from "../page/Transaction/OtherProduct/TransactionOtherProductFormComponent";
import TransactionOtherProductLanding from "../page/Transaction/OtherProduct/TransactionOtherProductLanding";

//Transaction Delete
import TransactionBondsFormComponentDelete from "../page/TransactionDelete/BondsDelete/BondsFormCompoent";
import TransactionBondsLandingDelete from "../page/TransactionDelete/BondsDelete/BondsLanding";
import TransactionDirectEquityFormComponentDelete from "../page/TransactionDelete/DirectEquityDelete/TransactionDirectEquityFormCompoent";
import TransactionDirectEquityLandingDelete from "../page/TransactionDelete/DirectEquityDelete/TransactionDirectEquityLanding";
import TransactionMutualFundsFormComponentDelete from "../page/TransactionDelete/MutualFundsDelete/TransactionMutualFundsFormCompoent";
import TransactionMutualFundsLandingDelete from "../page/TransactionDelete/MutualFundsDelete/TransactionMutualFundsLanding";
import TransactionOtherProductFormComponentDelete from "../page/TransactionDelete/OtherProductDelete/TransactionOtherProductFormComponent";
import TransactionOtherProductLandingDelete from "../page/TransactionDelete/OtherProductDelete/TransactionOtherProductLanding";

import MutualFundsUnderlyingHoldingsList from "../page/OtherMaster/MutualFundsUnderlyingHoldings/MutualFundsUnderlyingHoldings";
import ProductTypeMasterFormComponent from "../page/OtherMaster/ProductTypeMaster/ProductTypeMasterFormComponent";
import ProductTypeMasterList from "../page/OtherMaster/ProductTypeMaster/ProductTypeMasterList";
import SEBICategoryMasterList from "../page/OtherMaster/SEBICategoryMaster/SEBICategoryMaster";
import TransactionTypeMasterFormComponent from "../page/OtherMaster/TransactionTypeMaster/TransactionTypeMasterFormComponent";
import TransactionTypeMasterList from "../page/OtherMaster/TransactionTypeMaster/TransactionTypeMasterList";

import AccessRightMasterActivateorDeactivate from "../page/AccessRightMaster/AccessRightMasterActivateorDeactivate";
import AccessRightMasterFormComponent from "../page/AccessRightMaster/AccessRightMasterFormComponent";
import AccessRightMasterList from "../page/AccessRightMaster/AccessRightMasterList";
import Rolepermissionlist from "../page/AdminPermissions/CreatePermission/CreatePermissionList";
import UserSessions from "../page/AdminPermissions/userLogin/UserSessions";
import ClientMappingFormComponent from "../page/ClientMaster/ClientMapping/ClientMappingFormComponent";
import ClientMappingLanding from "../page/ClientMaster/ClientMapping/ClientMappingLanding";
import ClientMasterFormComponent from "../page/ClientMaster/ClientMaster/ClientMasterFormComponent";
import ClientMasterProductLanding from "../page/ClientMaster/ClientMaster/ClientMasterProductLanding";
import ChangeFamilyHead from "../page/ClientMaster/FamilyClientMapping/ChangeFamilyHead";
import FamilyClientMappingFormComponent from "../page/ClientMaster/FamilyClientMapping/FamilyClientMappingFormComponent";
import FamilyClientMappingLanding from "../page/ClientMaster/FamilyClientMapping/FamilyClientMappingLanding";
import FamilyClientMappingUnmapFormComponent from "../page/ClientMaster/FamilyClientMapping/FamilyClientMappingUnmapFormComponent";
import FamilyClientUngroupingFormComponent from "../page/ClientMaster/FamilyClientUngrouping/FamilyClientUngroupingFormComponent";
import FamilyClientUngroupingLanding from "../page/ClientMaster/FamilyClientUngrouping/FamilyClientUngroupingLanding";
import FamilyMasterLanding from "../page/ClientMaster/FamilyMaster/FamilyMasterLanding";
import FactsheetBondsList from "../page/Factsheet/Bonds/FactsheetBondsList";
import FactsheetDirectEquityList from "../page/Factsheet/DirectEquity/FactsheetDirectEquityList";
import FactsheetMutualFundsList from "../page/Factsheet/MutualFunds/FactsheetMutualFundsList";
import IncentiveReportList from "../page/Incentive/IncentiveReport/IncentiveReportList";
import IncentiveReportListLanding from "../page/Incentive/IncentiveReport/IncentiveReportListLanding";
import IncentiveRateUploadFormComponent from "../page/Incentive/RateUpload/IncentiveRateUploadFormComponent";
import IncentiveRateUploadLanding from "../page/Incentive/RateUpload/IncentiveRateUploadLanding";
import DirectEquityIndustrySectorsList from "../page/OtherMaster/DirectEquityIndustrySectors/DirectEquityIndustrySectors";
import MutualFundsIndustrySectorsList from "../page/OtherMaster/MutualFundsIndustrySectors/MutualFundsIndustrySectors";
import PMSAIFFormComponent from "../page/OtherMaster/PMSAIFUnderlyingHoldings/PMSAIFFormComponent";
import PMSAIFLanding from "../page/OtherMaster/PMSAIFUnderlyingHoldings/PMSAIFLanding";
import PayableDefineFormComponent from "../page/Payable/PayableDefineFormComponent";
import PayableDefineLanding from "../page/Payable/PayableDefineLanding";
import PayableReportLanding from "../page/Payable/PayableReportLanding";

import CommissionReceivableReport from "../page/Receivable/CommissionReceivableReport/CommissionReceivableReport";
import CommissionAdd from "../page/Receivable/CommissionUploadMaster/CommissionAdd";
import CommissionUploadMasterLanding from "../page/Receivable/CommissionUploadMaster/CommissionUploadMasterLanding";
import RiskFormComponent from "../page/RiskProfiling/RiskFormComponent";
import UserCreationFormComponent from "../page/UserCreation/UserCreationFormComponent";
import UserHierarchyMappingFormComponent from "../page/UserHierarchyMapping/UserHierarchyMappingFormComponent";
import UserRoleMasterFormComponent from "../page/UserRoleMaster/UserRoleMasterFormComponent";
import UserRoleMasterList from "../page/UserRoleMaster/UserRoleMasterList";
import { userRole } from "../util/Authenticate/Rolename";
import CreatePermissionFormComponent from "./../page/AdminPermissions/CreatePermission/CreatePermissionFormComponent";
import FamilyMasterFormComponent from "./../page/ClientMaster/FamilyMaster/FamilyMasterFormComponent";
import UserCreationListLanding from "./../page/UserCreation/UserCreationListLanding";
import VMOtherProductListLanding from "./../page/ValuationMaster/OtherProduct/VMOtherProductListLanding";
import RouteCurrentAuthorities from "./../util/Authenticate/AuthorizedFunction";
// const IncentiveRMLanding = React.lazy(() => import("../page/Incentive/IncentiveReport/IncentiveRMLanding"));
import ClientOnboarding from "../page/ClientMaster/ClientOnboarding/ClientOnboarding";
import NomineeFormComponent from "../page/ClientMaster/ClientOnboarding/NomineeComponent/NomineeFormComponent";
import ViewComponentFormComponent from "../page/ClientMaster/ClientOnboarding/ViewComponent/ViewComponentFormComponent";
import IncentiveRMLanding from "../page/Incentive/IncentiveReport/IncentiveRMLanding";
import RiskProfileAdvisorFormComponent from "../page/RiskProfilingAdvisor/RiskProfileAdvisorFormComponent";
import RiskProfileAdvisorMain from "../page/RiskProfilingAdvisor/RiskProfileAdvisorMain";
import BankFormComponent from "./../page/ClientMaster/ClientOnboarding/BankComponent/BankFormComponent";
import FATCAFormComponent from "./../page/ClientMaster/ClientOnboarding/FATCAComponent/FATCAFormComponent";
import JointHoldingFormComponent from "./../page/ClientMaster/ClientOnboarding/JointHoldingComponent/JointHoldingFormComponent";
import PersonalFormComponent from "./../page/ClientMaster/ClientOnboarding/PersonalComponent/PersonalFormComponent";

const Dashboard = React.lazy(() =>
  import("../page/Dashboard/ClientDashboard/ClientDashboard")
);

// Import the NotFound component
const NotFound = React.lazy(() => import("../page/PageNotFound"));

export default function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading for 1-2 seconds after login
    const timer = setTimeout(() => {
      setLoading(false);
      // You can redirect after login here if needed
    }, 1500);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Or show a spinner
  }

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<DashboardLandingPage />} />

        <Route
          path={"/" + encrypt("UnderConstruction")}
          element={<UnderConstruction />}
        />

        <Route
          path={"/" + encrypt("ClientDashboard")}
          element={<ClientDashboard />}
        />

        <>
          <Route
            path={"/" + encrypt("RiskProfiling")}
            element={<RiskProfiling />}
          />
          <Route
            path={"/" + encrypt("RiskFormComponent") + "/:mode/:id"}
            element={<RiskFormComponent />}
          />
        </>
        <>
          <Route
            path={"/" + encrypt("RiskProfileAdvisorMain")}
            element={<RiskProfileAdvisorMain />}
          />
          <Route
            path={
              "/" + encrypt("RiskProfileAdvisorFormComponent") + "/:mode/:id"
            }
            element={<RiskProfileAdvisorFormComponent />}
          />
        </>

        <Route
          path={"/" + encrypt("ClientReportsComponent") + "/:mode"}
          element={<ClientReportsComponent />}
        />

        <Route
          path={"/" + encrypt("FundAnalyticsComponent") + "/:mode"}
          element={<FundAnalyticsComponent />}
        />

        {/***************************** Menu ends for client ********************/}
        {/********************** Menu Starts for RM dashboard *******************/}

        <>
          {RouteCurrentAuthorities([userRole.RM_Entity_Report]) && (
            <Route
              path={"/" + encrypt("EnitityReport") + "/:Reportmode"}
              element={<EnitityReport />}
            />
          )}
          {RouteCurrentAuthorities([userRole.Corporate_Reports]) && (
            <Route
              path={"/" + encrypt("CorporateReports")}
              element={<CorporateReports />}
            />
          )}
          {RouteCurrentAuthorities([
            userRole.RM_Instrument_Upload,
            userRole.RM_Transaction_Upload,
            userRole.RM_Client_Onboarding_Upload,
          ]) && (
            <Route
              path={"/" + encrypt("UploadsComponent") + "/:mode"}
              element={<UploadsComponent />}
            />
          )}
          <Route
            path={"/" + encrypt("WatchListModel")}
            element={<WatchListModal />}
          />
          {/* /> */}
        </>

        {/******************** Menu Ends for RM dashboard ***********************/}
        {/******************** Menu Start for OPeration dashboard ***************/}
        <>
          <Route
            path={"/" + encrypt("CreditRatingList")}
            element={<CreditRatingList />}
          />
          <Route
            path={"/" + encrypt("CreditRatingFormComponent") + "/:mode/:id"}
            element={<CreditRatingFormComponent />}
          />
          <Route path={"/" + encrypt("SectorList")} element={<SectorList />} />
          <Route
            path={"/" + encrypt("SectorListFormComponent") + "/:mode/:id"}
            element={<SectorListFormComponent />}
          />
          <Route
            path={"/" + encrypt("InstrumentTypeList")}
            element={<InstrumentTypeList />}
          />
          <Route
            path={"/" + encrypt("InstrumentTypeFormComponent") + "/:mode/:id"}
            element={<InstrumentTypeFormComponent />}
          />
          <Route
            path={"/" + encrypt("InstrumentCategoryList")}
            element={<InstrumentCategoryList />}
          />
          <Route
            path={
              "/" + encrypt("InstrumentCategoryFormComponent") + "/:mode/:id"
            }
            element={<InstrumentCategoryFormComponent />}
          />
          {RouteCurrentAuthorities([
            userRole.SEBI_Category_Master_Mutual_Funds_list,
          ]) && (
            <Route
              path={"/" + encrypt("SEBICategoryMasterList")}
              element={<SEBICategoryMasterList />}
            />
          )}
          {RouteCurrentAuthorities([
            userRole.Mutual_Funds_Underlying_Holdings,
          ]) && (
            <Route
              path={"/" + encrypt("MutualFundsUnderlyingHoldingsList")}
              element={<MutualFundsUnderlyingHoldingsList />}
            />
          )}
          {RouteCurrentAuthorities([userRole.Mutual_FundsIndustry_Sector]) && (
            <Route
              path={"/" + encrypt("MutualFundsIndustrySectorsList")}
              element={<MutualFundsIndustrySectorsList />}
            />
          )}
          {RouteCurrentAuthorities([
            userRole.Direct_Equity_Industry_Sector,
          ]) && (
            <Route
              path={"/" + encrypt("DirectEquityIndustrySectorsList")}
              element={<DirectEquityIndustrySectorsList />}
            />
          )}
          <Route
            path={"/" + encrypt("CreateInstrumentLanding") + "/:pageName"}
            element={<CreateInstrumentLanding />}
          />
          <Route
            path={"/" + encrypt("CreateInstrumentFormComponent") + "/:mode/:id"}
            element={<CreateInstrumentFormComponent />}
          />
          <Route
            path={"/" + encrypt("BondsLanding") + "/:pageName"}
            element={<BondsLanding />}
          />
          <Route
            path={"/" + encrypt("BondsFormComponent") + "/:mode/:id"}
            element={<BondsFormComponent />}
          />

          <Route
            path={"/" + encrypt("DirectEquityFormComponent") + "/:mode/:id"}
            element={<DirectEquityFormComponent />}
          />

          <Route
            path={"/" + encrypt("MutualFundsFormComponent") + "/:mode/:id"}
            element={<MutualFundsFormComponent />}
          />

          <Route
            path={"/" + encrypt("BondsFormComponent") + "/:mode/:id"}
            element={<BondsFormComponent />}
          />

          <Route
            path={"/" + encrypt("PMSAIFLanding") + "/:pageName"}
            element={<PMSAIFLanding />}
          />
          <Route
            path={"/" + encrypt("PMSAIFFormComponent") + "/:mode/:id"}
            element={<PMSAIFFormComponent />}
          />

          <Route
            path={"/" + encrypt("VMDirectEquityFormComponent") + "/:mode/:id"}
            element={<VMDirectEquityFormComponent />}
          />

          <Route
            path={"/" + encrypt("VMMutualFundsFormComponent") + "/:mode/:id"}
            element={<VMMutualFundsFormComponent />}
          />

          <Route
            path={"/" + encrypt("VMBondsFormComponent") + "/:mode/:id"}
            element={<VMBondsFormComponent />}
          />

          <Route
            path={
              "/" +
              encrypt("TransactionDirectEquityFormComponent") +
              "/:mode/:id"
            }
            element={<TransactionDirectEquityFormComponent />}
          />
          <Route
            path={
              "/" +
              encrypt("TransactionDirectEquityFormComponentDelete") +
              "/:mode/:id"
            }
            element={<TransactionDirectEquityFormComponentDelete />}
          />

          <Route
            path={
              "/" +
              encrypt("TransactionMutualFundsFormComponent") +
              "/:mode/:id"
            }
            element={<TransactionMutualFundsFormComponent />}
          />
          <Route
            path={
              "/" +
              encrypt("TransactionMutualFundsFormComponentDelete") +
              "/:mode/:id"
            }
            element={<TransactionMutualFundsFormComponentDelete />}
          />

          <Route
            path={"/" + encrypt("TransactionBondsFormComponent") + "/:mode/:id"}
            element={<TransactionBondsFormComponent />}
          />

          <Route
            path={
              "/" +
              encrypt("TransactionBondsFormComponentDelete") +
              "/:mode/:id"
            }
            element={<TransactionBondsFormComponentDelete />}
          />

          <Route
            path={"/" + encrypt("FactsheetBondsList")}
            element={<FactsheetBondsList />}
          />
          {/* Factsheet */}
          <Route
            path={"/" + encrypt("FactsheetDirectEquityList")}
            element={<FactsheetDirectEquityList />}
          />
          <Route
            path={"/" + encrypt("FactsheetMutualFundsList")}
            element={<FactsheetMutualFundsList />}
          />
          <Route
            path={
              "/" +
              encrypt("TransactionOtherProductsFormComponent") +
              "/:mode/:id"
            }
            element={<TransactionOtherProductFormComponent />}
          />
          <Route
            path={
              "/" +
              encrypt("TransactionOtherProductsFormComponentDelete") +
              "/:mode/:id"
            }
            element={<TransactionOtherProductFormComponentDelete />}
          />
        </>

        <>
          {/******************** Menu Starts for Admin dashboard ***************/}
          {RouteCurrentAuthorities([
            userRole.User_Role_Create,
            userRole.User_Role_Edit,
            userRole.User_Role_Activate_DeActivate,
            userRole.User_Role_Details,
            userRole.User_Role_Delete,
          ]) && (
            <>
              <Route
                path={"/" + encrypt("UserRoleMasterList")}
                element={<UserRoleMasterList />}
              />

              <Route
                path={
                  "/" + encrypt("UserRoleMasterFormComponent") + "/:mode/:id"
                }
                element={<UserRoleMasterFormComponent />}
              />
            </>
          )}
          {RouteCurrentAuthorities([
            userRole.User_Create,
            userRole.User_Edit,
            userRole.User_Activate_DeActivate,
            userRole.User_Details,
            userRole.User_Bulk_Upload,
            userRole.User_Delete,
          ]) && (
            <>
              {" "}
              <Route
                path={"/" + encrypt("UserCreationListLanding") + "/:pageName"}
                element={<UserCreationListLanding />}
              />
              <Route
                path={"/" + encrypt("UserCreationFormComponent") + "/:mode/:id"}
                element={<UserCreationFormComponent />}
              />
            </>
          )}
          <Route
            path={
              "/" + encrypt("UserHierarchyMappingFormComponent") + "/:mode/:id"
            }
            element={<UserHierarchyMappingFormComponent />}
          />
          {RouteCurrentAuthorities([
            userRole.Access_Mapping_update,
            userRole.Access_Mapping_Activate_DeActivate,
            userRole.Access_Mapping_Edit,
            userRole.Access_Mapping_Delete,
          ]) && (
            <>
              <Route
                path={"/" + encrypt("AccessRightMasterList")}
                element={<AccessRightMasterList />}
              />
              <Route
                path={
                  "/" +
                  encrypt("AccessRightMasterActivateorDeactivate") +
                  "/:id"
                }
                element={<AccessRightMasterActivateorDeactivate />}
              />
              <Route
                path={
                  "/" + encrypt("AccessRightMasterFormComponent") + "/:mode/:id"
                }
                element={<AccessRightMasterFormComponent />}
              />
            </>
          )}
          {/******************** Menu Ends for Admin dashboard ***************/}
        </>

        <>
          <Route
            path={"/" + encrypt("Rolepermission")}
            element={<Rolepermissionlist />}
          />
          <Route
            path={"/" + encrypt("UserSessions")}
            element={<UserSessions />}
          />

          <Route
            path={"/" + encrypt("CreatePermissionFormComponent") + "/:mode/:id"}
            element={<CreatePermissionFormComponent />}
          />
        </>

        <Route
          path={"/" + encrypt("CADirectEquityFormComponent") + "/:mode/:id"}
          element={<CADirectEquityFormComponent />}
        />
        <Route
          path={"/" + encrypt("CABondsFormComponent") + "/:mode/:id"}
          element={<CABondsFormComponent />}
        />
        {/******************** Menu Ends for OPeration dashboard ***************/}
        {/******************** Menu Starts for RouteCurrentAuthorities ***************/}

        {RouteCurrentAuthorities([
          userRole.Instrument_Master_Direct_Equity_List,
        ]) && (
          <Route
            path={"/" + encrypt("DirectEquityList")}
            element={<DirectEquityList />}
          />
        )}
        {RouteCurrentAuthorities([
          userRole.Instrument_Master_Mutual_Funds_List,
        ]) && (
          <Route
            path={"/" + encrypt("MutualFundsList")}
            element={<MutualFundsList />}
          />
        )}

        {RouteCurrentAuthorities([userRole.Instrument_Master_Bonds_List]) && (
          <Route path={"/" + encrypt("BondsList")} element={<BondsList />} />
        )}
        {RouteCurrentAuthorities([
          userRole.Instrument_Master_Other_Products_Create,
          userRole.Instrument_Master_Other_Products_Edit,
          userRole.Instrument_Master_Other_Products_Details,
          userRole.Instrument_Master_Other_Products_Activate_DeActivate,
          userRole.Instrument_Master_Other_Products_Bulk_Upload,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("IMOtherProductListLanding") + "/:pageName"}
              element={<IMOtherProductListLanding />}
            />

            <Route
              path={"/" + encrypt("OtherProductFormComponent") + "/:mode/:id"}
              element={<OtherProductFormComponent />}
            />
          </>
        )}

        {/************************* Valuation Master *******************************/}
        {RouteCurrentAuthorities([
          userRole.Valuation_Master_Direct_Equity_List,
        ]) && (
          <Route
            path={"/" + encrypt("VMDirectEquityList")}
            element={<VMDirectEquityList />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Valuation_Master_Mutual_Funds_List,
        ]) && (
          <Route
            path={"/" + encrypt("VMMutualFundsList")}
            element={<VMMutualFundsList />}
          />
        )}
        {RouteCurrentAuthorities([userRole.Valuation_Master_Bonds_List]) && (
          <Route
            path={"/" + encrypt("VMBondsList")}
            element={<VMBondsList />}
          />
        )}
        {RouteCurrentAuthorities([
          userRole.Valuation_Master_Other_Products_Create,
          userRole.Valuation_Master_Other_Products_Edit,
          userRole.Valuation_Master_Other_Products_Details,
          userRole.Valuation_Master_Other_Products_Non_Unitized_Bulk_Upload,
          userRole.Valuation_Master_Other_Products_Unitized_Bulk_Upload,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("VMOtherProductListLanding") + "/:pageName"}
              element={<VMOtherProductListLanding />}
            />

            <Route
              path={"/" + encrypt("VMOtherProductFormComponent") + "/:mode/:id"}
              element={<VMOtherProductFormComponent />}
            />
          </>
        )}

        {/* ******************* Corporate Action Master ***************************** */}
        {RouteCurrentAuthorities([
          userRole.Corporate_Actions_Master_Direct_Equity_List,
        ]) && (
          <Route
            path={"/" + encrypt("CADirectEquityList")}
            element={<CADirectEquityList />}
          />
        )}
        {RouteCurrentAuthorities([
          userRole.Valuation_Master_Other_Products_Create,
          userRole.Coupon_Payments_Master_Bonds_List,
        ]) && (
          <Route
            path={"/" + encrypt("CABondsList")}
            element={<CABondsList />}
          />
        )}
        <Route
          path={"/" + encrypt("ClientMappingLanding") + "/:pageName"}
          element={<ClientMappingLanding />}
        />

        {/* ***************** Client Master *********************************** */}
        {RouteCurrentAuthorities([
          userRole.Client_Master_List,
          userRole.Client_Master_Bulk_Upload,
        ]) && (
          <>
            {" "}
            <Route
              path={"/" + encrypt("ClientMasterFormComponent") + "/:mode/:id"}
              element={<ClientMasterFormComponent />}
            />
            <Route
              path={"/" + encrypt("ClientMasterProductLanding") + "/:pageName"}
              element={<ClientMasterProductLanding />}
            />
          </>
        )}

        {RouteCurrentAuthorities([
          userRole.Family_Master_Create,
          userRole.Family_Master_Edit,
          userRole.Family_Master_Details,
          userRole.Family_Master_Bulk_Upload,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("FamilyMasterFormComponent") + "/:mode/:id"}
              element={<FamilyMasterFormComponent />}
            />

            <Route
              path={"/" + encrypt("FamilyMasterLanding") + "/:pageName"}
              element={<FamilyMasterLanding />}
            />
          </>
        )}

        {RouteCurrentAuthorities([
          userRole.Family_Mapping_List,
          userRole.Family_Mapping_Bulk_Upload,
          userRole.Family_Map,
          userRole.Family_Unmap_Client,
          userRole.Family_Unmap_Family_Head,
        ]) && (
          <>
            <Route
              path={
                "/" + encrypt("FamilyClientMappingFormComponent" + "/:mode/:id")
              }
              element={<FamilyClientMappingFormComponent />}
            />

            <Route
              path={"/" + encrypt("FamilyClientMappingUnmapFormComponent")}
              element={<FamilyClientMappingUnmapFormComponent />}
            />
            <Route
              path={
                "/" +
                encrypt("FamilyClientUngroupingFormComponent") +
                "/:mode/:id"
              }
              element={<FamilyClientUngroupingFormComponent />}
            />

            <Route
              path={
                "/" + encrypt("FamilyClientUngroupingLanding") + "/:pageName"
              }
              element={<FamilyClientUngroupingLanding />}
            />
            <Route
              path={"/" + encrypt("FamilyClientMappingLanding") + "/:pageName"}
              element={<FamilyClientMappingLanding />}
            />
          </>
        )}

        {RouteCurrentAuthorities([
          userRole.Family_Family_Head_Mapping_list,
          userRole.Family_Mapping_Change_Head,
        ]) && (
          <Route
            path={"/" + encrypt("ChangeFamilyHead")}
            element={<ChangeFamilyHead />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Client_RM_Mapping_Bulk_Upload,
          userRole.Client_RM_Mapping_List,
        ]) && (
          <Route
            path={"/" + encrypt("ClientMappingFormComponent") + "/:mode/:id"}
            element={<ClientMappingFormComponent />}
          />
        )}
        {/* ***************** Transaction *********************************** */}
        {RouteCurrentAuthorities([
          userRole.Transaction_Direct_Equity_list,
          userRole.Transaction_Direct_Equity_Bulk_Upload,
        ]) && (
          <Route
            path={
              "/" + encrypt("TransactionDirectEquityLanding") + "/:pageName"
            }
            element={<TransactionDirectEquityLanding />}
          />
        )}
        {RouteCurrentAuthorities([
          userRole.Transaction_Direct_Equity_list,
          // userRole.Transaction_Direct_Equity_Delete,
        ]) && (
          <Route
            path={
              "/" +
              encrypt("TransactionDirectEquityLandingDelete") +
              "/:pageName"
            }
            element={<TransactionDirectEquityLandingDelete />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Transaction_Mutual_Funds_list,
          userRole.Transaction_Mutual_Funds_Bulk_Upload,
        ]) && (
          <Route
            path={"/" + encrypt("TransactionMutualFundsLanding") + "/:pageName"}
            element={<TransactionMutualFundsLanding />}
          />
        )}
        {RouteCurrentAuthorities([
          // userRole.Transaction_Mutual_Funds_Delete,
          userRole.Transaction_Mutual_Funds_list,
        ]) && (
          <Route
            path={
              "/" +
              encrypt("TransactionMutualFundsLandingDelete") +
              "/:pageName"
            }
            element={<TransactionMutualFundsLandingDelete />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Transaction_Bonds_List,
          userRole.Transaction_Bonds_Bulk_Upload,
        ]) && (
          <Route
            path={"/" + encrypt("TransactionBondsLanding") + "/:pageName"}
            element={<TransactionBondsLanding />}
          />
        )}
        {RouteCurrentAuthorities([
          // userRole.Transaction_Bonds_Delete,
          userRole.Transaction_Bonds_List,
        ]) && (
          <Route
            path={"/" + encrypt("TransactionBondsLandingDelete") + "/:pageName"}
            element={<TransactionBondsLandingDelete />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Transaction_Other_Products_List,
          userRole.Transaction_Other_Products_Bulk_Upload,
        ]) && (
          <Route
            path={
              "/" + encrypt("TransactionOtherProductLanding") + "/:pageName"
            }
            element={<TransactionOtherProductLanding />}
          />
        )}
        {RouteCurrentAuthorities([
          // userRole.Transaction_Other_Products_Delete,
          userRole.Transaction_Other_Products_List,
        ]) && (
          <Route
            path={
              "/" +
              encrypt("TransactionOtherProductLandingDelete") +
              "/:pageName"
            }
            element={<TransactionOtherProductLandingDelete />}
          />
        )}

        {RouteCurrentAuthorities([
          userRole.Asset_Class_Master_Create,
          userRole.Asset_Class_Master_Delete,
          userRole.Asset_Class_Master_Details,
          userRole.Asset_Class_Master_Edit,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("AssetClassList")}
              element={<AssetClassList />}
            />

            <Route
              path={"/" + encrypt("AssetClassFormComponent") + "/:mode/:id"}
              element={<AssetClassFormComponent />}
            />
          </>
        )}

        {RouteCurrentAuthorities([
          userRole.Product_Master_Create,
          userRole.Product_Master_Edit,
          userRole.Product_Master_Activate_DeActivate,
          userRole.Product_Master_Details,
          userRole.Product_Master_Delete,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("ProductTypeMasterList")}
              element={<ProductTypeMasterList />}
            />

            <Route
              path={
                "/" + encrypt("ProductTypeMasterFormComponent") + "/:mode/:id"
              }
              element={<ProductTypeMasterFormComponent />}
            />
          </>
        )}
        {/* )}{" "} */}

        {RouteCurrentAuthorities([
          userRole.Transaction_Master_Create,
          userRole.Transaction_Master_Edit,
          userRole.Transaction_Master_Activate_DeActivate,
          userRole.Transaction_Master_Details,
          userRole.Transaction_Master_Delete,
        ]) && (
          <>
            <Route
              path={"/" + encrypt("TransactionTypeMasterList")}
              element={<TransactionTypeMasterList />}
            />

            <Route
              path={
                "/" +
                encrypt("TransactionTypeMasterFormComponent") +
                "/:mode/:id"
              }
              element={<TransactionTypeMasterFormComponent />}
            />
          </>
        )}
        {/* )} */}
        {/******************** Menu Starts for ***************/}
        {/********************  Menu Ends for Default dashboard ****************/}
        <Route path={"/"} element={<DashboardLandingPage />} />
        <Route
          path={"/" + encrypt("ClientOnboarding") + "/:mode/:id/:sID"}
          element={<ClientOnboarding />}
        />

        <Route
          path={"/" + encrypt("PersonalFormComponent") + "/:mode/:id"}
          element={<PersonalFormComponent />}
        />

        <Route
          path={"/" + encrypt("JointHoldingFormComponent") + "/:mode/:id"}
          element={<JointHoldingFormComponent />}
        />

        <Route
          path={"/" + encrypt("BankFormComponent") + "/:mode/:id"}
          element={<BankFormComponent />}
        />
        <Route
          path={"/" + encrypt("NomineeFormComponent") + "/:mode/:id"}
          element={<NomineeFormComponent />}
        />

        <Route
          path={"/" + encrypt("FATCAFormComponent") + "/:mode/:id"}
          element={<FATCAFormComponent />}
        />
        <Route
          path={"/" + encrypt("ViewComponentFormComponent") + "/:mode/:id"}
          element={<ViewComponentFormComponent />}
        />

        <Route
          path={"/" + encrypt("DashboardLandingPage")}
          element={<DashboardLandingPage />}
        />

        {/* IncentiveRateUpload */}
        <Route
          path={"/" + encrypt("IncentiveRateUploadLanding")}
          element={<IncentiveRateUploadLanding />}
        />
        <Route
          path={
            "/" + encrypt("IncentiveRateUploadFormComponent") + "/:mode/:id"
          }
          element={<IncentiveRateUploadFormComponent />}
        />
        <Route
          path={"/" + encrypt("IncentiveReportListLanding") + "/:pageName"}
          element={<IncentiveReportListLanding />}
        />
        <Route
          path={"/" + encrypt("IncentiveRMLanding")}
          element={<IncentiveRMLanding />}
        />
        <Route
          path={"/" + encrypt("IncentiveReportList")}
          element={<IncentiveReportList />}
        />
        <Route
          path={"/" + encrypt("PayableDefineLanding")}
          element={<PayableDefineLanding />}
        />
        <Route
          path={"/" + encrypt("PayableDefineFormComponent") + "/:mode/:id"}
          element={<PayableDefineFormComponent />}
        />
        <Route
          path={"/" + encrypt("PayableReportLanding")}
          element={<PayableReportLanding />}
        />
        {/* <Route
          path={"/" + encrypt("PayableReportLanding") + "/:pageName"}
          element={<PayableListLanding />}
        /> */}
        <Route
          path={"/" + encrypt("CommissionUploadMasterLanding")}
          element={<CommissionUploadMasterLanding />}
        />
        <Route
          path={"/" + encrypt("CommissionUploadAdd") + "/:pageName"}
          element={<CommissionAdd />}
        />
        <Route
          path={"/" + encrypt("CommissionReceivableReport")}
          element={<CommissionReceivableReport />}
        />

        <Route
          path="*"
          element={
            <NotFound
              status={404}
              message="Oops! Looks like you're lost in space."
              btnText="Return to Home"
            />
          }
        />
      </Routes>
    </Suspense>
  );
}
