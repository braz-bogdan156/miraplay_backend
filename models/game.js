
const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
 
  // Основна інформація про гру
  systemGameName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  commonGameName: {
    type: String,
    required: true
  },
  gameDescription: {
    type: String
    
  },
  
  // Платформи та запуск
  gameLaunchers: {
    type: [String],
    default: []
  },

 // Категоризація та класифікація
  gameClass: {
    type: String,
    enum: ['STANDART', 'VIP'],
    required: true
  },
  genre: {
    type: String,
    enum: ["ALL", "FREE", "MOBA", "SHOOTERS", 
        "LAUNCHERS", "MMORPG", "STRATEGY", "FIGHTING", "RACING", "SURVIVAL", "ONLINE"],
    required: true
  },
  inTop: {
    type: Boolean,
    default: false
  },
  
  // Медіа контент
  gameImage: {
    type: String,
    required: true
  },
  gameBoxArt: {
    type: String
  },
  gameLogo: {
    type: String
  },
  gameHero: {
    type: String
  },
  gameImages: {
    type: [String],
    default: []
  },
  gameVideoUrl: {
    type: String
  },
  gameVideoLauncherUrl: {
    type: String
  },
  
  // Метадані
  releaseDate: {
    type: Date
  },
  publisher: {
    type: String
  },
  exactingness: {
    type: Number
  },
  
  // Часові мітки
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Автоматично оновлює createdAt і updatedAt

});


module.exports = mongoose.model('Game', GameSchema);