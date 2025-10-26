import db from '../models/index.js';
import { validate } from '../utils/validator.js';
const User = db.user;

const create = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({
                message: 'Username and password are required'
            });
        }

        const password = req.body.password;
        const passwordCheck = validate(password);

        if (!passwordCheck.valid) {
            return res.status(400).send({
                message: passwordCheck.message
            });
        }

        const user = new User(req.body);
        user.save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        User.find()
            .then((users) => {
                res.status(200).send(users);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        const username = req.params.username;
        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User not found'
                    });
                }
                res.status(200).send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(400).send({
                message: 'Username is required'
            });
        }
        const password = req.body.password;
        const passwordCheck = validate(password);

        if (!passwordCheck.valid) {
            return res.status(400).send({
                message: passwordCheck.message
            });
        }

        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    return res.satus(400).send({ message: 'user not found' });
                }

                user.username = req.body.username;
                user.password = req.body.password;
                user.email = req.body.email;
                user.name = req.body.name;

                return user.save();
            })
            .then(() => {
                res.status(204).send();
            })
            .catch((err) => {
                res.status(500).send();
            });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(400).send({
                message: 'Username is required'
            });
        }

        User.deleteOne({ username: username })
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.status(500).send();
            });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

export { create, getAllUsers, getUser, updateUser, deleteUser };
