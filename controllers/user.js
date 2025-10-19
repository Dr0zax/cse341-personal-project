import db from '../models/index.js';
const User = db.user;

const create = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Username and password are required'
    });
  }

  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

const getAllUsers = async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

const getUser = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
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
};

export { create, getAllUsers, getUser };
