import bcrypt from 'bcrypt';
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(req.body);
        user.password = hashedPassword;
        user.email = req.body.email;
        user.name = req.body.name;
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
        User.find({})
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
        const { username } = req.params;
        const { password, newPassword, email, name } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;

        if (newPassword) {
            const passwordCheck = validate(newPassword);
            if (!passwordCheck.valid) {
                return res.status(400).send({ message: passwordCheck.message });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();
        res.status(200).send({ message: 'User updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send({
                message: 'Username and password is required to delete user'
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }


        User.deleteOne({ username: username })
            .then(() => {
                res.status(200).send({ message: "User deleted successfully"});
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
