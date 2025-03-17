import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from '../components/RideCard';
import UserProfile from '../components/UserProfile';
import Pricing from '../components/Pricing';

function Home() {
    // State for search functionality
    const [searchQuery, setSearchQuery] = useState({
        from: '',
        to: '',
        departureTime: '',
    });

    // State for ride details
    const [rides, setRides] = useState([]);

    // State for selected ride
    const [selectedRide, setSelectedRide] = useState(null);

    // State for user profile visibility
    const [showProfile, setShowProfile] = useState(false);

    // State for pricing visibility
    const [showPricing, setShowPricing] = useState(false);

    // Fetch available rides from the backend
    const fetchRides = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/rides');
            setRides(response.data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // Handle ride search
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/rides/search', searchQuery);
            setRides(response.data);
        } catch (error) {
            console.error('Error searching rides:', error);
        }
    };

    // Handle ride booking
    const handleBooking = async (rideId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/rides/${rideId}/book`);
            alert('Ride booked successfully!');
        } catch (error) {
            console.error('Error booking ride:', error);
            alert('Error booking ride. Please try again.');
        }
    };

    // Fetch rides when the component mounts
    useEffect(() => {
        fetchRides();
    }, []);

    return (
        <div className="rider-dashboard">
            <h1>Welcome to DoryCar</h1>

            {/* Search Section */}
            <div className="search-section">
                <h2>Find a Ride</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="From"
                        value={searchQuery.from}
                        onChange={(e) => setSearchQuery({ ...searchQuery, from: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="To"
                        value={searchQuery.to}
                        onChange={(e) => setSearchQuery({ ...searchQuery, to: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        value={searchQuery.departureTime}
                        onChange={(e) => setSearchQuery({ ...searchQuery, departureTime: e.target.value })}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            {/* Available Rides Section */}
            <div className="available-rides">
                <h2>Available Rides</h2>
                <div className="rides-grid">
                    {rides.map(ride => (
                        <RideCard
                            key={ride._id}
                            ride={ride}
                            onBook={() => handleBooking(ride._id)}
                        />
                    ))}
                </div>
            </div>

            {/* User Profile Section */}
            <div className="profile-section">
                <button onClick={() => setShowProfile(!showProfile)}>
                    {showProfile ? 'Close Profile' : 'View Profile'}
                </button>
                {showProfile && <UserProfile />}
            </div>

            {/* Pricing Section */}
            <div className="pricing-section">
                <button onClick={() => setShowPricing(!showPricing)}>
                    {showPricing ? 'Close Pricing' : 'View Pricing'}
                </button>
                {showPricing && <Pricing />}
            </div>
        </div>
    );
}

export default Home;