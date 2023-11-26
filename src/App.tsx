// src/App.tsx
import React from "react";
import ExcelUploader from "./EventHandler";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>Excel Data Upload</h1>
      <ExcelUploader />
    </div>
  );
};

export default App;
