

function Notification({ claimedPoints, claimedUserName }) {
    if (claimedPoints === null) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-4 rounded-xl mb-6 text-center font-semibold shadow-lg animate-pulse border border-orange-300">
            <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🎉</span>
                <span>{claimedUserName} claimed {claimedPoints} points!</span>
                <span className="text-xl">🎉</span>
            </div>
        </div>
    );
}

export default Notification;