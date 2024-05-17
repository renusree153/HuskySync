import React, { useState } from 'react';
import './Settings.css';
import NavBar from './components/Navbar';

function Settings() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [addGroupCode, setAddGroupCode] = useState('');
    const [groups, setGroups] = useState([]);

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const handleProfilePicChange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handleSaveChanges = () => {
        console.log('Saved data:', { firstName, lastName, bio, groups });
    };

    return (
        <div className="mainDiv">
            <NavBar/>
            <div className="settings-container">
            <div className="settings">
                <div className="setting-item">
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className="setting-item">
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div className="setting-item">
                    <label>Bio</label>
                    <textarea value={bio} onChange={handleBioChange} />
                </div>
                <div className="setting-item">
                    <label>Profile Picture</label>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                </div>
                <div className="setting-item">
                    <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
                </div>
            </div>

            <div className="profile-blob">
                {profilePic && <img src={profilePic} alt="Profile" className="profile-picture" />}
                <h2>{`${firstName} ${lastName}`}</h2>
                <p>{bio}</p>
                {groups.length > 0 && (
                    <div>
                        <h3>Groups</h3>
                        <ul>
                            {groups.map(group => (
                                <li key={group}>{group}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}

export default Settings;
