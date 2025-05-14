import React from "react";

const RenderJsonAsHtml = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ marginLeft: 20 }}>
      {Array.isArray(data) ? (
        data.map((item, index) => (
          <div key={index}>
            <p>
              <strong>Item {index + 1}:</strong>
            </p>
            <RenderJsonAsHtml data={item} />
          </div>
        ))
      ) : typeof data === "object" ? (
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            {value && typeof value === "object" ? (
              <>
                <p>
                  <strong>{key}:</strong>
                </p>
                <RenderJsonAsHtml data={value} />
              </>
            ) : (
              <p>
                <strong>{key}:</strong>{" "}
                {value !== null ? value.toString() : "null"}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>{data.toString()}</p>
      )}
    </div>
  );
};

export default RenderJsonAsHtml;
