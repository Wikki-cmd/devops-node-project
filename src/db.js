
const { MongoClient } = require("mongodb");

// Read MongoDB connection URL
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

// Create MongoDB client
const client = new MongoClient(mongoUrl);

let database;

// Connect to MongoDB
async function connectDB() {
  await client.connect();

  database = client.db("transactions");

  console.log("Connected to MongoDB successfully");
}

// Get database instance
function getDB() {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
}

module.exports = { connectDB, getDB };
