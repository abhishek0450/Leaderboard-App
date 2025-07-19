import User from '../models/user.model.js';
import ClaimHistory from '../models/claimHistory.model.js';

export const addUser = async (req, res) => {
    try {
        const newUser = new User({ name: req.body.name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const claimPoints = async (req, res) => {
    const { userId } = req.body;
    const randomPoints = Math.floor(Math.random() * 10) + 1; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.points += randomPoints;
        await user.save();

        const claimHistory = new ClaimHistory({ userId, pointsClaimed: randomPoints });
        await claimHistory.save();

        res.json({ points: user.points, claimedPoints: randomPoints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 });
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