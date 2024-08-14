import React, { useState, useRef, useEffect } from 'react';
import { DocumentLoadEvent, SpecialZoomLevel } from '@react-pdf-viewer/core';
import Viewer from "@phuocng/react-pdf-viewer";
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const viewerRef = useRef(null);
    const [selectedArea, setSelectedArea] = useState(null);

    const handleCompleteDocumentLoad = (e: DocumentLoadEvent) => {
        setTimeout(function(){
            const divElement = document.querySelector(".viewer-layout-container");
            if (divElement) {
              const height = divElement.clientHeight;
            } else {
              console.error('Element with class "modal-body-content" not found.');
            }

            console.log(viewerRef,"viewerRef");
            const element = document.querySelector(".viewer-canvas-layer");
            element.addEventListener('click', handleAreaSelection);
            console.log(element,"element");
          }, 2000);
        // const canvas = viewerRef.current.getPages()[0].canvas;
        
        // 
        // canvas.addEventListener('click', handleAreaSelection);
    // setNumPages(numPages);
    };

    const handleAreaSelection = (e) => {
        console.log("sample");
    // Calculate posX, posY, width, height based on user's selection
    const posX = e.clientX; // Replace with your calculation
    const posY = e.clientY; // Replace with your calculation
    const width = 50; // Set your custom width
    const height = 30; // Set your custom height
    console.log("asdasdsad");
    // Store the selected area in the state
    setSelectedArea({ posX, posY, width, height });
    };

    const handleAddLink = () => {
    // Send the selected area to the backend
    // You can use fetch or any other method to send a POST request
    fetch('your-backend-api-endpoint', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedArea),
    })
        .then(response => response.json())
        .then(data => {
        // Handle the response from the backend
        console.log('Link added successfully:', data);
        })
        .catch(error => {
        console.error('Error adding link:', error);
        });
    };

    return (
    <div>
        
        <Viewer
            fileUrl="https://docintel.s3-eu-west-1.amazonaws.com/pdf/arunp/pdflink_1708427771.pdf"
            onDocumentLoad={handleCompleteDocumentLoad}
            defaultScale={SpecialZoomLevel.PageFit}
            ref={viewerRef}
        />

        {selectedArea && (
        <div>
            <p>
            Selected Area: x={selectedArea.posX}, y={selectedArea.posY}, width={selectedArea.width}, height={selectedArea.height}
            </p>
            <button onClick={handleAddLink}>Add Link</button>
        </div>
        )}
    </div>
    );
};

export default PdfViewer;
        