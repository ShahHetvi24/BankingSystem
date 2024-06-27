const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction");

router.get("/", async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.post("/", async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
      await transaction.save();
      res.status(201).json(transaction);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!transaction) return res.status(404).send("Transaction not found");
      res.status(200).send("Transaction deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = router;