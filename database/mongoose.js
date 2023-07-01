const mongoose = require("mongoose");

mongoose.Promise = global.Promise; //this allow us to use promises in our backend application.

mongoose
  .connect(
    "mongodb+srv://ambika:E2eqODUw6rtzsVxw@cluster0.ihobq4l.mongodb.net/todoapp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connection successful!");
  })
  .catch((err) => {
    console.log("error occurred while DB connection", err);
  });

module.exports = mongoose;
