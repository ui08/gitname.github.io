import { getAccess } from ".";
import { decryptData } from "./CryptoJS";
import { getToken, getUserTenant } from "./index";
import { TenantMaster } from "./TenantMaster";

export const getTenantkey = () => {
  let urlString = window.location.href;
  let partsUrl = urlString.split("/");
  let appProtocol = partsUrl[0]; // '
  let appHostname = location.hostname; //
  if (decryptData(getAccess()) === "false" && getToken() === null) {
    return TenantMaster.filter((x) => x.tenantHost === appHostname).map(
      (item) => item.tenantName
    );
  } else if (getToken() !== null && decryptData(getAccess())) {
    if (getUserTenant() === null) {
      return TenantMaster.filter((x) => x.tenantHost === appHostname).map(
        (item) => item.tenantName
      );
    } else {
      return getUserTenant();
    }
    // getUserTenant
  } else {
    return TenantMaster.filter((x) => x.tenantHost === appHostname).map(
      (item) => item.tenantName
    );
  }
};

export const getTenantThemekey = () => {
  let urlString = window.location.href;
  let partsUrl = urlString.split("/");
  let appProtocol = partsUrl[0]; // '
  let appHostname = location.hostname; //

  let apptenantThemeName = TenantMaster.filter(
    (x) => x.tenantHost === appHostname
  ).map((item) => item.tenantThemeName);
  return apptenantThemeName[0];
};
