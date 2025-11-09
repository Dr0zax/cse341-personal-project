import db from '../models/index.js';
const Task = db.task;

const create = async (req, res) => {
    try {
        if (!req.oidc.isAuthenticated()) {
          return res.status(401).send({
            message: "unauthorized"
          })
        }

        const userSub = req.oidc.user.sub;
        const { title, description, dueDate, priority, status } = req.body;

        const task = new Task({ 
          userSub: userSub, 
          title: title, 
          description: 
          description, 
          dueDate: dueDate, 
          priority: priority, 
          status: status 
        });

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
        if (!req.oidc.isAuthenticated()) {
          return res.status(401).send({
            message: "unauthorized"
          })
        }

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
    if (!req.oidc.isAuthenticated()) {
          return res.status(401).send({
            message: "unauthorized"
      })
    }

    const { id } = req.params;

    Task.findOne({ _id: id })
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'task not found'
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
    if (!req.oidc.isAuthenticated()) {
          return res.status(401).send({
            message: "unauthorized"
      })
    }

    const { id } = req.params;
    const {title, description, dueDate, priority, status } = req.body;

    if (!id) {
        return res.status(400).send({
            message: 'id is required'
        });
    }

    const task = await Task.findOne({ _id: id })
    if (!task) {
        return res.satus(400).send({ message: "task not found" });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.dueDate) task.dueDate = req.body.dueDate;
    if (req.body.priority) task.priority = req.body.priority;
    if (req.body.status) task.status = req.body.status;
        
    await task.save();
      
    res.status(204).send();

  } catch (err) {
    res.status(500).send({
        message: err.message
    });
  }
};

const deleteTask = async (req, res) => {
    try {
      if (!req.oidc.isAuthenticated()) {
          return res.status(401).send({
            message: "unauthorized"
        })
      }
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