const BidController = require("../controller/bid");

const bidRouter = require("express").Router();

bidRouter.get("/", BidController.getAllBids);
bidRouter.get("/:id", BidController.getBidById);
bidRouter.post("/", BidController.addBid);

module.exports = bidRouter;
