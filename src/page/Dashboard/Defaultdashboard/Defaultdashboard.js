import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../Layout/Pagehader";
import Loader from "../../../util/Loader";
import NewsSlider from "./../NewsSlider";
import UserCreationListLanding from "../../UserCreation/UserCreationListLanding";

export default function Defaultdashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("Test");
  const breadcrumbItems = [{ label: "Dashboard" }];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader pagename="Dashboard" />
      ) : (
        <>
          <UserCreationListLanding />
        </>
      )}
    </>
  );
}
