// src/controllers/postController.js
const PostModel = require('../models/postModel');

// GET /api/posts  (?grupoId= & ?autorId=)
async function listPosts(req, res, next) {
  try {
    const { grupoId, autorId } = req.query;
    const posts = await PostModel.getAllPosts({ grupoId, autorId });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /api/posts/:id
async function getPost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await PostModel.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// POST /api/posts
async function createPost(req, res, next) {
  try {
    const { texto, autorId, grupoId } = req.body;

    if (!texto || !autorId || !grupoId) {
      return res.status(400).json({
        error: 'texto, autorId e grupoId são obrigatórios'
      });
    }

    const post = await PostModel.createPost({ texto, autorId, grupoId });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

// PUT /api/posts/:id
async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const { texto } = req.body;

    const updated = await PostModel.updatePost(id, { texto });
    if (!updated) return res.status(404).json({ error: 'Post não encontrado' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/posts/:id
async function deletePost(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await PostModel.deletePost(id);
    if (!deleted) return res.status(404).json({ error: 'Post não encontrado' });

    res.json({ message: 'Post deletado com sucesso' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};