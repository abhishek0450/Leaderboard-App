import User from '../models/user.model.js';
import ClaimHistory from '../models/claimHistory.model.js';

// Create a new user in the system
export const addUser = async (req, res) => {
    try {
        const newUser = new User({ name: req.body.name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all users from the database
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Handle points claiming for a specific user
export const claimPoints = async (req, res) => {
    const { userId } = req.body;
    const randomPoints = Math.floor(Math.random() * 10) + 1; 

    try {
        // Find user and validate existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's total points
        user.points += randomPoints;
        await user.save();

        // Record no of claim for audit purposes
        const claimHistory = new ClaimHistory({ userId, pointsClaimed: randomPoints });
        await claimHistory.save();

        res.json({ points: user.points, claimedPoints: randomPoints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate ranked leaderboard sorted by points (highest first)
export const getLeaderboard = async (req, res) => {
    try {
        // Sort users by points in descending order
        const users = await User.find().sort({ points: -1 });
        
        // Add rank position to each user (1-indexed)
        const rankedUsers = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            points: user.points,
            _id: user._id
        }));
        
        res.json(rankedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};