import express from 'express';
import {
    addUser,
    getAllUsers,
    claimPoints,
    getLeaderboard
} from '../controllers/user.controller.js';

const router = express.Router();


router.post('/users', addUser);

router.get('/users', getAllUsers);

router.post('/claim', claimPoints);

router.get('/leaderboard', getLeaderboard);

export default router;