const reviewService = require("../services/reviewService");

exports.addComment = async (req, res) => {
  try {
    const comment = await reviewService.createComment(
      req.params.gameId,
      req.user._id,
      req.body.text
    );

    req.io.to(req.params.gameId).emit("newComment", comment); // WebSocket

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Не вдалося додати коментар" });
  }
};

exports.getCommentsByGame = async (req, res) => {
  try {
    const comments = await reviewService.getCommentsByGameId(req.params.gameId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Не вдалося завантажити коментарі" });
  }
};