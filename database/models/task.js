const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3,
  },
  _taskListId: {
    type: mongoose.Types.ObjectId, //_listId will be storing the id of taskList object.
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
