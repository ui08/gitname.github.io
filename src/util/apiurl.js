export const Apiurl = {
  interventionlist: `admin/api/v1/lms-admin/intervention/list`,
  interventionCreate: `admin/api/v1/lms-admin/intervention/create`,
  interventionSingleView: `admin/api/v1/lms-admin/intervention/getById`,
  interventionEdit: `admin/api/v1/lms-admin/intervention/edit`,
  interventionToggle: `admin/api/v1/lms-admin/intervention/toogle`,
  schoolList: `master/api/v1/lms-master/school-mgmt/list`,
  activatedUserRoleList: `user/api/v1/usertype/list`,
  authlogin: "auth/login",
  authrefreshogin: "auth/refresh",

  //app login
  apiLogin: "redirect/user/api/v1/auth/login",
  userDetails: "redirect/user/api/v1/user/getUserDetailsByToken",

  downloadExcelTemplate:
    "redirect/excel/api/v1/excel/bulk/downloadExcelTemplate",
  downloadExcelTemplateClientRemapping:
    "redirect/excel/api/v1/excel/bulk/downloadExcelTemplateClientRemapping",
  downloadExcelTemplateForFamilyMaster: `redirect/excel/api/v1/excel/bulk/downloadExcelTemplateForFamilyMaster/`,
  downloadExcelTemplateForFamilyMapping: `redirect/excel/api/v1/excel/bulk/downloadExcelTemplateForFamilyMapping`,
  unitizedProdValuationMasterTemplate:
    "redirect/master/api/v1/mst/excel/unitizedProdValuationMasterTemplate",
  NonunitizedProdValuationMasterTemplate:
    "redirect/master/api/v1/mst/excel/downloadNonUnitizedOPValuationTemplate",
  instrumentMasterTemplate:
    "redirect/master/api/v1/mst/excel/instrumentMasterTemplate",
  downloadTransactionTemplate:
    // "redirect/master/api/v1/excel/bulk/downloadExcelTemplate",
    "/redirect/master/api/v1/mst/excel",
  downloadTransactionTemplateOP:
    "redirect/master/api/v1/mst/excel/downloadOPTransactionTemplate",
  instrumentMasterDownloadTemplate:
    "redirect/file/api/v1/files/download/template?fileUploadType=CREATE_INSTRUMENT_BULK_UPLOAD",
  clientMstOnboardingExcelTemplate:
    "redirect/api/v1/repo/bulk/clientMstOnboardingExcelTemplate",
  uploadExcelTemplate: "redirect/excel/api/v1/excel/bulk/upload/excel",
  uploadTransactionTemplate: "redirect/master/api/v1/excel/bulk/upload/excel",

  bulkHistory: "redirect/excel/api/v1/excel/bulk/download",
  bulkmasterHistory: "redirect/master/api/v1/excel/bulk/download",
  generateReportHolding: "redirect/reports/api/v1/report/generateHoldingReport",

  clientgenerateSummaryReport:
    "redirect/reports/api/v1/report/generateSummaryReport/client",
  THREE_SIXTY_DEGREE_WEALTH_REPORT:
    "redirect/reports/api/v1/report/downloadReport?reportType=THREE_SIXTY_DEGREE_WEALTH_REPORT&fileId=6b6dc382-accd-4a22-bf2b-3daad5b3f3de",
  generateReportCapitalGain:
    "redirect/reports/api/v1/report/generateCapitalGainReport",
  generateReportTransaction:
    "redirect/reports/api/v1/report/generateTransactionReport",
  generateReportSecurity:
    "redirect/reports/api/v1/report/generateSecurityReport",
  generateReportXirr: "redirect/reports/api/v1/report/generateXirrReport",
  generateFamilyOfficeReport:
    "redirect/reports/api/v1/report/generateFamilyOfficeReport",
  downloadReport: "redirect/reports/api/v1/report/downloadReport?",
  checkIfReportIsGenerated:
    "redirect/reports/api/v1/report/checkIfReportIsGenerated?",
  viewReport: "redirect/reports/api/v1/report/viewReport?",
  generateviewReport: "redirect/reports/api/v1/report/view/report?",

  //RM Dashboard
  aumData: "redirect/master/api/v1/rm/dashboard/AumChartData",
  rmDetails: "redirect/master/api/v1/rm/dashboard/rmDetails",
  allRelationshipDetails:
    "redirect/master/api/v1/rm/dashboard/rmAllRelationshipdetails",
  marketValueBifurcation:
    "/redirect/master/api/v1/rm/dashboard/marketValuebifurcation",
  aumClientwise: "redirect/master/api/v1/rm/dashboard/Aumclientwise",
  sipDetails: "redirect/master/api/v1/rm/dashboard/getSipDetails",
  transactionGroupByAsset:
    "redirect/master/api/v1/rm/dashboard/transactionsGroupedByAssets",
  relationshipDetailsByClient:
    "redirect/master/api/v1/rm/dashboard/rmRelationshipdetailsByType?type=",
  watchListDD: "redirect/master/api/v1/rm/dashboard/watchListDropdown",

  saveWatchList: "redirect/master/api/v1/rm/dashboard/saveWatchlist",
  getWatchlistbyid:
    "redirect/master/api/v1/rm/dashboard/getWatchlist?watchlist=",
  getcheckUniqueName:
    "redirect/master/api/v1/rm/dashboard/checkUniqueName?watchlist=",
  editWatchListName:
    "redirect/master/api/v1/rm/dashboard/editWatchListName?watchlist=",

  watchListSearch:
    "redirect/master/api/v1/rm/dashboard/watchListDropdownwithSearch?searchTerm=",
  watchlistCount: `redirect/master/api/v1/rm/dashboard/getWatchlistCount`,
  //watchlist=WATCHLIST4
  removeWatchlist: "redirect/master/api/v1/rm/dashboard/removeWatchlist/",
  removeAllWatchlist: "redirect/master/api/v1/rm/dashboard/removeAllWatchlist/",

  getAllWatchlist: "/redirect/master/api/v1/rm/dashboard/getAllWatchlist",
  analyticsStock: "redirect/master/api/v1/rm/dashboard/getClientStockOnePager?",
  analyticsMF: "redirect/master/api/v1/rm/dashboard/getClientMFOnePager?",
  watchlistDashboard: `redirect/master/api/v1/rm/dashboard/getAllWatchlist`,
  getAllAssetAllocationByRmId:
    "redirect/master/api/v1/repo/clientdashboard/getAllAssetAllocationByRmId/",
  getProductAllocationByRmId:
    "redirect/master/api/v1/repo/clientdashboard/getProductAllocationByRmId/",
  getTransactionsByAssetClass:
    "redirect/master/api/v1/rm/dashboard/getTransactionsByAssetClass/",
  getTransactionsByProductType:
    "redirect/master/api/v1/rm/dashboard/getTransactionsByProductType/",
  getAUMPerCategory: "redirect/master/api/v1/rm/dashboard/getAUMPerCategory/",

  //Client Dashboard
  investmentChartData:
    "redirect/master/api/v1/repo/clientdashboard/getInvestmentChartData/",
  allHolding:
    "redirect/master/api/v1/repo/clientdashboard/getAllHoldingsByClient/",
  combineHolding:
    "redirect/master/api/v1/repo/clientdashboard/getHoldingsCombineUnderInstrument/",
  holdingsProductList:
    "redirect/master/api/v1/repo/clientdashboard/getListOfInstrumentUnderProduct/",
  allAssetAllocation:
    "redirect/master/api/v1/repo/clientdashboard/getAllAssetAllocationByClient/",
  topHoldings:
    "redirect/master/api/v1/compute/getClientUnderlyingStocksAcrossEquityPortfolio/",
  productAllocation:
    "redirect/master/api/v1/repo/clientdashboard/getProductAllocationByClient/",
  securityExposure:
    "redirect/master/api/v1/repo/clientdashboard/getSecurityExposure/",
  assetAllocationChart:
    "/redirect/master/api/v1/compute/getClientAssetClassPerformance/",
  sectorExposure:
    "redirect/master/api/v1/compute/getClientSectorAllocationAcrossEquityPortfolio/",
  mutualFundAMCExposure:
    "redirect/master/api/v1/compute/getClientAMCAllocationAcrossEquityPortfolio/",
  marketCap:
    "redirect/master/api/v1/compute/getClientMarketCapExposureEquityPortfolio/",
  portfolioXirr:
    "redirect/master/api/v1/repo/clientdashboard/getPortfolioXirr/",
  individualHolding:
    "redirect/master/api/v1/repo/clientdashboard/getListOfInstrumentAndHoldingUnderProduct/",
  lastTransaction: "redirect/master/api/v1/trxn/lastTrxn/",
  upcomingCorporateAction: `redirect/master/api/v1/repo/mst/getAllCorpAction`,

  //report filter
  allFamily: "redirect/api/v1/repo/mst/getAllFamilys/",
  allClientByFamily: "redirect/api/v1/repo/mst/getAllClientsByFamilyId/",
  allAccountCategoryByClient: "redirect/api/v1/repo/mst/getCategoryByClientId/",
  allAccountByClient: "redirect/api/v1/repo/mst/getAccountsByclientId/",
  allAccountByClientReport: "redirect/api/v1/repo/mst/getAccountsByclientIds/",
  getProduct: "redirect/api/v1/repo/master/fetchMasterProductList",

  CorporateReportspast: `redirect/api/v1/repo/report/view/past/history`,
  CorporateReportsrecent: `redirect/api/v1/repo/report/view/recent/history`,
  uploadHistory:
    "redirect/excel/api/v1/excel/bulk/view/bulkUpload/history?fileUploadType=",
  transactionHistory:
    "redirect/master/api/v1/excel/bulk/view/bulkUpload/history?fileUploadType=",
  excelDownload: "redirect/excel/api/v1/excel/bulk/download/",
  reportHistory: "redirect/reports/api/v1/report/view/history",
  //  user  /
  getallrole: "redirect/user/api/v1/user/role/view",
  roleCreate: "redirect/user/api/v1/user/role/create",
  rolebyid: "redirect/user/api/v1/user/role",
  rolebyupdate: "redirect/user/api/v1/user/role/update",
  useractivation: "redirect/user/api/v1/user/activation",
  roledelete: "redirect/user/api/v1/user/role/delete",
  userdelete: "redirect/user/api/v1/user/delete",
  userlist: "redirect/user/api/v1/user/view",
  allGENDER: "redirect/master/api/v1/repo/mst/getCategoryByName/GENDER",
  allRelation: "redirect/master/api/v1/repo/mst/getCategoryByName/RELATION",
  allCountry: "redirect/master/api/v1/repo/mst/getAllCountryOfBirth",
  fetchSupervisorRolebyRoleid: "redirect/user/api/v1/user/fetchSupervisorRole/",
  fetchzone: "redirect/user/api/v1/user/zone/view",

  SubCategoryListapi:
    "redirect/master/api/v1/repo/master/fetchSubCategoryList/",
  getAllPincode:
    "redirect/master/api/v1/repo/mst/getAllPincodeDetailsByPincode/",
  getAllCity: "redirect/master/api/v1/repo/mst/getAllCity",
  userregister: "redirect/user/api/v1/user/register",
  getUserDetailsByUserId: "redirect/user/api/v1/user/getUserDetailsByUserId",
  UserDetailsupdate: "redirect/user/api/v1/user/update",
  //Instrument Master
  IMotherProductSave: "redirect/master/api/v1/repo/mst/saveInstrument",
  allProduct: "redirect/master/api/v1/repo/mst/getAllProductClassMst",

  allAsset: "redirect/master/api/v1/repo/mst/getAllAssetClass",
  IMotherProductList: "redirect/master/api/v1/repo/mst/getInstrumentList",
  IMDeactive: "redirect/master/api/v1/repo/mst/deactiveInstrument/",
  IMSingleView: "redirect/master/api/v1/repo/mst/getInstrumentById/",
  IMDirectEquityList:
    "redirect/master/api/v1/repo/mst/getAllDirectEquityDetails",
  IMMutualFundList: "redirect/master/api/v1/repo/mst/getAllMfDetails",
  IMBondsList: "redirect/master/api/v1/repo/mst/getBondInstrumentMaster",
  VMotherProductSave:
    "redirect/master/api/v1/repo/mst/saveOtherProductValuationMaster",
  VMotherProductList: `redirect/master/api/v1/repo/mst/getOtherProductValuationBy-date?tradeDate=`,
  VMOtherProductSingleView:
    "redirect/master/api/v1/repo/mst/getOtherProductValuationById",

  IMotherProductSave: "redirect/master/api/v1/repo/mst/saveInstrument",
  allProduct: "redirect/master/api/v1/repo/mst/getAllProductClassMst",
  allAsset: "redirect/master/api/v1/repo/mst/getAllAssetClass",
  IMotherProductList: "redirect/master/api/v1/repo/mst/getInstrumentList",
  IMReactive: "redirect/master/api/v1/repo/mst/reactivateInstrument/",
  IMDeactive: "redirect/master/api/v1/repo/mst/deactiveInstrument/",
  IMSingleView: "redirect/master/api/v1/repo/mst/getInstrumentById/",

  // Valuation Master
  VMDirectEquityList:
    "redirect/master/api/v1/repo/mst/getDirectEquityValuationBy-date",
  VMMutualFundList:
    "redirect/master/api/v1/repo/mst/getMutualFundValuationBy-date",
  VMBondsList: "redirect/master/api/v1/repo/mst/getBondMasterValuationBy-date",

  // Corporate Action Master
  CADirectEquityList: "redirect/master/api/v1/repo/mst/getCorporateAction",
  CABondCouponList: "redirect/master/api/v1/repo/mst/getCouponBondsMaster",

  //Family Service
  saveFamily: "redirect/user/api/v1/rmadvisor/addFamily",
  familyList: "redirect/user/api/v1/rmadvisor/getAllFamily",
  getAllFamiliesDropdown:
    "redirect/user/api/v1/clientmaster/getAllFamiliesDropdown",

  deactivateFamily:
    "redirect/user/api/v1/rmadvisor/deactivateFamilyDetailsById/",
  activateFamily: "redirect/user/api/v1/rmadvisor/activateFamilyDetailsById/",
  singleViewFamily: "redirect/user/api/v1/rmadvisor/getFamilyDetailsById/",

  //Asset class
  saveAsset: "redirect/master/api/v1/repo/mst/saveAssetClass",
  deleteAsset: "redirect/master/api/v1/repo/mst/deleteAssetClass",
  singleViewAsset: "redirect/master/api/v1/repo/mst/getLookupAssetClassById",
  assetList: "redirect/master/api/v1/repo/mst/getLookupAssetClass",
  ProductTypeMasterList:
    "redirect/master/api/v1/repo/mst/getMasterProductClassification",
  TransactionTypeList: "redirect/master/api/v1/repo/mst/getAllTrxnType",

  //Clinet Master Upload
  CientMasterUpload:
    "redirect/excel/api/v1/excel/bulk/clientMstOnboardingExcelTemplate",

  saveProductType:
    "redirect/master/api/v1/repo/mst/saveMasterProductClassification",
  singleViewProductType:
    "redirect/master/api/v1/repo/mst/getMasterProductClassificationById",
  deleteProductType:
    "redirect/master/api/v1/repo/mst/deleteMasterProductClasssification",
  saveTransaction: "redirect/master/api/v1/repo/mst/saveTrxnType",
  deleteTransaction: "redirect/master/api/v1/repo/mst/deleteTrxnTypeId",
  deleteTransactionOP : 'redirect/master/api/v1/mst/excel/instrumentMasterTemplateForDelete',
  singleViewTransaction: "redirect/master/api/v1/repo/mst/getTrxnTypeId",
  viewpermissionmapping: "redirect/user/api/v1/user/view/permission/mapping",
  viewpermissionmappingbyid: "redirect/user/api/v1/user/fetch/permission/role/",
  permissiondelete: "redirect/user/api/v1/user/delete/role/permission",
  permissionactivation: "redirect/user/api/v1/user/role/permission/activation",
  Assignedpermission: "redirect/user/api/v1/user/fetch/permission/role",
  Availablepermission:
    "redirect/user/api/v1/user/fetch/permission/role/superAdmin/",
  logout: "redirect/user/api/v1/auth/logout",
  updatepermission: "redirect/user/api/v1/user/update/role/permission",
  createPermission: "redirect/user/api/v1/user/createPermission",
  editPermission: "redirect/user/api/v1/user/updatePermission",
  viewPermission: "redirect/user/api/v1/user/getPermission",
  deletePermission: "redirect/user/api/v1/user/deletePermission",
  preLoginrole: "redirect/user/api/v1/user/role/view/preLogin",
  Loginrefresh: "redirect/user/api/v1/auth/refresh",
  DownloadUserTemplate: "redirect/user/api/v1/user/downloadUserTemplate",
  allsessions: "redirect/user/api/v1/auth/fetch/sessions",
  forcelogout: "redirect/user/api/v1/auth/logout/force/",
  viewpermissions: "redirect/user/api/v1/user/view/permissions",
  logvalidate: "redirect/user/api/v1/auth/validate",
  productType: "redirect/master/api/v1/repo/mst/getProductTypedropdown",
  subAssetClass:
    "redirect/master/api/v1/repo/mst/getLookupAssetSubclassdropdown",
  assetClass: "redirect/master/api/v1/repo/mst/getLookupAssetclassdropdown",
  remappingView: "redirect/user/api/v1/clientmaster/getAllClientRemapping",
  subAssetByAsset:
    "redirect/master/api/v1/repo/mst/getLookupAssetSubclassByAssetClassId/",
  allClients:
    "redirect/user/api/v1/clientmaster/getClientsWithoutFamilyDropdown",
  allClientsList: "redirect/user/api/v1/clientmaster/getAllClients",
  activationrole: "redirect/user/api/v1/user/role/activation",
  allRelationship: "redirect/master/api/v1/repo/master/getAllMasterRelation",
  saveFamilyClientMapping:
    "redirect/user/api/v1/clientmaster/saveFamilyMapping",
  familyClientMappingList: `redirect/user/api/v1/clientmaster/getAllClientFamilyMapping`,
  familyClientMappingSingleView:
    "redirect/user/api/v1/clientmaster/getClientFamilyMappingById",
  transactionListMF: `redirect/master/api/v1/repo/mst/getAllTrxnList?insType=MUTUAL_FUND`,
  transactionListEQ: `redirect/master/api/v1/repo/mst/getAllTrxnList?insType=DIRECT_EQUITY`,
  transactionListBonds: `redirect/master/api/v1/repo/mst/getAllTrxnList?insType=BOND`,
  transactionListOtherProduct: `redirect/master/api/v1/repo/mst/getAllTrxnList?insType=OTHER_PRODUCTS`,

  // Other Masters
  geAllSebiClassMaster:
    "redirect/master/api/v1/repo/master/geAllSebiClassMaster",
  getAllMutualFund: "redirect/master/api/v1/repo/master/getAllMutualFund",
  getAllDirectEquity: "redirect/master/api/v1/repo/master/getAllDirectEquity",
  getAllMutualFundUnderLyingHoldings:
    "redirect/master/api/v1/repo/master/getAllMutualFundUnderLyingHoldings",
  ungroupClient: "redirect/user/api/v1/clientmaster/ungroupClients",
  clientWithPANForFamilyHead:
    "redirect/user/api/v1/clientmaster/getAllClinetsNameWithPANForFamilyHead",
  getFamilyHead: `redirect/user/api/v1/clientmaster/getfamilyHeads`,
  getClientByHead: `redirect/user/api/v1/clientmaster/getClientsByFamilyHead/`,
  unmapWithHead: `redirect/user/api/v1/clientmaster/ungroupClientsByHead`,
  getClientsByFamilyHead: `redirect/user/api/v1/clientmaster/getClientsWithFamilyHead`,
  unmapWithClient: `redirect/user/api/v1/clientmaster/ungroupClientsByClient`,
  getExistingHead: `redirect/user/api/v1/clientmaster/getFamilyHeadsWithClients`,
  getExistingHeadClient: `redirect/user/api/v1/clientmaster/getFamilyByHead/`,
  getHeadCandidates: `redirect/user/api/v1/clientmaster/getHeadCandidates/`,
  changeHead: `redirect/user/api/v1/clientmaster/changeFamilyHead`,
  checkDuplicateFamilyName: `redirect/user/api/v1/family/checkFamilyName/`,

  // Risk Analyzer
  getQuestionList: `redirect/user/api/v1/clientRiskProfile/getQuestionList`,
  clientRiskProfile: `redirect/user/api/v1/clientRiskProfile/save`,
  getRiskProfile: `redirect/user/api/v1/clientRiskProfile/getRiskProfile`,
  getQuestionAnswerForClient: `redirect/user/api/v1/clientRiskProfile/getQuestionAnswerForClient/`,

  //Risk Analyzer for RM or Advisor
  rmGetRiskProfileNameList: `redirect/user/api/v1/advisorriskProfile/getRiskProfileNameList`,
  rmGetAllQuestionWithResponse: `redirect/user/api/v1/advisorriskProfile/getAllQuestionWithResponse`,
  rmcreateRiskprofileName: `redirect/user/api/v1/advisorriskProfile/createRiskprofileName`,
  rmsaveQuestionList: `redirect/user/api/v1/advisorriskProfile/saveQuestionList`,

  // filtter report
  getClientDetailsByRmId: `redirect/user/api/v1/clientmaster/getClientDetailsByRmId/`,
  getFamilyMsterListByRmId: `redirect/user/api/v1/family/getFamilyMsterListByRmId/`,
  getClientAccountListByClientId: `redirect/user/api/v1/account/getClientAccountListByClientId/`,
  getAllFundsDropDown: "redirect/master/api/v1/repo/master/getAllFundsDropDown",
  getAllProductClassMst: `redirect/master/api/v1/repo/mst/getAllProductClassMst`,
  fetchAllAmcNamesByProduct:
    "redirect/master/api/v1/repo/master/fetchAllAmcNamesByProduct?",
  fetchAllProduListFromHolding:
    "redirect/master/api/v1/repo/master/fetchAllProduListFromHolding",
  // Funt Analytics
  getFundCompareDropdown: `redirect/master/api/v1/rm/dashboard/getFundCompareDropdown/`,
  getAMCName: `redirect/master/api/v1/rm/dashboard/getAMCName`,
  getNavValues: `redirect/master/api/v1/rm/dashboard/getNavValues?timeRange=1Y`,

  //Operation User
  getClinetAnalysis: `redirect/user/api/v1/clientmaster/getClinetAnalysis`,
  getProductAllocation: `redirect/master/api/v1/repo/clientdashboard/getProductAllocation`,
  getAllAssetAllocation: `redirect/master/api/v1/repo/clientdashboard/getAllAssetAllocation`,
  aumReportbyFundHouse: `redirect/master/api/v1/repo/clientdashboard/aumReportbyFundHouse`,
  aumReportForOpUser: `redirect/master/api/v1/repo/clientdashboard/aumReportForOpUser`,
  getInvesterDetails: `redirect/master/api/v1/repo/clientdashboard/getInvesterDetails`,
  getSchemesByAMCName: `redirect/master/api/v1/repo/clientdashboard/getSchemesByAMCName/`,
  incentiveUpload: `redirect/master/api/v1/repo/master/incentiveExcelDownload`,
  globalSearchFilter: `redirect/master/api/v1/repo/mst/getSubCategoryByCategoryName`,
  globalSearchIMDE: `redirect/master/api/v1/repo/mst/directEquityDetailsBySearchValue/`,
  globalSearchIMMF: `redirect/master/api/v1/repo/mst/mfDetailsBySearchValue/`,
  globalSearchTransaction: `redirect/master/api/v1/repo/mst/trxnListBySearchValue/`,
  globalSearchVMDE: `redirect/master/api/v1/repo/mst/directEquityValuationBySearchValue/`,
  globalSearchVMMF: `redirect/master/api/v1/repo/mst/mutualFundValuationBySearchValue/`,

  // Capital Gain
  getSchemeNameFolio: `redirect/master/api/v1/capitalGain/getSchemeNameFolio/V2`,

  getClientListByOperation: `redirect/user/api/v1/clientmaster/getClientDetailsByOpUesrId/`,
  getAccountID: `redirect/api/v1/account/getClientAccountListByClientId/`,

  addPersonalDetails: "redirect/user/api/v1/clientmaster/addPersonalDetails",
  addJointHoldingDetails: "redirect/user/api/v1/clientmaster/addJointHoldingDetails",

  RmListapi: "redirect/user/api/v1/rmadvisor/getAllRmDetails",
  clientOnboardingStepDetails : 'redirect/user/api/v1/clientmaster/getAllOnboardingStepDetails',
  getOnboardingStepDetails:
  "redirect/user/api/v1/clientmaster/getOnboardingStepDetails/",
  addNomineeDetails : 'redirect/user/api/v1/clientmaster/addNomineeDetails',
  addBankDetails : 'redirect/user/api/v1/clientmaster/addBankDetails',
  addFatcails : 'redirect/user/api/v1/clientmaster/addFatca',
  fileDownload : `redirect/file/api/v1/files/download/`,
  familyListV2 : `redirect/user/api/v1/rmadvisor/getAllFamilyV2`
};
