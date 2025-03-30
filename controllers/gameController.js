const Game = require("../models/game");
const gameService = require("../services/gameService");


// Отримання ігор з фільтрацією та пагінацією
exports.getGames = async (req, res) => {
  try {
    const { genre = "ALL", page = 1, limit = 9 } = req.query;
    const query = genre !== "ALL" ? { genre } : {};

    const games = await Game.find(query)
      .sort({ releaseDate: -1 }) // Сортування за датою релізу (новіші першими)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalGames = await Game.countDocuments(query);
    const hasMore = (page * limit) < totalGames;

    res.json({ games, hasMore });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.updateGames = async (req, res) => {
    try {
      await gameService.fetchAndStoreGames();
      res.status(200).json({ message: "Ігри оновлені!" });
    } catch (error) {
      res.status(500).json({ error: "Помилка оновлення ігор" });
    }
  };