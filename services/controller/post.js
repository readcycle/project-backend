const imageKit = require("../helper/imageKit");
const { Post } = require("../models");

class PostController {
  static async find(req, res, next) {
    const { search, genre, user } = req.query;
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "fullname", "email"],
          },
          {
            model: Genre,
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Genre,
          },
        ],
      });
      if (!post) throw { name: "post_not_found" };

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { condition, description, UserId, BookId, imageUrl } = req.body;
    const { file } = req;
    try {
      // if (!file) throw { name: "image_not_found" };

      // const { err, response } = imageKit.upload({
      //   file: file.buffer.toString("base64"),
      //   fileName: Date.now() + "-" + file.fieldname + ".png",
      //   folder: "images_posts",
      // });

      // if (err) throw { name: "image_not_found" };

      // const imageUrl = imageKit.url({
      //   src: url,
      //   transformation: [
      //     {
      //       quality: "80",
      //       format: "png",
      //       focus: "auto",
      //     },
      //   ],
      // });

      const newPost = await Post.create({
        BookId,
        condition,
        description,
        UserId,
        isClosed: false,
        imageUrl,
      });

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { condition, description, BookId } = req.body;

    try {
      const post = await Post.findByPk(id);
      if (!post) throw { name: "post_not_found" };

      await post.update({
        condition,
        description,
        BookId,
      });

      res
        .status(200)
        .json({ message: `Edit Sucessfull for post with id ${id}` });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) throw { name: "post_not_found" };

      await post.update({ isClosed: !post.isClosed });

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
