

function TopThree({ topUsers }) {
    
    const getTopThreeCard = (user, index) => {
        // Color schemes for 1st, 2nd, 3rd place (gold, silver, bronze)
        const colors = ['bg-gradient-to-br from-yellow-400 to-yellow-600', 'bg-gradient-to-br from-gray-300 to-gray-500', 'bg-gradient-to-br from-amber-500 to-amber-700'];
        const textColors = ['text-yellow-800', 'text-gray-800', 'text-amber-800'];

        return (
            <div key={user._id} className={`${colors[index]} rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform`}>
                <div className="text-center">
                    {/* Rank badge */}
                    <div className="w-12 h-12 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className={`text-xl font-bold ${textColors[index]}`}>{user.rank}</span>
                    </div>
                    {/* User avatar placeholder */}
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                    </div>
                    {/* User name */}
                    <h3 className="font-bold text-sm mb-1 truncate">{user.name}</h3>
                    {/* Points display with trophy icon */}
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-xl">🏆</span>
                        <span className="font-bold">{user.points?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    };

    if (topUsers.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {topUsers.map((user, index) => getTopThreeCard(user, index))}
        </div>
    );
}

export default TopThree;