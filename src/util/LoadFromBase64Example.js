// import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";

// PdfJs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.10.377/es5/build/pdf.worker.min.js`;

export default function LoadFromBase64pdf({ pdfdata }) {
  const base64 = pdfdata;
  const pdfContentType = "application/pdf";
  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      `data:${pdfContentType};base64,`.length
    );

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: pdfContentType });
  };

  const url = URL.createObjectURL(base64toBlob(base64));
  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        minHeight: "26.45cm",
      }}
    >
      <object data={url} width="100%" height="999px" type="application/pdf" className="pdf-object">
        <p>
          Your browser doesn’t support PDFs. Please download the PDF to view it:
          .
        </p>
      </object>
      {/* <Viewer fileUrl={url} /> */}
    </div>
  );
}
