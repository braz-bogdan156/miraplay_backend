let io;

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Користувач підключився:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Користувач відключився:", socket.id);
    });
  });
}

function notifyNewGame(game) {
  if (io) {
    io.emit("newGame", game);
  } else {
    console.error("WebSocket не ініціалізовано");
  }
}

module.exports = { initSocket, notifyNewGame };
