import React from 'react';
import S3Uploader from './S3upload';
import NavBar from './components/Navbar';
import './UploadDocsPage.css'; 
const UploaderPage = () => {
    return (
        <div>

            <NavBar/>
            <header className="Upload-header">

            <h1>Upload Documents</h1>
                <S3Uploader />
            </header>

        </div>
    );
};

export default UploaderPage;

