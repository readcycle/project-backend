const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db, chats, messages;

async function connect() {
  try {
    await client.connect();
    console.log("MongoDB connected...");

    db = client.db("chatDB");
    chats = db.collection("chats");
    messages = db.collection("messages");
  } catch (error) {
    await client.close();
  }
}

function getDB() {
  return db;
}

module.exports = { getDB, connect };
