
const express = require('express'),
    router = express.Router(),
    usersRoutes = require('./userRoutes'),
    authRoutes = require('./authRoutes'),
    gameRoutes = require('./gameRoutes');

  
router.use('/users', usersRoutes);
router.use("/auth", authRoutes);
router.use('/games', gameRoutes);

module.exports = router;


