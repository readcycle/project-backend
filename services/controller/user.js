const { funcValidateHash } = require("../helper/bcryptHandler");
const { tokenize } = require("../helper/jwtHandler");
const { User, Sequelize, sequelize } = require("../models");

class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const optionQuery = {
				attributes: { exclude: ["password"] },
			};

			const data = await User.findAll(optionQuery);
			console.log(data);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async getUserById(req, res, next) {
		const { id } = req.params;
		try {
			const data = await User.findByPk(id, {
				attributes: { exclude: ["password"] },
			});
			if (!data) throw { name: "not_found" };

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async userEditProfile(req, res, next) {
		try {
			const { id } = req.params;
			const { fullname, phoneNumber, city, favoriteBook, favoriteGenre } =
				req.body;
			const data = await User.findByPk(id);
			if (!data) throw { name: "not_found" };
			await data.update({
				fullname,
				phoneNumber,
				city,
				favoriteBook,
				favoriteGenre,
			});

			res
				.status(200)
				.json({ message: `Success edit user profile with id : ${id}` });
		} catch (error) {
			next(error);
		}
	}

	static async userIsBannedStatus(req, res, next) {
		try {
			const { id } = req.params;
			const data = await User.findByPk(id);
			if (!data) throw { name: "not_found" };
			data.set({
				isBanned: true,
			});
			await data.save();
			res.status(200).json({
				message: `Success update isBanned status of user with id : ${id}`,
			});
		} catch (error) {
			next(error);
		}
	}
}

class UserAuthenticationController {
	static async userLogin(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email) throw { name: "empty_email" };
			if (!password) throw { name: "empty_password" };
			const data = await User.findOne({ where: { email } });
			if (!data) throw { name: "wrong_email_password" };
			const validPassword = funcValidateHash(data.password, password);
			if (!validPassword) throw { name: "wrong_email_password" };
			const access_token = tokenize({ id: data.id, email: data.email });
			res
				.status(200)
				.json({ access_token, fullname: data.fullname, id: data.id });
		} catch (error) {
			next(error);
		}
	}

	static async userRegister(req, res, next) {
		try {
			const {
				fullname,
				email,
				password,
				phoneNumber,
				city,
				favoriteGenre,
				favoriteBook,
			} = req.body;
			const { file } = req.file;

			const longitude = 106.88436870344368;
			const latitute = -6.2082580226240776;
			const userLocation = Sequelize.fn(
				"ST_GeomFromText",
				`POINT(${longitude} ${latitute})`
			);

			if (!file) throw { name: "image_not_found" };

			imageKit.upload(
				{
					file: file.buffer.toString("base64"),
					fileName: Date.now() + "-" + file.fieldname + ".png",
					folder: "images_posts",
				},
				async (err, response) => {
					if (err) throw { name: "image_not_found" };

					const avatar = imageKit.url({
						src: response.url,
						transformation: [
							{
								quality: "80",
								format: "png",
								focus: "auto",
							},
						],
					});

					const data = await User.create({
						fullname,
						email,
						password,
						phoneNumber,
						city,
						avatar,
						favoriteBook,
						favoriteGenre,
						location: userLocation,
						isBanned: false,
					});

					console.log(data);

					const { dataValues } = data;
					const { password: pwd, updatedAt, ...userInfo } = dataValues;
					console.log(userInfo);
					res.status(201).json(userInfo);
				}
			);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = { UserController, UserAuthenticationController };
