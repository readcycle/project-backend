const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Message {
  static msgCollection() {
    return getDB().collection("messages");
  }

  static async find(id) {
    return await this.msgCollection()
      .find({ chatId: ObjectId(id) })
      .toArray();
  }

  static async findOne(id) {
    return await this.msgCollection().findOne({ _id: ObjectId(id) });
  }

  static async create(id, message) {
    return await this.msgCollection().insertOne({
      senderId: id,
      message,
    });
  }

  static async update(id, latestMsg) {
    return await this.msgCollection({ _id: ObjectId(id) }, null, {
      $set: { latestMsg },
    });
  }
}

module.exports = Message;
