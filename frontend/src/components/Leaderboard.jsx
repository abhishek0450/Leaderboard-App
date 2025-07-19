import "../App.css";
import React, { useState } from 'react';

function Leaderboard({ leaderboard }) {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; 

    // Calculate pagination indices for current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = leaderboard.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages needed
    const totalPages = Math.ceil(leaderboard.length / usersPerPage);

    // Pagination navigation
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="leaderboard">
            <h2 className="font-bold underline">Rankings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.rank}</td>
                            <td>{user.name}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        {"<<"} Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        Next {">>"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;