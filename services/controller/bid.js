const { Bid } = require("../models");

class BidController {
  static async getAllBids(req, res, next) {
    const { user, post } = req.query;
    let options = { where: {} };
    try {
      if (user) options.where = { UserId: user };
      if (post) options.where = { PostId: post };

      const bids = await Bid.findAll(options);

      res.status(200).json(bids);
    } catch (error) {
      next(error);
    }
  }

  static async getBidById(req, res, next) {
    const { id } = req.params;
    try {
      const bid = await Bid.findByPk(id);
      if (!bid) throw { name: "bid_not_found" };

      res.status(200).json(bid);
    } catch (error) {
      next(error);
    }
  }

  static async addBid(req, res, next) {
    const { BookId, description, condition, imageUrl, PostId } = req.body;
    try {
      const newBid = await Bid.create({
        BookId,
        description,
        condition,
        UserId: req.user.id,
        imageUrl,
        PostId,
      });

      res.status(201).json(newBid);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BidController;
