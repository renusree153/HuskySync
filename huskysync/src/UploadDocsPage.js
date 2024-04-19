import React, { useState } from 'react';
import S3Uploader from './S3upload';
import NavBar from './components/Navbar';
import './UploadDocsPage.css'; 
import folderIcon from './folder.svg'; 

const UploaderPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleUpload = (file) => {
        setUploadedFiles([...uploadedFiles, file]);
    };

    return (
        <div>
            <NavBar/>
            <header className="Upload-header">
                <h1>Upload Documents</h1>
                <div className="drag-drop-area">
                    <div className="drop-zone">
                        <img src={folderIcon} alt="SVG Image"></img>
                        <p>Drag & Drop files here</p>
                        <S3Uploader onUpload={handleUpload} />
                    </div>
                    <div className="uploaded-files">
                        <h2>Uploaded Files</h2>
                        <ul>
                            {uploadedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default UploaderPage;
