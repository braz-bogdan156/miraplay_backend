
const express = require('express'),
    router = express.Router(),
    usersRoutes = require('./userRoutes');
    authRoutes = require('./authRoutes');

    router.get('/sg', (req, res) => {
        res.send('Сервер працює!');
      });

router.use('/users', usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.use("/users", require("./userRoutes"));
// router.use("/games", require("./gameRoutes"));
// router.post('/as', (req, res) => {
//     res.send('Сервер працює14!');
//   });

// module.exports = router;