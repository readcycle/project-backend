const BidController = require("../controller/bid");
const { authUser } = require("../middlewares/authentication");

const bidRouter = require("express").Router();

bidRouter.get("/", BidController.getAllBids);
bidRouter.get("/:id", BidController.getBidById);
bidRouter.post("/", authUser, BidController.addBid);

module.exports = bidRouter;
