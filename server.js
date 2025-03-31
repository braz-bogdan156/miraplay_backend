require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./routes/index'); 

const app = express();
app.get('/', (req, res) => {
  res.send('Сервер працює!');
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Дозволяємо всі запити (можна змінити)
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch(err => console.log('❌ Помилка підключення до MongoDB:', err));

// WebSocket логіка
io.on('connection', (socket) => {
  console.log('🟢 Користувач підключився:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Користувач відключився:', socket.id);
  });
});



// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Сервер запущено на порту ${PORT}`));