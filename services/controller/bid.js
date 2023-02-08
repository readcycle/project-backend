const { Bid, User, Post, Book, Genre } = require("../models");

class BidController {
	static async getAllBids(req, res, next) {
		const { user, post, userPostId } = req.query;
		let options = {
			include: [{ model: Post }, { model: Book, include: [Genre] }, User],
		};
		try {
			// if (user) options.where = { UserId: user };
			if (post) options.where = { PostId: post };
			if (userPostId) options[0].where = { UserId: userPostId };

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
		const { BookId, description, condition, UserId, PostId } = req.body;
		try {
			if (!file) throw { name: "image_not_found" };

			imageKit.upload(
				{
					file: file.buffer.toString("base64"),
					fileName: Date.now() + "-" + file.fieldname + ".png",
					folder: "images_posts",
				},
				async (err, response) => {
					if (err) throw { name: "image_not_found" };

					const imageUrl = imageKit.url({
						src: response.url,
						transformation: [
							{
								quality: "80",
								format: "png",
								focus: "auto",
							},
						],
					});

					const newBid = await Bid.create({
						BookId,
						description,
						condition,
						UserId,
						imageUrl,
						PostId,
					});

					res.status(201).json(newBid);
				}
			);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = BidController;
