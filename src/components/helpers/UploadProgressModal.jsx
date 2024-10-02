import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UploadProgressModal = ({ show, onHide, type }) => {
  const [progress, setProgress] = useState(0);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0; // Reset to 0 when reaching 100
        }
        return prevProgress + 1; // Increment progress
      });
    }, 150); // Adjust the speed of the animation by changing the interval time

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{type}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div style={{ width: "120px", height: "120px", margin: "0 auto" }}>
          <CircularProgressbar
            value={progress}
            // text={type || ''}
            styles={buildStyles({
              pathColor: `#2087fe`,
              textColor: "#000",
              trailColor: "#eee",
              strokeLinecap: "butt",
              strokeWidth: 20, // Increase the thickness of the progress bar here
              textSize: "20px",
            })}
            strokeWidth={15} // Ensure the strokeWidth is passed directly to the CircularProgressbar
          />
        </div>
        <p className="mt-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
          This may take a while. Please Wait
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default UploadProgressModal;
