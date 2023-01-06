import React, { useState, useEffect } from "react";

import HttpClient from "./listcsvdata";
// import "./style.css";

export default function App() {
  const [dataInCSV, setDataInCSV] = useState("");

  useEffect(() => {
    HttpClient.get().then(res => setDataInCSV(res));
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {dataInCSV && (
        <a
          href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
          download="filename.csv"
        >
          download
        </a>
      )}
    </div>
  );
}
