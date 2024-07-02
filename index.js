const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const route = require("./routes/route");

const port = process.env.PORT || 3000;

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${db_username}:${db_password}@bankingsystem.b1kd5k4.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/transactions", route);
