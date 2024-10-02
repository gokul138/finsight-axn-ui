import React, { useState } from "react";
import "./UserDashboard.css";
import { SemiCircleProgress } from "react-semicircle-progressbar";
import { Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import UploadIcon from "../../SVG/Upload.svg";
import UploadProgressModal from "../helpers/UploadProgressModal";

const Upload = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setshowProgressModal] = useState(false);
  const [type, setType] = useState(false);
  

  const handleFileUpload = async (formData) => {
    setshowProgressModal(true);
    setType("Uploading");

    try {
      const response = await axios.post(
        "https://docgeniee.org/doc-axn/api/v1/invoices/data",
        formData,
        {
          responseType: "arraybuffer",
          timeout: 300000,
        }
      );

      const blob = new Blob([response.data], {
        type: "text",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${Date.now()}.txt`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);

      if (response.status === 200) {
        setshowProgressModal(false);
        setShowModal(false);
      }
    } catch (error) {
      setshowProgressModal(false);
      console.error("Error uploading file:", error);
    }
  };
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    console.log('file', files);

    const formData = new FormData();
  
    Array.from(files).forEach(
(file) => {
      if (file.type.startsWith("image/")) {
          formData.append("files[]", file); // Append image as base64 string to FormData under 'files[]'
        // };
      } else if (file.type === "application/pdf") {
        formData.append("files", file);
      } else {
        formData.append("files", file);
      }
    });
  
    await handleFileUpload(formData);
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Upload Modal */}
      <Modal 
        show={true} 
        onHide={() => setShowModal(false)} 
        centered 
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center upload-title">
            Upload Files
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="upload-icon-circle">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="capture=camera,image/*,.pdf"
              style={{
                position: "absolute",
                width: "35%",
                height: "50%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleFileChange}
              aria-label="File upload" // Accessibility improvement
            />
            <img
              src={UploadIcon}
              alt="Upload Icon"
              style={{ fontSize: "5rem", color: "#fff" }}
              width={"40px"}
            />
          </div>
          <p className="mt-3" style={{ fontSize: "0.8rem", color: "#6c757d" }}>
            Drag and drop files here or{" "}
            <a
              href="#"
              style={{ fontSize: "0.8rem", color: "#007bff" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("file-upload").click();
              }}
              className="text-decoration-none"
            >
              Click here
            </a>
          </p>
        </Modal.Body>
      </Modal>
      
      {/* Upload Progress Modal */}
      <UploadProgressModal 
        show={showProgressModal} 
        onHide={() => setshowProgressModal(false)} 
        type={type} 
      />
    </div>
  );
  
};

export default Upload;
