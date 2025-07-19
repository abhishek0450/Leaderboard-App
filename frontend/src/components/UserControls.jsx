

function UserControls({ users, selectedUser, setSelectedUser, newUserName, setNewUserName, handleClaim, handleAddUser }) {
    return (
        
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-xl relative z-10 border border-orange-100">
            <div className="flex flex-col gap-4">
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-700 transition-all min-w-0"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    
                    <button
                        onClick={handleClaim}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 sm:flex-shrink-0"
                    >
                        <span className="text-lg">⭐</span>
                        <span className="whitespace-nowrap">Claim</span>
                    </button>
                </div>

            
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter new user name"
                        className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-700 transition-all min-w-0"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddUser(e)}
                    />
                
                    <button
                        onClick={handleAddUser}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 sm:flex-shrink-0"
                    >
                        <span className="text-lg">➕</span>
                        <span className="whitespace-nowrap">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserControls;