import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import InputText from "../../Component/ComponentsInput/InputText.js";
import { getAssumingRole } from "../../util/Authenticate/index.js";
import Loader from "../../util/Loader.js";
import { Apiurl } from "../../util/apiurl.js";
import axiosInstance from "../../util/axiosInstance.js";
import ButtonComp from "./../../Component/ButtonComp/ButtonComp";
import NodataFileLoaderWithouticon from "./../../util/NodataFileLoaderWithouticon";
import "./AccessRightMasterFormComponent.scss";
function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
const UpdateFormComponent = ({ initialData }) => {
  const [allrole, setAllrole] = useState([]);
  const [onSelectrole, setonSelectrole] = useState();
  console.log("onSelectrole", onSelectrole, typeof onSelectrole);
  

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
  } = useForm({ defaultValues: initialData });
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  useEffect(() => {
    Getallrole();
    return () => {};
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flteredItemsloading, setfilteredItemsloading] = useState(false);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  // /fetch/permission/role/{roleId}

  const Getallrole = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getallrole);
      setLoading(false);
      setAllrole([]);
      console.log(getAssumingRole());
      Object.values(response.data)
        .filter((x) => x.roleName != getAssumingRole()[0])
        .map((item) => {
          if (value == item.roleName) {
            setValue("Role", {
              label: item.displayName,
              value: item.roleId,
              roleName: item.roleName,
            });
            GetallsupervisorRolebyRole(item.roleId, initialData.Supervisorrole);
          }
          let SingleData = {
            label: item.displayName,
            value: item.roleId,
            roleName: item.roleName,
          };
          setAllrole((prev) => [...prev, SingleData]);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablepermission = async (roleId) => {
    setfilteredItemsloading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.Availablepermission + roleId
      );
      const result = await response.data;
      setLeft([]);
      Object.values(result)
        .filter((x) => x.mappingActiveFlag === true)
        .map((item) => {
          let SingleData = {
            label: item.permissionName,
            value: item.id,
            permissionDesc: item.permissionDesc,
          };
          setLeft((prev) => [...prev, SingleData]);
        });
      setfilteredItemsloading(true);
    } catch (error) {
      setfilteredItemsloading(false);
    } finally {
    }
  };
  const fetchAssignedpermission = async (userId) => {
    setfilteredItemsloading(false);
    try {
      const response = await axiosInstance.get(
        Apiurl.Assignedpermission + "/" + userId
      );
      const result = await response.data;
      setRight([]);
      Object.values(result)
        .filter((x) => x.mappingActiveFlag === true)
        .map((item) => {
          let SingleData = {
            label: item.permissionName,
            value: item.id,
            permissionDesc: item.permissionDesc,
          };
          setRight((prev) => [...prev, SingleData]);
        });
      setfilteredItemsloading(true);
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    console.log("right", leftChecked);
    handleCheckedfilter("leftright", leftChecked);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    console.log("rightleft", rightChecked);
    handleCheckedfilter("rightleft", rightChecked);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleCheckedfilter = (permissiontype, permission) => {
    let RoleValues = getValues("Role");
    const tempermission = permission.map((permission) => permission.value);
    let payload;
    if (permissiontype == "rightleft") {
      payload = {
        roleId: parseInt(RoleValues.value),
        updatePermissionList: [],
        deletePermissionList: tempermission,
      };
    }
    if (permissiontype == "leftright") {
      payload = {
        roleId: parseInt(RoleValues.value),
        updatePermissionList: tempermission,
        deletePermissionList: [],
      };
    }
    submitData(payload);
  };
  

  const customList = (title, items, searchTerm, setSearchTerm) => {
    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="PermissionslistChoicesselected">
        <div className="Permissionslistselectedtitle">
          <p className="titletext">{title}</p>
          <div className="mt-4 d-flex align-items-center justify-content-start">
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
          </div>
          <div className="checkboxdiv mt-1">
            <Checkbox
              className="checkboxdivCheckboxtitletext"
              onClick={handleToggleAll(filteredItems)}
              checked={
                numberOfChecked(filteredItems) === filteredItems.length &&
                filteredItems.length !== 0
              }
              indeterminate={
                numberOfChecked(filteredItems) !== filteredItems.length &&
                numberOfChecked(filteredItems) !== 0
              }
              disabled={filteredItems.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
            <div className="checkboxdivtitletext">{`${numberOfChecked(
              filteredItems
            )}/${filteredItems.length} Selected Permissions`}</div>
          </div>
          <div className="checkboxbr ">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Search"
            registerName={title}
            name={title}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={false}
            onChange={(e) => setSearchTerm(e.target.value)}
            divClassName={"divClassName m-0"}
          />
          </div>
       
        </div>

        <div className="Permissionslistselectedcard">
          {!flteredItemsloading ? (
            <NodataFileLoaderWithouticon />
          ) : (
            <>
              {filteredItems.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                  <div
                    key={value.value}
                    className="listitem"
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.includes(value)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.label}`} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  };

  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // Submit login data to the API
  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.updatepermission,
        payload
      );
      const tokenData = response.data;
      toast.success("Permission Update");
      setLoading(false);
    } catch (error) {
      // toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div className="row ">
            <div className="col-md-1 p-0"></div>
            <div className="col-12 col-md-4 col-lg-4 mb-2">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="Role"
                mandatory={true}
                labelName="Select Role"
                options={allrole}
                onSelect={(e) => {
                  fetchAvailablepermission(e.value);
                  fetchAssignedpermission(e.value);
                  setonSelectrole(e.value);
                }}
                divClassName={"divClassName"}
              />
            </div>
          </div>
          {onSelectrole && (
            <div className="row justify-content-center">
              <div className="col-md-10 col-12">
                <div className="row justify-content-center Permissionslist ">
                  <div className="col-md-5 col-12 PermissionslistChosen">
                    {customList(
                      "Available Permissions list",
                      left,
                      leftSearch,
                      setLeftSearch
                    )}
                  </div>
                  <div className="col-md-2 col-12 PermissionslistButtonComp">
                    <ButtonComp
                      wrapperName={"download_temp_wrapper"}
                      type="button"
                      btnStyle="box"
                      btnText={"Assign"}
                      disabled={leftChecked.length === 0}
                      onClick={handleCheckedRight}
                    />
                    {onSelectrole !== 1 ?  
                    <ButtonComp
                      wrapperName={"download_temp_wrapper"}
                      type="button"
                      btnStyle="box"
                      btnText={"Remove"}
                      disabled={rightChecked.length === 0}
                      onClick={handleCheckedLeft}
                    /> : <></>
                    }
                  </div>
                  <div className="col-md-5 col-12 PermissionslistChosen">
                    {customList(
                      "Assigned Permissions list",
                      right,
                      rightSearch,
                      setRightSearch
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UpdateFormComponent;
