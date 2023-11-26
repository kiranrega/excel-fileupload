// src/components/ExcelUploader.tsx
import React, { ChangeEvent, useState } from "react";
import { Button, Input, CircularProgress } from "@mui/material";
import DataTable from "./DataTable";
import * as XLSX from "xlsx";
import { firestore } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { Upload } from "@mui/icons-material";

const ExcelUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setShowLoader(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          );

          try {
            const collectionRef = collection(firestore, "excel");
            const docRef = await addDoc(collectionRef, { data: excelData });

            setUploadedData(excelData);
            setShowLoader(false);
          } catch (error) {
            alert(`Error adding document to Firestore: ${error}`);
            setShowLoader(false);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <div className="upload-container">
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            borderRadius: 20,
            padding: "10px 20px",
            fontWeight: "bold",
            width: "120px",
          }}
        >
          {showLoader ? (
            <CircularProgress color="warning" size={20} />
          ) : (
            "Upload"
          )}
        </Button>
      </div>
      {uploadedData.length > 0 && <DataTable data={uploadedData} />}
    </>
  );
};

export default ExcelUploader;
