import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import Pagehader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";

export default function FamilyClientMappingUnmapFormComponent() {
  const [loading, setLoading] = useState(false);
  const [familyHeadView, setFamilyHeadView] = useState(true);
  const [clientView, setClientView] = useState(false);
  const [allFamilyHead, setAllFamilyHead] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showClientTable, setShowClientTable] = useState(false);
  const [option, setOption] = useState("Head");
  const [rowData, setRowData] = useState([]);
  const [selectedFamilyHead, setSelectedFamilyHeadId] = useState("");

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
      label: "Family Client Mapping",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: "List",
      patth:
        "/" + encrypt("FamilyClientMappingLanding") + `/${encryptData("List")}`,
    },
    {
      label: "Unmap",
    },
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

  const fetchFamilyHead = () => {
    setFamilyHeadView(true);
    setOption("Head");
    setClientView(false);
    setShowClientTable(false);
    fetchFamilyHeadList();
  };

  const fetchClient = () => {
    setFamilyHeadView(false);
    setOption("Client");
    setClientView(true);
    setShowTable(false);
    fetchClientList();
    setShowClientTable(true);
  };

  const fetchFamilyHeadList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getFamilyHead);
      setLoading(false);
      setAllFamilyHead([]);
      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.familyHeadName,
          value: item.familyHeadId,
        };
        setAllFamilyHead((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getClientsByFamilyHead);
      setLoading(false);
      setRowData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFamilyHeadSelect = (e) => {
    setShowTable(true);
    setSelectedFamilyHeadId(e.value);
    fetchClientListForFamilyHead(e.value);
  };

  const fetchClientListForFamilyHead = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getClientByHead + id);
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
      headerName: "Client Name",
      field: "clientName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Relation",
      field: "relation",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
  ];

  const columnDefsClient = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      field: "srNo",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Family Head Name",
      field: "familyHeadClientName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Client Name",
      field: "memberClientNames",
      cellRenderer: (params) => {
        if (
          params.data.memberClientNames == null ||
          params.data.memberClientNames.length === 0 // Check if the array is empty
        ) {
          return "-";
        }
        return params.data.memberClientNames.map((item) => item + " ").join("");
      },

      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Relation",
      field: "relation",
      cellRenderer: (params) => {
        return params.data.relation == null ||
          params.data.relation === "" ||
          params.data.relation === "N/A"
          ? "-"
          : params.data.relation;
      },
      minWidth: 250,
      sortable: true,
      filter: true,
    },
  ];

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
    }; // Alternating colors
  };

  const handleSelectValue = (params) => {
    console.log("params", params);
    setSelectedValues(params);
  };

  const handleUnmap = async (value) => {
    if (value == "Head") {
      setLoading(true);
      let clientId = selectedValues.map((item) => item.clientId);
      const Data = {
        familyHeadId: selectedFamilyHead,
        clientIds: clientId,
      };
      console.log("clientId", Data);

      try {
        const response = await axiosInstance.post(Apiurl.unmapWithHead, Data);
        toast.success("Successfully unmapped");
        setTimeout(() => {
          navigate(
            "/" +
              encrypt("FamilyClientMappingLanding") +
              `/${encryptData("List")}`
          );
        }, 200);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error during POST request:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      let clientId = selectedValues.map((item) => item.memberClientIds[0]);
      const Data = {
        clientIds: clientId,
      };
      console.log("clientId", Data);

      try {
        const response = await axiosInstance.post(Apiurl.unmapWithClient, Data);
        toast.success("Successfully unmapped");
        setTimeout(() => {
          navigate(
            "/" +
              encrypt("FamilyClientMappingLanding") +
              `/${encryptData("List")}`
          );
        }, 200);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error during POST request:", error.message);
      } finally {
        setLoading(false);
      }
    }
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
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3 mt-3">
              {RouteCurrentAuthorities([userRole.Family_Unmap_Family_Head]) && (
                //
                <button
                  className={
                    familyHeadView ? "Familybtn actFamily" : "Familybtn"
                  }
                  onClick={fetchFamilyHead}
                >
                  By Family Head
                </button>
              )}

              {RouteCurrentAuthorities([userRole.Family_Unmap_Client]) && (
                // <ButtonComp
                //   wrapperName={"download_temp_wrapper"}
                //   type="button"
                //   btnStyle="box"
                //   btnText={"By Client"}
                //   onClick={fetchClient}
                // />
                <button
                  className={
                    clientView && showClientTable
                      ? "Clientbtn actClient"
                      : "Clientbtn"
                  }
                  onClick={fetchClient}
                >
                  By Client
                </button>
              )}
            </div>
            <div>
              {familyHeadView && (
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="FamilyHeadName"
                    mandatory={true}
                    labelName="Select Family Head"
                    options={allFamilyHead}
                    onSelect={(e) => handleFamilyHeadSelect(e)}
                    divClassName={"divClassName"}
                    previewFlag={false}
                    isMulti={false}
                  />
                </div>
              )}
            </div>
            <div>
              {clientView && showClientTable && (
                <>
                  <AgTable
                    columnDefs={columnDefsClient}
                    rowData={rowData}
                    filenames="Client List"
                    StyleClass="btn btn-primary"
                    type="table"
                    gridOptions={{
                      getRowStyle,
                    }}
                    isRowSelection={true}
                    onSelectedGetValue={handleSelectValue}
                  />
                </>
              )}
              {showTable && (
                <AgTable
                  columnDefs={columnDefs}
                  rowData={rowData}
                  filenames="Client Under Family Head"
                  StyleClass="btn btn-primary"
                  type="table"
                  gridOptions={{
                    getRowStyle,
                  }}
                  isRowSelection={true}
                  onSelectedGetValue={handleSelectValue}
                />
              )}
              <div className="d-flex gap-3">
                {selectedValues.length > 0 ? (
                  <ButtonComp
                    wrapperName={"download_temp_wrapper"}
                    type="button"
                    btnStyle="box"
                    btnText={"Client Unmap"}
                    disabled={selectedValues.length == 0}
                    onClick={() => handleUnmap(option)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
