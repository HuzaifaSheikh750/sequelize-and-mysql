const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth');

router.post('/:postId', authMiddleware, commentController.createComment);
router.get('/:postId', commentController.getComments);

module.exports = router;