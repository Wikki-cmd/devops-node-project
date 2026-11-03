
const express = require("express");
const { getDB } = require("./db");

const app = express();

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Application is running"
  });
});

// Get all transactions
app.get("/transactions", async (req, res) => {
  try {
    const db = getDB();
    const transactions = await db
      .collection("transactions")
      .find({})
      .toArray();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// Get transaction by ID
app.get("/transactions/:id", async (req, res) => {
  try {
    const db = getDB();
    const transaction = await db
      .collection("transactions")
      .findOne({ id: Number(req.params.id) });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
});

// Create a transaction
app.post("/transactions", async (req, res) => {
  try {
    const { policyId, amount } = req.body;

    if (
      !policyId ||
      typeof policyId !== "string" ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        message: "Valid policyId and positive amount are required"
      });
    }

    const db = getDB();
    const collection = db.collection("transactions");

    const lastTransaction = await collection.findOne(
      {},
      { sort: { id: -1 } }
    );

    const newTransaction = {
      id: (lastTransaction?.id || 0) + 1,
      policyId,
      amount,
      status: "Pending"
    };

    await collection.insertOne(newTransaction);

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction" });
  }
});

module.exports = app;
