import { t } from "i18next";
import toast from "react-hot-toast";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

export const DownloadTemplateFunction = async (payload) => {
  // const { t } = useTranslation(["Common", "Messages", "Form"]);

  try {
    const response = await axiosInstance.get(
      `${Apiurl.downloadExcelTemplate}/${payload}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${payload}.xlsx`);
    document.body.appendChild(link);
    link.click();
    toast.success(t("Messages:DownloadTemplate"));
    return true;
  } catch (error) {
    console.error("Login error: ", error);
    toast.error(t("Download Failed"));
    return false;
  } finally {
  }
};
export const DownloadFunctionBYFILEid = async (payload, logtype) => {
  try {
    const response = await axiosInstance.get(Apiurl.MockTestDownloadTemplate, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Beneficiary_upload_template.xlsx");
    document.body.appendChild(link);
    link.click();
    toast.success(t("Messages:DownloadTemplate"));
  } catch (error) {
    console.error("Login error: ", error);
    toast.error(t(""));
  } finally {
  }
};

// export const UploadTemplateFunction = async (payload, logtype, acknowledgment) => {
//   // const [acknowledgment, setAcknowledgment] = useState(false);
//   try {
//     const response = await axiosInstance.post(
//       Apiurl.uploadExcelTemplate,
//       payload,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     acknowledgment(false);
//     toast.success(response.data.message);
//     <AppToaster duration={50000} Toastericon={"👏"} />;
//   } catch (error) {
//     //  setLoading(true);
//     console.error("Login error: ", error);
//   } finally {
//   }
// };

export const UploadTemplateFunction = async (payload) => {
  try {
    const response = await axiosInstance.post(Apiurl.uploadExcelTemplate, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(response.data.message);
    return true; // Success: Return true

  } catch (error) {
    console.error("Upload error: ", error);
    toast.error("Upload failed. Please try again.");
    return false; // Failure: Return false
  }
};




// export const DownloadReportPDFFunction = async (reportType, fileId) => {
//   try {
//     // Make the GET request to fetch the PDF as a Blob
//     const response = await axiosInstance.get(
//       `${Apiurl.downloadReport}reportType=${reportType}&fileId=${fileId}`,
//       {
//         responseType: "blob", // Make sure response type is 'blob'
//       }
//     );

//     // Create a Blob from the response data
//     const blob = new Blob([response.data], { type: "application/pdf" });
//     console.log("size", blob.size);

//     // Check if the PDF is empty
//     if (blob.size === 0) {
//       console.error("Downloaded blob is empty.");
//       throw new Error(
//         "Empty PDF content received. Please check the API response."
//       );
//     }

//     // Create a URL for the Blob
//     const url = window.URL.createObjectURL(blob);

//     // Set the file name
//     const fileName = `${reportType}.pdf`;

//     // Create a link element to trigger the download
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();

//     // Clean up
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Download error: ", error);
//     toast.error(t("Download failed, please try again"));
//   }
// };

// Function to handle the download
export const DownloadReportPDFFunction = async (reportType, fileId) => {
  try {
    // Construct the API endpoint dynamically with the provided parameters (query parameters)
    const endpoint = `${Apiurl.downloadReport}reportType=${reportType}&fileId=${fileId}`;

    // Make an API request to fetch the PDF file
    const response = await axiosInstance.get(endpoint, {
      responseType: "blob", // Ensure the response is in blob format
    });

    // Create a temporary URL for the blob response
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const fileName = `${reportType}.pdf`;
    // Create an anchor link to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Set the default filename for the download

    // Append the link to the DOM, simulate a click to trigger the download, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the created URL object
    window.URL.revokeObjectURL(url);
  } catch (err) {
    // Handle errors if download fails
    // setError("Error downloading the PDF");
    console.error("Error downloading the PDF", err);
  } finally {
    // setLoading(false); // Reset the loading state after the operation completes
  }
};

export const DownloadReportExcelFunction = async (reportType, fileId) => {
  try {
    // Construct the API endpoint dynamically with the provided parameters (query parameters)
    const endpoint = `${Apiurl.downloadReport}reportType=${reportType}&fileId=${fileId}`;

    // Make an API request to fetch the PDF file
    const response = await axiosInstance.get(endpoint, {
      responseType: "blob", // Ensure the response is in blob format
    });

    // Create a temporary URL for the blob response
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const fileName = `${reportType}.xlsx`;
    // Create an anchor link to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Set the default filename for the download

    // Append the link to the DOM, simulate a click to trigger the download, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the created URL object
    window.URL.revokeObjectURL(url);
  } catch (err) {
    // Handle errors if download fails
    // setError("Error downloading the PDF");
    console.error("Error downloading the PDF", err);
  } finally {
    // setLoading(false); // Reset the loading state after the operation completes
  }
};
