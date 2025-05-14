import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import Pagehader from "../../../Layout/Pagehader";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";
import { useForm } from "react-hook-form";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import toast from "react-hot-toast";

export default function ChangeFamilyHead() {
  const [loading, setLoading] = useState(false);
  const [familyHeadView, setFamilyHeadView] = useState(false);
  const [clientView, setClientView] = useState(false);
  const [allExistingFamilyHead, setAllExistingFamilyHead] = useState([]);
  const [allNewFamilyHead, setAllNewFamilyHead] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showClientTable, setShowClientTable] = useState(false);
  const [option, setOption] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedFamilyHead, setSelectedFamilyHeadId] = useState("");
  const [selectedNewFamilyHead, setSelectedNewFamilyHeadId] = useState("");


  const [selectedValues, setSelectedValues] = useState([]);

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const breadcrumbItems = [
     
      
      {
        label: "Change Head",        
        patth: "/" + encrypt("ChangeFamilyHead"),
      }
      
    ];

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

  //EDIT USER
  const navigate = useNavigate();

 useEffect(() => {
  fetchExistingFamilyHeadList();
 }, [])
 

  

  const fetchExistingFamilyHeadList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getExistingHead);
      setLoading(false);
      setAllExistingFamilyHead([]);
      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.familyHeadName,
          value: item.familyHeadId,
        };
        setAllExistingFamilyHead((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewHeadList = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getHeadCandidates + id);
      setLoading(false);
      setAllNewFamilyHead([]);
      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllNewFamilyHead((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExistingFamilyHeadSelect = (e) => {
    setShowTable(true);
    setSelectedFamilyHeadId(e.value)
    fetchClientListForFamilyHead(e.value);
    fetchNewHeadList(e.value);
  };

  const handleNewFamilyHeadSelect = (e) => {
    setSelectedNewFamilyHeadId(e.value)
  };

  const fetchClientListForFamilyHead = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getExistingHeadClient + id);
      setLoading(false);
      setRowData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const columnDefs = [
   
    {
      headerName: t("Common:App_lms_Common_00006"),
      field: "srNo",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Family Head Name",
      field: "familyHeadName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Client Name",
      field: "memberClientNames",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.memberClientNames == null ||
          params.data.memberClientNames === ""
          ? "-"
          : params.data.memberClientNames;
      },
    },
    {
      headerName: "Relation",
      field: "relation",
      minWidth: 210,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.memberRelations == null ||
          params.data.memberRelations === "" || params.data.memberRelations === "N/A"
          ? "-"
          : params.data.memberRelations;
      },
    },
   
  
  ];

 

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
    }; // Alternating colors
  };

 
  const handleChangeHead = async () => {
      setLoading(true);
      let clientId = selectedValues.flatMap((item) => item.memberClientIds);
      const Data = {
        oldHeadId:selectedFamilyHead,
        newHeadId:selectedNewFamilyHead,
        clientIds:clientId
      }

      try {
        const response = await axiosInstance.post(Apiurl.changeHead, Data);
        toast.success("Successfully changed family head");
      setTimeout(() => {
        // navigate(
        //   "/" + encrypt("ChangeFamilyHead")
        // );
        window.location.reload();
      }, 200);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error during POST request:", error.message);
      } finally {
        setLoading(false);
      }
    
    
  }
 
  const handleSelectValue = (params) => {
    console.log("params",params)
    setSelectedValues(params)
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
              breadcrumbItems
            }
          ></Pagehader>
          <div className="pagebody">
            
            <div className="row formMainDiv">
                            <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="ExistingFamilyHeadName"
                    mandatory={true}
                    labelName="Select Existing Family Head"
                    options={allExistingFamilyHead}
                    onSelect={(e) => handleExistingFamilyHeadSelect(e)}
                    divClassName={"divClassName"}
                    previewFlag={false}
                    isMulti={false}
                  />
                </div>

                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="NewFamilyHeadName"
                    mandatory={true}
                    labelName="Select New Family Head"
                    options={allNewFamilyHead}
                    onSelect={(e) => handleNewFamilyHeadSelect(e)}
                    divClassName={"divClassName"}
                    previewFlag={false}
                    isMulti={false}
                  />
                </div>
                </div>
                <div>
                              { showTable && <>
                                <AgTable
                                  columnDefs={columnDefs}
                                  rowData={rowData}
                                  filenames="Client List"
                                  StyleClass="btn btn-primary"
                                  type="table"
                                  gridOptions={{
                                    getRowStyle                  
                                  }}
                                  isRowSelection = {true}
                                  onSelectedGetValue = {handleSelectValue}
                                />
                              </>}
                              </div>
                              <div className="d-flex gap-3">
            {selectedValues.length == 0 ? null :
               <ButtonComp
                                              wrapperName={"download_temp_wrapper"}
                                              type="button"
                                              btnStyle="box"
                                              btnText={"Change Head"}
                                              onClick={() => handleChangeHead()}
                                            /> }
                          </div>
            <div>
          
             
            </div>
            
          </div>
        </>
      )}
    </>
  );
}
