// ProfilePage.js
import React from 'react';
import { useAuth } from './AuthContext';

const profilePageStyles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '50px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  detail: {
    fontSize: '16px',
    marginBottom: '10px',
  },
};

const ProfilePage = () => {
  // Use the useAuth hook to get the session object
  const { session } = useAuth();

  // Check if the user is logged in
  if (!session) {
    // Redirect to the login page or display a message
    return <p>Please log in to view your profile.</p>;
  }

  // Destructure user details from the session object
  const { name, email } = session;

  return (
    <div style={profilePageStyles.container}>
      <h1 style={profilePageStyles.heading}>Your Profile</h1>
      <p style={profilePageStyles.detail}>
        <strong>Name:</strong> {name}
      </p>
      <p style={profilePageStyles.detail}>
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
};

export default ProfilePage;
