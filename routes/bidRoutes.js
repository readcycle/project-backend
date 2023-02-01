const BidController = require("../controller/bid");

const bidRouter = require("express").Router();

bidRouter.get("/", BidController.getAllBids);
bidRouter.get("/:Id", BidController.getBidById);
bidRouter.post("/", BidController.addBid);
bidRouter.put("/:id", BidController.editBidWithId);
bidRouter.delete("/:id", BidController.deleteBidById);

module.exports = bidRouter;
