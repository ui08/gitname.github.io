export const DownloadTemplateFunction = async ({host}) => {
  // console.log(host);
  //   try {
  //     const response = await axiosInstance.get(Apiurl.MockTestDownloadTemplate, {
  //       responseType: "blob", // Expecting a blob response (e.g., a file)
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "Beneficiary_upload_template.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link); // Cleanup the created link

  //     toast.success("Download started successfully"); // Notify user
  //   } catch (error) {
  //     toast.error("Failed to download template"); // Error handling
  //     console.error("Error downloading template:", error); // Log the error for debugging
  //   } finally {
  //   }
};
