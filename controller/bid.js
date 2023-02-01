class BidController {
  static getAllBids(req, res, next) {
    res.status(200).json({ message: "Success get all bids" });
  }

  static getBidById(req, res, next) {
    res.status(200).json({ message: "Success get bid with id" });
  }

  static addBid(req, res, next) {
    res.status(201).json({ message: "Success add bid" });
  }

  static editBidWithId(req, res, next) {
    res.status(200).json({ message: "Success edit bid with id ?" });
  }

  static deleteBidById(req, res, next) {
    res.status(200).json({ message: "Success delete bid with id ?" });
  }
}

module.exports = BidController;
