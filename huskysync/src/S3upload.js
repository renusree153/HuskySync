import React, { useState } from 'react';
import awsconfig from './aws-exports'; // Ensure AWS config path is correct
import folderIcon from './folder.svg'; // Ensure folder icon path is correct
const AWS = require('aws-sdk');

const S3Uploader = ({ onUpload }) => {
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // AWS SDK configuration
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1' 
    });

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setSelectedFile(event.dataTransfer.files[0]);
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const s3 = new AWS.S3();
        const params = {
            Bucket: 'huskysyncbucketc500b-dev', // Make sure this is your bucket
            Key: selectedFile.name,
            Body: selectedFile
        };

        try {
            await s3.upload(params).promise();
            console.log('File uploaded successfully');
            setSuccess(true);
            if (onUpload) onUpload(selectedFile); // Notify parent component about successful upload
        } catch (error) {
            console.error('Error uploading file, please try again');
            setSuccess(false); // Update to handle failure
        }
    };

    return (
        <div className="drop-zone">
            <label htmlFor="file-input" className="file-input-label">
                <img src={folderIcon} alt="Folder icon" className="folder-icon" />
                <span>{selectedFile ? 'Click Upload' : 'Choose a file...'}</span>
            </label>
            <input id="file-input" type="file" onChange={handleFileSelect} style={{ display: 'none' }} />
            {selectedFile && <button onClick={uploadFile} className="upload-btn">Upload</button>}
            {success && (
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="checkmark-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        stroke="#6C63FF" // Purple color
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default S3Uploader;
