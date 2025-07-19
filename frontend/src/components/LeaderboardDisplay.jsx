import React, { useState } from 'react';
import { Users, Trophy } from 'lucide-react'; // Or your preferred icons

function LeaderboardDisplay({ leaderboard }) {
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;

    const currentPlayersOnPage = leaderboard.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const totalPages = Math.ceil(leaderboard.length / playersPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const topThreeOnPage = currentPlayersOnPage.filter(p => p.rank <= 3);
    const othersOnPage = currentPlayersOnPage.filter(p => p.rank > 3);

    const getRankIcon = (rank) => {
        if (rank <= 3) return <span className="text-2xl">👑</span>;
        return <span className="text-xl">🏆</span>;
    };

    const getTopThreeCard = (user, position) => {
        
        const configs = [
            {
                bg: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600',
                textColor: 'text-yellow-900',
                crown: '👑',
                crownSize: 'text-4xl sm:text-4xl',
                height: 'h-64 sm:h-80',
                avatarSize: 'w-16 h-16 sm:w-20 sm:h-20',
                avatarIcon: 'text-3xl sm:text-4xl',
                order: 'order-2', 
                marginTop: 'mt-0'
            },
            {
                
                bg: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
                textColor: 'text-gray-800',
                crown: '🥈',
                crownSize: 'text-2xl sm:text-3xl',
                height: 'h-56 sm:h-72',
                avatarSize: 'w-12 h-12 sm:w-16 sm:h-16',
                avatarIcon: 'text-2xl sm:text-3xl',
                order: 'order-1',
                marginTop: 'mt-4 sm:mt-8'
            },
            {
                bg: 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800',
                textColor: 'text-amber-100',
                crown: '🥉',
                crownSize: 'text-2xl sm:text-3xl',
                height: 'h-56 sm:h-72',
                avatarSize: 'w-12 h-12 sm:w-16 sm:h-16',
                avatarIcon: 'text-2xl sm:text-3xl',
                order: 'order-3',
                marginTop: 'mt-4 sm:mt-8'
            }
        ];
        
        const config = configs[position];
        
        return (
            <div key={user._id} className={`${config.bg} ${config.height} ${config.order} ${config.marginTop} rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 relative overflow-hidden`}>
                
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20">
                    <span className="text-3xl sm:text-6xl">✨</span>
                </div>
                
                <div className="text-center h-full flex flex-col justify-between">
                    
                    <div className="flex flex-col items-center">
                        <span className={`${config.crownSize} mb-1 sm:mb-2 drop-shadow-lg animate-bounce`}>{config.crown}</span>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg mb-2 sm:mb-4">
                            <span className={`text-sm sm:text-xl font-bold ${config.textColor}`}>{user.rank}</span>
                        </div>
                    </div>
                    
                    {/* Avatar */}
                    <div className={`${config.avatarSize} bg-white/20 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center backdrop-blur-sm border-2 border-white/40`}>
                        <span className={config.avatarIcon}>👤</span>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 truncate drop-shadow-md">{user.name}</h3>
                        <div className="flex items-center justify-center gap-1 sm:gap-2 bg-white/20 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
                            <span className="text-lg sm:text-2xl">🏆</span>
                            <span className="font-bold text-sm sm:text-xl drop-shadow-md">{user.points?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white/95 backdrop-blur rounded-t-3xl shadow-2xl min-h-96 border-t-4 border-orange-400">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                    <span className="text-orange-500">🏆</span>
                    Rankings
                    <span className="text-yellow-500">🏆</span>
                </h2>

                {topThreeOnPage.length > 0 && (
                    <div className="mb-8">
                        <div className="text-center mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">🏆 Champions Podium 🏆</h3>
                            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end">
                            {topThreeOnPage.map((user) => getTopThreeCard(user, user.rank - 1))}
                        </div>
                    </div>
                )}

                {topThreeOnPage.length > 0 && othersOnPage.length > 0 && <hr className="border-orange-200 my-6" />}

                <div className="space-y-3">
                    {othersOnPage.map((user) => (
                        <div key={user._id} className="flex items-center bg-gradient-to-r from-orange-50 via-yellow-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-orange-100 hover:border-orange-200">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md">
                                {user.rank}
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mr-4 border border-orange-200">
                                <Users className="w-6 h-6 text-orange-600" />
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
                </div>

                {/* Empty State for the entire leaderboard */}
                {leaderboard.length === 0 && (
                     <div className="text-center py-12 text-gray-500">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-orange-300" />
                        <p className="text-lg text-gray-600">No rankings yet</p>
                        <p className="text-sm text-gray-500">Add users and start claiming points!</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-orange-200">
                        <button onClick={handlePrev} disabled={currentPage === 1} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105">
                            {"<<"} Previous
                        </button>
                        <span className="text-gray-700 font-semibold bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105">
                            Next {">>"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeaderboardDisplay;