
const express = require("express");


const app = express();

app.use(express.json());

// Temporary in-memory transaction storage
const transactions = [
{
id: 1,
policyId: "POL1001",
amount: 5000,
status: "Processed"
},
{
id: 2,
policyId: "POL1002",
amount: 7500,
status: "Pending"
}
];

// Health check endpoint
app.get("/health", (req, res) => {
res.status(200).json({
status: "UP",
message: "Application is running"
});
});

// Get all transactions
app.get("/transactions", (req, res) => {
res.status(200).json(transactions);
});

// Get transaction by ID
app.get("/transactions/:id", (req, res) => {
const transaction = transactions.find(
t => t.id === Number(req.params.id)
);

if (!transaction) {
return res.status(404).json({
message: "Transaction not found"
});
}

res.status(200).json(transaction);
});

// Create a transaction
app.post("/transactions", (req, res) => {
const { policyId, amount } = req.body;

if (!policyId || typeof policyId !== "string" ||
typeof amount !== "number" || !Number.isFinite(amount) ||
amount <= 0) {
return res.status(400).json({
message: "Valid policyId and positive amount are required"
});
}

const newTransaction = {
id: transactions.length + 1,
policyId,
amount,
status: "Pending"
};

transactions.push(newTransaction);

res.status(201).json(newTransaction);
});

module.exports = app;
