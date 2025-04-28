const { sequelize } = require('../config/database');
const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

// User-Post Relationship (One-to-Many)
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts'
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});

// User-Comment Relationship (One-to-Many)
User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'commenter'
});

// Post-Comment Relationship (One-to-Many)
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post'
});

module.exports = {
  User,
  Post,
  Comment
};