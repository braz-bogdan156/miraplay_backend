
const gameService = require("../services/gameService");
const { notifyNewGame } = require("../sockets/notifyNewGame"); // Імпортуємо WebSocket

// Отримання ігор з фільтрацією та пагінацією
exports.getGames = async (req, res) => {
  try {
    const { genre = "ALL", page = 1, limit = 9 } = req.query;
    const data = await gameService.getGames(genre, page, limit);
    res.json(data);
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

exports.createGame = async (req, res) => {
  try {
    const gameData = req.body;

    const newGame = await gameService.createGame(gameData);

    notifyNewGame(newGame);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Помилка створення гри" });
  }
};

exports.fetchAndStoreGames = async (req, res) => {
  try {
    await gameService.fetchAndStoreGames();
    res.status(200).json({ message: "Ігри успішно збережені!" });
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні ігор" });
  }
};
