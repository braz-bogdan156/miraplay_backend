const axios = require("axios");
const Game = require("../models/game");

const API_URL = "https://api-test.miraplay.cloud/games";

exports.fetchAndStoreGames = async () => {
  try {
    const response = await axios.get(API_URL);
    const games = response.data;

    for (let game of games) {
      const existingGame = await Game.findOne({ systemGameName: game.systemGameName });
      if (!existingGame) {
        await Game.create(game);
      }
    }

    console.log("Ігри успішно збережені в базу даних!");
  } catch (error) {
    console.error("Помилка при отриманні ігор:", error);
  }
};

exports.createGame = async (gameData) => {
  try {
    const newGame = await Game.create(gameData);
    return newGame;
  } catch (error) {
    console.error("Помилка при створенні гри:", error);
    throw error;
  }
}