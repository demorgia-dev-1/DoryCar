import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user data from backend API
    useEffect(() => {
        fetch('http://localhost:5000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN' // Replace with actual token
            }
        })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => setErrorMessage('Failed to fetch user data. Please try again.'));
    }, []);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        fetch('http://localhost:5000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN' // Replace with actual token
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSuccessMessage('Profile updated successfully!');
                setIsEditing(false);
            })
            .catch(error => {
                setErrorMessage('Failed to update profile. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className="user-profile">
            <h2>Your Profile</h2>
            <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="form-actions">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="edit-button"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                disabled={loading}
                                className="save-button"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
            </form>
        </div>
    );
};

export default UserProfile;