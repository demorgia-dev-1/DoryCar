import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RideList() {
    const [rides, setRides] = useState([]);
    const joinRide = async (rideId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/rides/${rideId}/join`);
            setRides(rides.map(ride => 
                ride._id === rideId ? { ...ride, seatsAvailable: ride.seatsAvailable - 1 } : ride
            ));
        } catch (error) {
            console.error('Error joining ride:', error);
        }
    };

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rides');
                setRides(response.data);
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        };
        fetchRides();
    }, []);

    return (
        <div>
            <h1>Available Rides</h1>
            {rides.map(ride => (
                <div key={ride._id}>
                    <p>From: {ride.from}</p>
                    <p>To: {ride.to}</p>
                    <p>Departure Time: {ride.departureTime}</p>
                    <p>Seats Available: {ride.seatsAvailable}</p>
                    <p>Price: ${ride.price}</p>
                    <button onClick={() => joinRide(ride._id)}>Join Ride</button>
                </div>
            ))}
        </div>
    );
}

export default RideList;