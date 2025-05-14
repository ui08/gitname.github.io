import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../util/Loader";
import ClientReportsFormComponent from "./ClientReportsFormComponent";
const ClientXIRRReports = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleFormSubmit = (data) => {
    // console.log("Received form data:", data);
    setFormData(data);
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <ClientReportsFormComponent
            />
          </div>
          
        </>
      )}
    </>
  );
};

export default ClientXIRRReports;
