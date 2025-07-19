import "./App.css";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UserControls from './components/UserControls';
import Notification from './components/Notification';
import LeaderboardDisplay from './components/LeaderboardDisplay';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [claimedPoints, setClaimedPoints] = useState(null);
    const [claimedUserName, setClaimedUserName] = useState('');

    const fetchUsers = useCallback(async () => {
        const res = await axios.get(`${API_URL}/users`);
        setUsers(res.data);
        if (res.data.length > 0 && !selectedUser) {
            setSelectedUser(res.data[0]._id);
        }
    }, [selectedUser]);

    const fetchLeaderboard = useCallback(async () => {
        const res = await axios.get(`${API_URL}/leaderboard`);
        setLeaderboard(res.data);
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchLeaderboard();
    }, [fetchUsers, fetchLeaderboard]);

    const handleClaim = async () => {
        if (!selectedUser) return;
        try {
            
            const selectedUserObj = users.find(user => user._id === selectedUser);
            const userName = selectedUserObj ? selectedUserObj.name : 'Unknown User';
            
            const res = await axios.post(`${API_URL}/claim`, { userId: selectedUser });
            setClaimedPoints(res.data.claimedPoints);
            setClaimedUserName(userName);
            fetchLeaderboard();
            setTimeout(() => {
                setClaimedPoints(null);
                setClaimedUserName('');
            }, 3000);
        } catch (error) {
            console.error("Error claiming points", error);
        }
    };

    const handleAddUser = async (e) => {
        if (e) e.preventDefault();
        if (!newUserName.trim()) return;
        try {
            await axios.post(`${API_URL}/users`, { name: newUserName });
            setNewUserName('');
            fetchUsers();
            fetchLeaderboard();
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex flex-col">
            <Header />

            <div className="max-w-6xl mx-auto w-full px-6 py-4 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-9xl text-orange-300">🏆</span>
                </div>

                <UserControls
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    newUserName={newUserName}
                    setNewUserName={setNewUserName}
                    handleClaim={handleClaim}
                    handleAddUser={handleAddUser}
                />

                <Notification claimedPoints={claimedPoints} claimedUserName={claimedUserName} />
            </div>

            <div className="max-w-6xl mx-auto w-full px-6">
                <LeaderboardDisplay leaderboard={leaderboard} />
            </div>
        </div>
    );
}

export default App;