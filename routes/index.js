const express = require("express"),
  router = express.Router(),
  usersRoutes = require("./userRoutes"),
  authRoutes = require("./authRoutes"),
  gameRoutes = require("./gameRoutes");
  reviewRoutes = require("./reviewRoutes");

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/games", gameRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
