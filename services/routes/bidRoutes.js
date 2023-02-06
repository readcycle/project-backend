const BidController = require("../controller/bid");
const { authUser } = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

const bidRouter = require("express").Router();

bidRouter.get("/", BidController.getAllBids);
bidRouter.get("/:id", BidController.getBidById);
bidRouter.post("/", authUser, upload.single("file"), BidController.addBid);

module.exports = bidRouter;
