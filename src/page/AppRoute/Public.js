import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { encrypt } from "../../util/Authenticate/CryptoJS";
import Redirectslogout from "../../util/Authenticate/Redirectslogout";
import ForgotPasswordFormComponent from "../Authenticate/ForgotPasswordFormComponent";
import ForgotUserIdFormComponent from "../Authenticate/ForgotUserIdFormComponent";
import LoginFormComponents from "../Authenticate/LoginFormComponent";
import SignupFormComponent from "../Authenticate/SignupFormComponent";
import ClientDashboard from "../Dashboard/ClientDashboard/ClientDashboard";
import PageNotFound from "../PageNotFound";


// Import the NotFound component
// const NotFound = React.lazy(() => import("../page/PageNotFound"));
import CSVChartVisualizer from './CSVChartVisualizer';

export default function Public() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* <Route path="/" element={<LoginFormComponents />}></Route> */}
        <Route path="/login" element={<LoginFormComponents />}></Route>
        <Route path="/SignUp" element={<SignupFormComponent />}></Route>
        <Route
          path="/ForgotPassword"
          element={<ForgotPasswordFormComponent />}
        ></Route>
        <Route
          path="/ForgotUser"
          element={<ForgotUserIdFormComponent />}
        ></Route>
        <Route
          path={"/" + encrypt("ClientDashboard")}
          element={<ClientDashboard />}
        />
        <Route path="/login/rm" element={<LoginFormComponents />}></Route>
        <Route
          path="/login/superadmin"
          element={<LoginFormComponents />}
        ></Route>
        <Route
          path={
            "/" +
            encrypt("Redirectslogout") +
            "/:roles" +
            "/:action" +
            "/:NavigateM"
          }
          element={<Redirectslogout />}
        ></Route>
        <Route path={"/" + "CSVChartVisualizer"} element={<CSVChartVisualizer />}></Route>

        <Route
          path="*"
          element={
            <PageNotFound
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
