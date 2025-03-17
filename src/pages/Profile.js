import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;