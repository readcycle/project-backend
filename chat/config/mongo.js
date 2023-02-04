const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let chats, messages;

async function connect() {
  try {
    await client.connect();
    console.log("MongoDB connected...");

    const db = client.db("chatDB");
    chats = db.collection("chats");
    messages = db.collection("messages");
  } catch (error) {
    await client.close();
  }
}

function getCollection() {
  return { chats, messages };
}

module.exports = { getCollection, connect };
