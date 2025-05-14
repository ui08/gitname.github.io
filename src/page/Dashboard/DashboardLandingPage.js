import { useState } from "react";
import { getsessionStorage } from "../../util/Authenticate";
import RouteCurrentAuthorities from "../../util/Authenticate/AuthorizedFunction";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
import { userRole } from "../../util/Authenticate/Rolename";
import Loader from "../../util/Loader";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import Defaultdashboard from "./Defaultdashboard/Defaultdashboard";
import OperationDashboard from "./OperationDashboard/OperationDashboard";
import Rmdashboard from "./RmDashboard/Rmdashboard";

export default function DashboardLandingPage() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!loading ? (
        <div>
          {RouteCurrentAuthorities([userRole.Client_Dashboard]) ||
          decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true" ? (
            <ClientDashboard />
          ) : RouteCurrentAuthorities([
              userRole.Operation_Manager_Dashboard,
            ]) ? (
            <OperationDashboard />
          ) : RouteCurrentAuthorities([
              userRole.Relationship_Manager_Dashboard,
            ]) ? (
            <Rmdashboard />
          ) : (
            <Defaultdashboard />
          )}
          {/* <ClientDashboard /> */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
