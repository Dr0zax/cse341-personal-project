import db from '../models/index.js';
const Task = db.task;

const create = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).send({
            message: 'User id is required'
        });
        }

        const userId = req.body.userId;
        const title = req.body.title;
        const description = req.body.description;
        const dueDate = req.body.dueDate;
        const priority = req.body.priority;
        const status = req.body.status;

        const task = new Task(req.body);
        task.save()
        .then((data) => {
            console.log(data)
            res.status(201).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const getAllTasks = async (req, res) => {
    try {
        Task.find()
        .then((tasks) => {
            res.status(200).send(tasks);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).send({
        message: 'userId is required'
      });
    }
    Task.findOne({ _id: id, userId: userId })
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'task not found for this user'
          });
        }
        res.status(200).send(task);
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

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({
            message: 'id is required'
        });
    }

    Task.findOne({ _id: id })
      .then((task) => {

        if (!task) {
          return res.satus(400).send({ message: "task not found" });
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.dueDate = req.body.dueDate;
        task.priority = req.body.priority;
        task.status = req.body.status;
        
        return task.save();
      })
      .then(() => {
        res.status(204).send();
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

const deleteTask = async (req, res) => {
    try {
      const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                message: 'id is required'
            });
        };
  
      Task.deleteOne({ _id: id })
        .then(() => {
          res.status(200).send()
        })
        .catch((err) => {
          res.status(500).send()
        })
  
    } catch (err) {
      res.status(500).send({
          message: err.message
      });
    }
  }

export { create, getAllTasks, getTask, updateTask, deleteTask }