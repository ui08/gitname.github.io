import { TenantMaster } from "./TenantMaster";

export const TenantFunction = (host) => {
  const Tenant = TenantMaster;
    return Tenant.filter((x) => x.tenantHost === host).map(
      (item) => item.tenantName
    );


};

export const TenantThemeFunction = (host) => {
  const Tenant = TenantMaster;
    return Tenant.filter((x) => x.tenantHost === host).map(
      (item) => item.tenantThemeCode
    );

    
};


// let urlString = window.location.href;
// let partsUrl = urlString.split("/");
// let appProtocol = partsUrl[0]; // '
// let appHostname = location.hostname; //