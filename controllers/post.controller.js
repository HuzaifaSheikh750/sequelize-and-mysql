const { Post, User, Comment } = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      user_id: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          association: "author",
          attributes: ["id", "username"],
        },
        {
          association: "comments",
          include: [
            {
              association: "commenter",
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          association: "author",
          attributes: ["id", "username"],
        },
        {
          association: "comments",
          include: [
            {
              association: "commenter",
              attributes: ["id", "username"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
