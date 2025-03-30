const express = require("express");
const { getGames, createGame, fetchAndStoreGames } = require("../controllers/gameController");
const { authenticateToken } = require("../controllers/authController");


const router = express.Router();

// Отримати список ігор
router.get("/findAll", authenticateToken, getGames);
router.post('/create', authenticateToken, createGame);
router.get('/update', authenticateToken, fetchAndStoreGames);

module.exports = router;