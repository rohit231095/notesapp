const db = require('../config/database');
const rel = require('../config/relation');

const httpStatus = require('http-status-codes');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const Notes = rel.notes;

exports.create = (req, res, next) => {
    const note = req.body;
    console.log('Note -->', note);

    Notes.create(note)
        .then(noteCreated => {
            if (noteCreated !== null) {
                res.status(httpStatus.CREATED).json({
                    message: 'Note added'
                });
            }
        })
        .catch(err => {
            console.log('Error -->', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}