import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
    const [rideStatus, setRideStatus] = useState('');
    const [rides, setRides] = useState([]);
    const [riders, setRiders] = useState([]);

    useEffect(() => {
        const fetchRideData = async () => {
            try {
                const response = await axios.get('/api/rides');
                setRideStatus(response.data.rideStatus);
                setRides(response.data.rides);
                setRiders(response.data.riders);
            } catch (error) {
                console.error('Error fetching ride data:', error);
            }
        };

        fetchRideData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Driver Dashboard</h2>
            
            {/* Current Ride Status */}
            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="mb-0">Current Ride Status</h3>
                </div>
                <div className="card-body">
                    <p><strong>Status:</strong> {rideStatus}</p>
                    {rideStatus === 'on_ride' && (
                        <>
                            <p><strong>Rider Name:</strong> {riders.find(r => r.id === 1)?.name}</p>
                            <p><strong>Destination:</strong> {riders.find(r => r.id === 1)?.destination}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Ride History */}
            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="mb-0">Ride History</h3>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Rider</th>
                                <th>Fare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.map(ride => (
                                <tr key={ride.id}>
                                    <td>{ride.date}</td>
                                    <td>{ride.from}</td>
                                    <td>{ride.to}</td>
                                    <td>{ride.rider}</td>
                                    <td>{ride.fare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Available Riders */}
            <div className="card">
                <div className="card-header">
                    <h3 className="mb-0">Available Riders</h3>
                </div>
                <div className="card-body">
                    <div className="list-group">
                        {riders.map(rider => (
                            <div key={rider.id} className="list-group-item">
                                <h5>{rider.name}</h5>
                                <p><strong>Location:</strong> {rider.location}</p>
                                <p><strong>Destination:</strong> {rider.destination}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;