import React, { useState } from 'react';
import awsconfig from './aws-exports';
import folderIcon from './folder.svg'; 
const AWS = require('aws-sdk');

const S3Uploader = ({ onUpload }) => {
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return; 
        }

        const s3 = new AWS.S3();

        const params = {
            Bucket: 'huskysyncbucketc500b-dev',
            Key: selectedFile.name,
            Body: selectedFile
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully');
            setSuccess(true);
            onUpload(selectedFile); // Notify parent component about successful upload
        } catch (error) {
            console.error('Error uploading file, please try again');
        }
    };

    return (
        <div className="drop-zone">
            <input type="file" onChange={handleFileSelect} />
            <button onClick={uploadFile}>Upload</button>
            {success && (
                <div>
                    <h3>File upload was successful!</h3>
                </div>
            )}
        </div>
    );
};

export default S3Uploader;
