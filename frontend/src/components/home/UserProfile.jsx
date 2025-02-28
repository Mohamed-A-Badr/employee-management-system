/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { getTokens } from '../../utils/auth';

const UserProfile = ({ isExpanded }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const tokens = getTokens();
        console.log('Tokens retrieved:', tokens); // Debug log

        if (!tokens?.access) {
          console.warn('No access token found');
          setLoading(false);
          return;
        }

        console.log('Attempting to fetch user profile...'); // Debug log
        const response = await axios.get('http://localhost:8000/api/v1/auth/me/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`
          }
        });

        console.log('User profile fetched:', response.data); // Debug log
        setUserProfile(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err);
        
        // If token is expired or invalid, clear it
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.warn('Token expired or invalid, removing from localStorage');
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchUserProfile();

    // Set up periodic refresh every 5 minutes
    const intervalId = setInterval(fetchUserProfile, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="user-profile">
        <div className="user-profile-icon">
          <FaUserCircle size={isExpanded ? 48 : 24} />
        </div>
        {isExpanded && <div>Loading...</div>}
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="user-profile">
        <div className="user-profile-icon">
          <FaUserCircle size={isExpanded ? 48 : 24} color="red" />
        </div>
        {isExpanded && <div className="text-muted">Failed to load profile</div>}
      </div>
    );
  }

  // Render user profile
  if (!userProfile) return null;

  return (
    <div className="user-profile">
      <div className="user-profile-icon">
        <FaUserCircle size={isExpanded ? 48 : 24} />
      </div>
      {isExpanded && (
        <div className="user-profile-details">
          <div className="username">{userProfile.username}</div>
          <div className="email text-muted">{userProfile.email}</div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
