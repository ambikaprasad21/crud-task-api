const express = require("express");

const app = express();

const mongoose = require("./database/mongoose");
const TaskList = require("./database/models/taskList");
const Task = require("./database/models/task");

/*
CORS - Cross Origin Request Security
Backend - http://localhost:8000
Frontend - https://localhost:3000
express will only allow request comming from port 8000 we need to tell express to also allow request from our fronted.
*/

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request method you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-with, Content-Type"
  );

  // set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // pass to next layer of middleware
  next();
});

// Example of middleware whenever we use use keyword we are using middleware. This middleware runs before processing request.
app.use(express.json()); // or  3rd party library body parser

// Routes of REST API Endpoints or RESTFul webservices Endpoints
/*
TaskList - create, update, ReadTaskListById, ReadAllTaskList
List - create update, ReadTaskById, ReadAllTask
*/

//Routes or API endpoints for TaskList model
// Get all the Lists
// http://localhost:8000/tasklists => [{tasklist1}, {tasklist2},{tasklist3}]
// https://www.restapitutorial.com/lessons/httpmethods.html
app.get("/tasklists", async function (req, res) {
  // assume task list as bucket and each bucket contains some task
  try {
    const tasklist = await TaskList.find({});
    res.send(tasklist);
  } catch (err) {
    console.log("Error fetching tasklist");
  }
});

//Endpoint to get one tasklist by tasklistId: http://localhost:8001/tasklist/voajbjaohviuauha
app.get("/tasklists/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const task = await TaskList.find({ _id: id });

    res.status(200).json({
      task,
    });
  } catch (err) {
    console.log("Error occured geting task");
  }
});

// Route for endpoint for creating a tasklist
app.post("/tasklists", async function (req, res) {
  try {
    const newtasklist = await TaskList.create(req.body);
    res.status(201).json({
      newtasklist,
    });
  } catch (err) {
    console.log("Error in creating tasklist");
  }
});

// put is full update and patch is partial update, first we will find the taslist that we want to update.
app.patch("/tasklists/:id", async function (req, res) {
  try {
    const tasklist = await TaskList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // we need to use option inside findbyidandupadte and that is set to new: true so that exact change is send back to response.
    res.status(200).json({
      tasklist,
    });
  } catch (err) {
    console.log("error in getting and updating tasklist");
  }
});

// Delete a tasklid by id
app.delete("/tasklists/:id", async function (req, res) {
  try {
    await Task.deleteMany({ _taskListId: req.params.id });
    const data = await TaskList.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "task deleted...",
    });
  } catch (err) {
    console.log("Error in deleting the tasklist");
  }
});

// CRUD operation for task, a task should always belong to a task list.
// http://localhost:8001/tasklist/:tasklistid/tasks --> this url gives all the task of a particular tasklist
app.get("/tasklists/:tasklistid/tasks", async function (req, res) {
  try {
    const data = await Task.find({ _taskListId: req.params.tasklistid });
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log("Error getting tasks from given tasklist id");
  }
});
//create task inside a particular tasklist
app.post("/tasklists/:tasklistid/tasks", async function (req, res) {
  try {
    const title = req.body.title;
    const _taskListId = req.params.tasklistid;
    const newTask = await Task.create({ title, _taskListId });
    res.status(201).json({
      status: "success",
      data: newTask,
    });
  } catch (err) {
    console.log("error creating task");
  }
});
// http://localhost:8001/tasklist/:tasklistid/tasks/:taskid
// get 1 task inside 1 tasklist
app.get("/tasklists/:tasklistid/tasks/:taskid", async function (req, res) {
  try {
    const data = await Task.findOne({
      _taskListId: req.params.tasklistid,
      _id: req.params.taskid,
    }); //find method works as filter so we can pass different check points to get data out of collection
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log("Error getting tasks from given tasklist id");
  }
});

// update 1 task belonging to 1 tasklist
app.patch("/tasklists/:tasklistid/tasks/:taskid", async function (req, res) {
  try {
    const data = await Task.findByIdAndUpdate(
      { _taskListId: req.params.tasklistid, _id: req.params.taskid },
      req.body,
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    console.log("Error updating task ");
  }
});

// Delete 1 task belonging to 1 tasklist
app.delete("/tasklists/:tasklistid/tasks/:taskid", async function (req, res) {
  try {
    const data = await Task.findByIdAndDelete({
      _taskListId: req.params.tasklistid,
      _id: req.params.taskid,
    });
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log("Error in deleting task");
  }
});

const port = 8001;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
