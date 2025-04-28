const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, postController.createPost); // Create a new post
router.get('/', postController.getAllPosts); // Get all posts
router.get('/:id', postController.getPost); // Get a single post by ID
router.put('/:id', authMiddleware, postController.updatePost); // Update a post by ID
router.delete('/:id', authMiddleware, postController.deletePost); // Delete a post by ID

module.exports = router;