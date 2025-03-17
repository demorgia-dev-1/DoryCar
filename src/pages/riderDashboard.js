import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RiderDashboard = () => {
    const [rideStatus, setRideStatus] = useState('');
    const [rides, setRides] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchRideData = async () => {
            try {
                const response = await axios.get('/api/rides');
                setRideStatus(response.data.rideStatus);
                setRides(response.data.rides);
                setDrivers(response.data.drivers);
            } catch (error) {
                console.error('Error fetching ride data:', error);
            }
        };

        fetchRideData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Rider Dashboard</h2>
            
            {/* Current Ride Status */}
            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="mb-0">Current Ride Status</h3>
                </div>
                <div className="card-body">
                    <p><strong>Status:</strong> {rideStatus}</p>
                    {rideStatus === 'on_ride' && (
                        <>
                            <p><strong>Driver Name:</strong> {drivers.find(d => d.id === 1)?.name}</p>
                            <p><strong>Vehicle:</strong> {drivers.find(d => d.id === 1)?.vehicle}</p>
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
                                <th>Driver</th>
                                <th>Fare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.map(ride => (
                                <tr key={ride.id}>
                                    <td>{ride.date}</td>
                                    <td>{ride.from}</td>
                                    <td>{ride.to}</td>
                                    <td>{ride.driver}</td>
                                    <td>{ride.fare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Available Drivers */}
            <div className="card">
                <div className="card-header">
                    <h3 className="mb-0">Available Drivers</h3>
                </div>
                <div className="card-body">
                    <div className="list-group">
                        {drivers.map(driver => (
                            <div key={driver.id} className="list-group-item">
                                <h5>{driver.name}</h5>
                                <p><strong>Vehicle:</strong> {driver.vehicle}</p>
                                <p><strong>Rating:</strong> {driver.rating}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;