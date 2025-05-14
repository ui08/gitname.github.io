import { jwtDecode } from "jwt-decode"; // Assuming you're using this for decoding the JWT token
import { Navigate } from "react-router-dom";
import { getToken } from "."; // Replace with the actual function to get the token

export default function RouteCurrentAuthorities(roles) {
  // Check if roles are being passed correctly

  // // console.log("Requested roles for authorization:", roles);

  const isAuthorized = () => {
    try {
      const token = getToken(); // Retrieve the token
      if (!token) {
        console.error("No token found.");
        return false;
      }

      const decoded = jwtDecode(token); // Decode the JWT token
      const decodedRoles = decoded.authorities; // Extract the authorities from the decoded token
      // console.log("Requested roles for authorization:", decodedRoles);
      if (!decodedRoles || decodedRoles.length === 0) {
        console.error("No roles or authorities found in token.");
        return false;
      }

      // If roles is a string, wrap it in an array for consistency
      if (typeof roles === "string") {
        roles = [roles];
      }

      // Check if any of the requested roles exist in the decoded roles
      const isRolePresent = roles.some((role) => decodedRoles.includes(role));

      if (isRolePresent) {
        // console.log("User is authorized with roles:", roles);
      } else {
        // console.log("User is NOT authorized for roles:", roles);
        <Navigate to="/" />;
      }

      return isRolePresent;
    } catch (error) {
      console.error("Error during role authorization check:", error);
      return false;
    }
    return true;
  };

  return isAuthorized();
}
