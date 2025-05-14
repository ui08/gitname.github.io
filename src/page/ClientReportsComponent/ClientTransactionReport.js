import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../util/Loader";
import ClientReportsFormComponent from "./ClientReportsFormComponent";
const ClientTransactionReport = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <ClientReportsFormComponent />
          </div>
        </>
      )}
    </>
  );
};

export default ClientTransactionReport;
