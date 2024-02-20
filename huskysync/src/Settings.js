import React, { useState } from 'react';

function Settings() {
  // Define state variables for each setting
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [name, setName] = useState('');
  const [publicProfile, setPublicProfile] = useState(false);

  // Function to handle toggling notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Function to handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle toggling public profile
  const togglePublicProfile = () => {
    setPublicProfile(!publicProfile);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          Enable notifications
        </label>
      </div>
      <div>
        <h3>Name</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <h3>Profile Visibility</h3>
        <label>
          <input
            type="checkbox"
            checked={publicProfile}
            onChange={togglePublicProfile}
          />
          Public Profile
        </label>
      </div>
      <div>
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default Settings;
