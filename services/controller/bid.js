const { Bid, User, Post, Book, Genre, sequelize } = require("../models");
const imageKit = require("../helper/imageKit");

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
			const bid = await Bid.findByPk(id, {
				include: [{ model: Post }, { model: Book, include: [Genre] }, User],
			});
			if (!bid) throw { name: "bid_not_found" };

			res.status(200).json(bid);
		} catch (error) {
			next(error);
		}
	}

	static async addBid(req, res, next) {
		const { title, author, GenreId, description, condition, PostId } = req.body;
		const { file } = req;
		const { id } = req.user;
		const t = await sequelize.transaction();
		try {
			if (!file) throw { name: "image_not_found" };

			imageKit.upload(
				{
					file: file.buffer.toString("base64"),
					fileName: Date.now() + "-" + file.fieldname + ".png",
					folder: "images_bids",
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

					let [book, created] = await Book.findOrCreate({
						where: { title },
						defaults: { title, author, GenreId },
						transaction: t,
					});

					const newBid = await Bid.create(
						{
							BookId: book.id,
							description,
							condition,
							UserId: id,
							imageUrl,
							PostId,
						},
						{ transaction: t }
					);

					await t.commit();

					res.status(201).json(newBid);
				}
			);
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
}

module.exports = BidController;
