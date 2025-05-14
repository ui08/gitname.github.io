import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "./assets/plaza.css";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./page/AppRoute/ProtectedRoute";

import Public from "./page/AppRoute/Public";
import {
  getAccess,
  getsessionStorage,
  removeAccess,
  removeToken,
  removeUser,
  setsessionStorage
} from "./util/Authenticate";
import { decryptData, encrypt } from "./util/Authenticate/CryptoJS";
import { IdleTimeoutProvider } from "./util/Authenticate/IdleTimeoutContext";
import { getTenantThemekey } from "./util/Authenticate/TenantMasterconfig";
import { ChartThememaster, Thememaste } from "./util/Authenticate/Thememaste";
function App() {
  const logoutCounter = getsessionStorage(encrypt("counter"));
  useEffect(() => {
    if (decryptData(logoutCounter) === "3") {
      removeAccess();
      removeToken();
      removeUser();
      
    }
  }, [logoutCounter]);


  useEffect(() => {
    applyTheme(getTenantThemekey());
    applyChartsTheme(getTenantThemekey());
  }, []);
  const applyTheme = (variables) => {
    const root = document.documentElement;
    const theme = Thememaste[variables];
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
  };

  const applyChartsTheme = (variables) => {
    const theme = ChartThememaster[variables];
    setsessionStorage(encrypt("ChartColors"), JSON.stringify(theme));
  };


  
  return (
    <BrowserRouter>
      <Routes>
        {decryptData(getAccess()) === false ||
        decryptData(getAccess()) === "false" ||
        decryptData(getAccess()) === null ||
        decryptData(getAccess()) === "null" ||
        decryptData(getAccess()) === undefined ||
        decryptData(getAccess()) === "undefined" ? (
          <Route path="/*" element={<Public />} />
        ) : (
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <IdleTimeoutProvider>
                  <MainLayout />
                </IdleTimeoutProvider>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
export const logomaster = (token) => {};
export default App;
