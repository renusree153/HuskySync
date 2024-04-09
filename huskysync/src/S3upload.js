import React, { useState } from 'react';
import awsconfig from './aws-exports';

const AWS = require('aws-sdk');

const S3Uploader = () => {
    const [success, setSuccess] = useState(false);
    // set access key ID & secret access key id in .env file in the
    // huskysync folder NOT src
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1' 
    })

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
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
        } catch (error) {
            console.error('Error uploading file please try again');
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={uploadFile}>Upload</button>
            {success && (
                <div>
                    <h3> File upload was successful! </h3>
                </div>
            )}
        </div>
    );
};

export default S3Uploader;