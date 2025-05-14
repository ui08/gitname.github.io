import { jwtDecode } from "jwt-decode";
import { getLoginType, getToken } from ".";
import { decryptData } from "./CryptoJS";

export default function AuthorizedFunction(roles) {
  const isAuthorized = () => {
    const decoded = jwtDecode(getToken()); // Replace with the actual function to get the token
    const decodedRoles = decoded.roles; // Assuming `roles` are in decoded.roles

    if (decodedRoles && roles) {
      // Check if any of the provided roles exist in the decoded roles
      return roles.some((r) => decodedRoles.includes(r));
    }
    return false;
  };

  return isAuthorized();
}



export const filtercurrentRole = () => {
  const decoded = jwtDecode(getToken());
  const rolesresult = decoded.roles.filter(
    (x) => x === decryptData(getLoginType())
  );

  return rolesresult;
};
