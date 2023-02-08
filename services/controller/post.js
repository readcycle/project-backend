const { Op } = require("sequelize");
const imageKit = require("../helper/imageKit");
const { Post, User, Genre, Book, Bid, sequelize } = require("../models");
const BidController = require("./bid");

class PostController {
	static async find(req, res, next) {
		const { search, genre, user, long, lat, isClosed } = req.query;
		console.log(user, "THIZ");
		let option = {
			include: [
				{ model: User, attributes: ["fullname", "avatar", "city"] },
				{
					model: Book,
					attributes: ["title", "author"],
					include: [{ model: Genre, attributes: ["name"] }],
				},
				{
					model: Bid,
					include: [
						{ model: User, attributes: ["id", "fullname", "avatar", "city"] },
						{
							model: Book,
							attributes: ["title", "author"],
							include: [{ model: Genre, attributes: ["name"] }],
						},
					],
				},
			],
		};
		if (search)
			option.include[1].where = {
				...option.include[1].where,
				title: { [Op.iLike]: `%${search}%` },
			};
		if (genre)
			option.include[1].where = { ...option.include[1].where, GenreId: +genre };
		if (user) option.include[0].where = { id: +user };
		if (long && lat)
			option.include[0].where = sequelize.where(
				sequelize.fn(
					"ST_DWithin",
					sequelize.col("location"),
					sequelize.fn("ST_GeomFromText", `POINT(${long} ${lat})`),
					10000,
					true
				),
				true
			);
		if (isClosed === "false") option.where = { isClosed: false };

		try {
			const posts = await Post.findAll(option);

			res.status(200).json(posts);
		} catch (error) {
			next(error);
		}
	}

	static async findOne(req, res, next) {
		const { id } = req.params;
		try {
			const post = await Post.findByPk(id);
			if (!post) throw { name: "post_not_found" };

			res.status(200).json(post);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		const { condition, description, title, author, GenreId } = req.body;
		const { file } = req;
		const { id } = req.user;
		const UserId = id;
		try {
			const t = await sequelize.transaction();
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
					let [book, created] = await Book.findOrCreate({
						where: { title },
						defaults: { title, author, GenreId },
						transaction: t,
					});
					const newPost = await Post.create(
						{
							BookId: book.id,
							condition,
							description,
							UserId,
							isClosed: false,
							imageUrl,
						},
						{ transaction: t }
					);
					await t.commit();
					res.status(201).json(newPost);
				}
			);
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	// static async update(req, res, next) {
	//   const { id } = req.params;
	//   const { condition, description, BookId } = req.body;
	//   try {
	//     const post = await Post.findByPk(id);
	//     if (!post) throw { name: "post_not_found" };

	//     await post.update({
	//       condition,
	//       description,
	//       BookId,
	//     });

	//     res
	//       .status(200)
	//       .json({ message: `Edit Sucessfull for post with id ${id}` });
	//   } catch (error) {
	//     next(error);
	//   }
	// }

	static async changeStatus(req, res, next) {
		const { id } = req.params;
		try {
			const post = await Post.findByPk(id);
			if (!post) throw { name: "post_not_found" };

			post.isClosed = !post.isClosed;

			await post.save();

			res.status(200).json({
				message: `Status of post with id ${id} is changed successfully`,
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		const { id } = req.params;
		try {
			const post = await Post.findByPk(id);
			if (!post) throw { name: "post_not_found" };

			await post.destroy();

			res.status(200).json({ message: `Post with id ${id} is deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = PostController;
