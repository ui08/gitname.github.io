import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import Pagehader from "../../../Layout/Pagehader";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import IncentiveReportList from "./IncentiveReportList";
import IncentiveReportListRm from "./IncentiveReportListRm";
import { IncentiveReportListPageurl } from "./IncentiveReportPageurl";
import { useForm } from "react-hook-form";
import InputText from "../../../Component/ComponentsInput/InputText";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";
import Accordion from "./Accordion";
import AccordionData from "./Accordion";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import IncentiveReportListRM from "./IncentiveReportListRm";

export default function IncentiveRMLanding() {
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
setValue('fromDate','')
setValue('toDate','')

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

  const viewReport = () => {
    setShowReport(true)
  };
  
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
             
                 IncentiveReportListPageurl.OtherProductsList
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
          <div className="col-12 col-md-3 col-lg-3">
                                                        <InputDatePicker
                                                          control={control}
                                                          setValue={setValue}
                                                          errors={errors}
                                                          labelName="From Date"
                                                          registerName="fromDate"
                                                          mandatory={true}
                                                          dateformat="DD/MM/YYYY"
                                                          disabled={false}
                                                          minDateVal={null} // Optional: Specify the minimum date
                                                          maxDateVal={dayjs()} // Disable future dates
                                                        />{" "}
                                                      </div>  <div className="col-12 col-md-3 col-lg-3">
                                                        <InputDatePicker
                                                          control={control}
                                                          setValue={setValue}
                                                          errors={errors}
                                                          labelName=" To Date"
                                                          registerName="toDate"
                                                          mandatory={true}
                                                          dateformat="DD/MM/YYYY"
                                                          disabled={false}
                                                          minDateVal={null} // Optional: Specify the minimum date
                                                          maxDateVal={dayjs()} // Disable future dates
                                                        />{" "}
                                                      </div>

                                                      <div className="mt-3">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"View"}
                onClick={() => {
                  viewReport();
                }}
              />
              </div>
              </div>
           
            {showReport  && (
              <>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">

            <IncentiveReportListRM />
              </div>
              </>
            )}
          </div>
        </>
      )}
     
    </>
  );
}
