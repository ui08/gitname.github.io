import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";

const ForgotUserIdFormComponent = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    const Data = {
      username: "emilys", //data.username, //"emilys",
      password: "emilyspass", //data.password, //"emilyspass",
      expiresInMins: 1,
    };

    submitData(Data);
  };

  const submitData = async (payload) => {
    // try {
    //   const response = await axiosInstance.post(Apiurl.authlogin, payload);

    //   toast.success("ok");
    //   const tokendata = response.data;
    //   validateJwt(tokendata.accessToken);
    //   validateJwt(tokendata.refreshToken);
    //   login(tokendata.accessToken, tokendata.refreshToken);
    //   navigate("/");
    //   window.location.reload(true);
    //   // setModalOpen(true); // Open modal on successful submission
    // } catch (error) {
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleAction = () => {
    setModalOpen(false);
    navigate("/"); // Navigate to home page
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <div className="apph100 d-flex align-content-center container-fluid">
       
          <FormComponent onSubmit={handleAddSubmit}  />
        </div>
      )}
    </>
  );
};

export default ForgotUserIdFormComponent;
