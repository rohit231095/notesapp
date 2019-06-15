const db = require('../config/database');
const rel = require('../config/relation');

const httpStatus = require('http-status-codes');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const User = rel.user;

exports.start = (req, res, next) => {
    console.log('*** Notes App Running ***');
    res.send('*** Notes App Running ***');
}

exports.signup = (req, res, next) => {
    const user = req.body;
    console.log('User -->', user);

    user.userName = user.email;

    User.findOne({
        where: {
            isActive: true,
            email: user.email
        }
    })
        .then(userFound => {
            if (userFound !== null) {
                res.status(httpStatus.CONFLICT).json({
                    message: 'Email in use by another user'
                });
            } else {
                User.findOne({
                    where: {
                        isActive: true,
                        mobile: user.mobile
                    }
                })
                    .then(userFound => {
                        if (userFound !== null) {
                            res.status(httpStatus.CONFLICT).json({
                                message: 'Mobile No. in use by another user'
                            });
                        } else {
                            User.create(user)
                                .then(userCreated => {
                                    if (userCreated !== null) {
                                        res.status(httpStatus.CREATED).json({
                                            message: 'User added successfully'
                                        });
                                    }
                                })
                                .catch(err => {
                                    console.log('Error -->', err);
                                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
                                })
                        }
                    })
                    .catch(err => {
                        console.log('Error -->', err);
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
                    })
            }
        })
        .catch(err => {
            console.log('Error -->', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}

exports.login = (req, res, next) => {
    console.log('*** Login Tried ***');

    const user = req.body;
    console.log('User -->', user);

    User.findOne({
        where: {
            isActive: true,
            userName: user.userName
        }
    })
        .then(userFound => {
            if (userFound !== null) {
                if (userFound.password === user.password) {
                    res.status(httpStatus.OK).json({
                        auth: true,
                        status: 200,
                        user: user,
                        message: "Successfully Logged In"
                    });
                } else {
                    res.status(httpStatus.UNAUTHORIZED).json({
                        auth: false,
                        message: "Wrong password!"
                    });
                }
            } else {
                res.status(httpStatus.UNAUTHORIZED).json({
                    auth: false,
                    message: "Invalid Username!"
                });
            }
        })
        .catch(err => {
            console.log('Error -->', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        })
}