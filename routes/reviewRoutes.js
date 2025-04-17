const express = require('express');

const router = express.Router();

router.post("/gameId", authMiddleware, addComment); 
router.get("/gameId", getCommentsByGame); 


module.exports = router;