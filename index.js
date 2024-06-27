const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(`mongodb+srv://${db_username}:${db_password}@bankingsystem.b1kd5k4.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Define a schema and model for transactions
const transactionSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  remark: String,
  date: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/transactions", async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).send("Transaction not found");
    res.status(200).send("Transaction deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});