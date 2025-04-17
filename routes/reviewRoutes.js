const express = require('express');

const router = express.Router();
const { addComment, getCommentsByGame } = require("../controllers/reviewController");
const { authenticateToken } = require("../controllers/authController");

router.post("/gameId", authenticateToken, addComment); 
router.get("/gameId", getCommentsByGame); 


module.exports = router;