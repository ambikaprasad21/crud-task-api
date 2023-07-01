const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true, //unnecessary spaces should be removed
    minlength: 3,
  },
});

const TaskList = mongoose.model("TaskList", TaskListSchema);

module.exports = TaskList;
