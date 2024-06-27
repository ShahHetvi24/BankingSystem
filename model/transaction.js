const mongoose = require("mongoose");

// Define a schema and model for transactions
const transactionSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    remark: String,
    date: String,
  });

  module.exports = mongoose.model("Transaction",transactionSchema);