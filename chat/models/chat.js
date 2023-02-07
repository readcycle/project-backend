const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Chat {
  static chatCollection() {
    return getDB().collection("chats");
  }

  static async find(id) {
    return await this.chatCollection()
      .find({ users: { $in: [id] } })
      .toArray();
  }

  static async findOne(id) {
    return await this.chatCollection().findOne({ _id: ObjectId(id) });
  }

  static async create(id, id2) {
    return await this.chatCollection().insertOne({
      users: [id, id2],
      latestMsg: null,
    });
  }

  static async update(id, latestMsg) {
    return await this.chatCollection({ _id: ObjectId(id) }, null, {
      $set: { latestMsg },
    });
  }
}

module.exports = Chat;
