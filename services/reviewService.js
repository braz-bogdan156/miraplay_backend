const Comment = require('../models/review');

exports.createReview = async (gameId, userId, reviewText) => {
return await Comment.create({
    reviewText,
    userId,
    gameId,
    createdAt: new Date(),
  });
};

exports.getAllReviewsByGame = async (gameId) => {
  return await Comment.find({ gameId }).populate('userId', 'username');
}