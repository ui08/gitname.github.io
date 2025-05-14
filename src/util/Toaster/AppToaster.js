import React from "react";
import { Toaster } from "react-hot-toast";

export default function AppToaster({ duration, Toastericon }) {
  return (
    <Toaster
      gutter={8}
      containerClassName=""
      position="bottom-right"
      reverseOrder={true}
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: "#fff",
          color: "black",
        },

        // Default options for specific types
        success: {
          duration: duration ? duration : 3000,
          iconTheme: {
            primary: "green",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
