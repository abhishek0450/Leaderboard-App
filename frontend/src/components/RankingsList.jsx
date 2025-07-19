import React, { useState } from 'react';
import { Users, Trophy } from 'lucide-react';

function RankingsList({ otherPlayers }) {
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    // --- Pagination Logic ---
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = otherPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const totalPages = Math.ceil(otherPlayers.length / playersPerPage);

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

    const getRankIcon = (rank) => {
        if (rank === 1) return <span className="text-2xl">👑</span>;
        if (rank === 2) return <span className="text-2xl">🥈</span>;
        if (rank === 3) return <span className="text-2xl">🥉</span>;
        return <span className="text-xl">🏆</span>;
    };

    return (
        <div className="bg-white/95 backdrop-blur mx-6 rounded-t-3xl shadow-2xl min-h-96">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Rankings</h2>

                <div className="space-y-3">
                    
                    {currentPlayers.map((user) => (
                        <div key={user._id} className="flex items-center bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                {user.rank}
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mr-4">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-orange-600 font-bold">
                                {getRankIcon(user.rank)}
                                <span>{user.points?.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}

                    {otherPlayers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">No other players yet</p>
                            <p className="text-sm">Only the top three are on the board!</p>
                        </div>
                    )}
                </div>

              
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &laquo; Previous
                        </button>
                        <span className="text-gray-700 font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RankingsList;