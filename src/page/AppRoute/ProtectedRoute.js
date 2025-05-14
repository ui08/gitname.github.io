import { Navigate } from "react-router-dom";
import { encrypt } from "../../util/Authenticate/CryptoJS";
import { getsessionStorage } from '../../util/Authenticate/index';

const ProtectedRoute = ({ children }) => {
  const token = getsessionStorage(encrypt("jwt-secret-app"));

  return token ? children : routeFunction();
};

export default ProtectedRoute;
function routeFunction() {
  return <Navigate to="/" />;
}
