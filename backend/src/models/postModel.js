// src/models/postModel.js
const db = require('../config/db');

// Lista todos os posts
async function getAllPosts({ grupoId, autorId } = {}) {
  const conditions = [];
  const params = [];

  if (grupoId) {
    params.push(grupoId);
    conditions.push(`p.grupo_id = $${params.length}`);
  }
  if (autorId) {
    params.push(autorId);
    conditions.push(`p.autor_id = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const result = await db.query(
    `SELECT p.id, p.texto, p.created_at,
            u.id AS autor_id, u.username AS autor_username,
            g.id AS grupo_id, g.nome AS grupo_nome
     FROM posts p
     JOIN usuarios u ON p.autor_id = u.id
     JOIN grupos g ON p.grupo_id = g.id
     ${where}
     ORDER BY p.created_at DESC`,
    params
  );
  return result.rows;
}

async function getPostById(id) {
  const result = await db.query(
    `SELECT p.id, p.texto, p.created_at,
            u.id AS autor_id, u.username AS autor_username,
            g.id AS grupo_id, g.nome AS grupo_nome
     FROM posts p
     JOIN usuarios u ON p.autor_id = u.id
     JOIN grupos g ON p.grupo_id = g.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

// Cria um post
async function createPost({ texto, autorId, grupoId }) {
  const result = await db.query(
    `INSERT INTO posts (texto, autor_id, grupo_id)
     VALUES ($1, $2, $3)
     RETURNING id, texto, created_at, autor_id, grupo_id`,
    [texto, autorId, grupoId]
  );
  return result.rows[0];
}

// Atualiza o texto do post
async function updatePost(id, { texto }) {
  const result = await db.query(
    `UPDATE posts
     SET texto = $1
     WHERE id = $2
     RETURNING id, texto, created_at, autor_id, grupo_id`,
    [texto, id]
  );
  return result.rows[0] || null;
}

// Deleta post
async function deletePost(id) {
  const result = await db.query(
    'DELETE FROM posts WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};