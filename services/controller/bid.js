const { Bid, User, Post, Book } = require("../models");

class BidController {
  static async getAllBids(req, res, next) {
    try {
      const data = await Bid.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "fullname", "email"],
          },
          {
            model: Book,
            attributes: ["id", "title", "author"],
          },
          {
            model: Post,
            attributes: ["id", "title", "author"],
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getBidById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Bid.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Book,
          },
          {
            model: Post,
          },
        ],
      });
      if (!data) throw { name: "not_found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addBid(req, res, next) {
    try {
      const { UserId, PostId, BookId } = req.body;
      const data = await Bid.create({
        UserId,
        PostId,
        BookId,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editBidWithId(req, res, next) {
    try {
      const { id } = req.params;
      const { UserId, PostId, BookId } = req.body;
      const data = await Bid.findOne({ where: { id } });
      if (!data) throw { name: "not_found" };
      await data.update({
        UserId,
        PostId,
        BookId,
      });
      res.status(200).json({ message: `Success edit bid with id : ${id}` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBidById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Bid.findOne({ where: { id } });
      if (!data) throw { name: "not_found" };
      await data.destroy();
      res.status(200).json({ message: `Success delete bid with id : ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BidController;
