class BidController {
  static getAllBids(req, res, next) {
    res.status(200).json({ message: "Success get all bids" });
  }

  static getBidById(req, res, next) {
    const { id } = req.params;
    res.status(200).json({ message: `Success get bid with id : ${id}` });
  }

  static addBid(req, res, next) {
    res.status(201).json({ message: "Success add a new bid" });
  }

  static editBidWithId(req, res, next) {
    const { id } = req.params;
    res.status(200).json({ message: `Success edit bid with id : ${id}` });
  }

  static deleteBidById(req, res, next) {
    const { id } = req.params;
    res.status(200).json({ message: `Success delete bid with id : ${id}` });
  }
}

module.exports = BidController;
