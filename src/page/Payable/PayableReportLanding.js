import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import ButtonComp from "./../../Component/ButtonComp/ButtonComp";
import Pagehader from "./../../Layout/Pagehader";
import {
  decryptData,
  encrypt,
  encryptData,
} from "./../../util/Authenticate/CryptoJS";
import Loader from "./../../util/Loader";
import { PayablePageurl } from "./PayablePageurl";
import { useForm } from "react-hook-form";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import PayableReportList from "./PayableReportList";
import InputDatePicker from "../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";

// import IncentiveReportList from "./PayableReportList";
// import IncentiveReportListRm from "./PayableReportListDefine";

export default function PayableReportLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  const [showReport, setShowReport] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  } = useForm();
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };

  const handleViewReport = () => {
    setShowReport(true)
  }

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00269")}
            Breadcrumbshow={true}
            breadcrumbItems={
             
                PayablePageurl.PayableReport
             
            }
          ></Pagehader>
          <div className="pagebody">
            <div className = "row">
       
                                    <div className="col-12 col-md-3 col-lg-3">
                                                        <InputDatePicker
                                                          control={control}
                                                          setValue={setValue}
                                                          errors={errors}
                                                          labelName="Select Month"
                                                          registerName="asondate"
                                                          mandatory={true}
                                                          dateformat="DD/MM/YYYY"
                                                          disabled={false}
                                                          minDateVal={null} // Optional: Specify the minimum date
                                                          maxDateVal={dayjs()} // Disable future dates
                                                        />{" "}
                                                      </div>
                                                      <div className="col-12 col-md-3 col-lg-3 d-flex gap-3 mt-3">
                                                  <ButtonComp
                                                    wrapperName={"download_temp_wrapper"}
                                                    type="button"
                                                    btnStyle="box"
                                                    btnText={"View"}
                                                    onClick={() => {
                                                      handleViewReport();
                                                    }}
                                                  />
                                                </div>
                                    </div>
                                    
          
            {showReport &&
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              { <PayableReportList />}
            </div>}
          </div>
        </>
      )}
    </>
  );
}
