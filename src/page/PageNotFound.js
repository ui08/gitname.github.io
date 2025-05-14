import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../Component/ButtonComp/ButtonComp";
import { getsessionStorage, setsessionStorage } from "../util/Authenticate";
import {
  decryptData,
  encrypt,
} from "../util/Authenticate/CryptoJS";
import Loader from "../util/Loader";

const PageNotFound = () => {
  const [loading, setLoading] = useState(false);
  const [divShow, setDivShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Simulating a 1-second delay for the loading state
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const counter = decryptData(getsessionStorage(encrypt("counter")));
    if (counter === "1") {
      setDivShow(true); // Show the "div" or a loading spinner before redirect
      setsessionStorage(encrypt("counter"), "4"); // Change the counter value to 4

      window.location.reload();
    } else {
      setDivShow(false); // Hide div if counter is not 1
    }
  }, [navigate]);

  const handleNavigate = useCallback(() => {
    navigate("/"); // Navigate to the homepage
  }, [navigate]);

  return (
    <>
      {loading ? (
        <Loader pagename="Page Not Found..." />
      ) : (
        <>
          {!divShow ? (
            <section className="container404 mt-3">
              <div className="center">
                <div className="block text-center">
                  <h1 className="error-code">404</h1>
                  <h3>Page Not Found</h3>
                  <p className="error-message">
                    The link you clicked may be broken or the
                    <br />
                    page may have been removed.
                  </p>

                  <ButtonComp
                    wrapperName="submit_btn_wrapper"
                    type="submit"
                    btnStyle="box"
                    btnText={"Visit Homepage"}
                    disabled={false}
                    onClick={handleNavigate} // Navigate back to the homepage
                  />
                </div>
              </div>
            </section>
          ) : (
            <Loader pagename="Redirecting to Dashboard..." /> // Show a loading message
          )}
        </>
      )}
    </>
  );
};

export default PageNotFound;
