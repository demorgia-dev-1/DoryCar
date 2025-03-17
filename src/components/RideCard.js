// src/components/RideCard.js
import React from 'react';

const RideCard = ({ ride }) => {
    return (
        <div className="ride-card">
            <h3>{ride.from} to {ride.to}</h3>
            <p>Departure Time: {ride.departureTime}</p>
            <p>Price: ${ride.price}</p>
            <p>Seats Available: {ride.seatsAvailable}</p>
        </div>
    );
};

export default RideCard;