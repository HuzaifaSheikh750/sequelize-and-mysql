const { Comment, Post, User } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      user_id: req.user.id,
      post_id: post.id
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.postId },
      include: [{
        association: 'commenter',
        attributes: ['id', 'username']
      }],
      order: [['created_at', 'DESC']]
    });

    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};