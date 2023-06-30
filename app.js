const express = require("express");

const app = express();

const mongoose = require("./database/mongoose");

const port = 8000;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
