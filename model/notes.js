const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Note = sequelize.define('notes', {
    noteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    noteDesc: {
        type: Sequelize.STRING(5000)
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Note;