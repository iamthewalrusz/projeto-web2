// src/models/userModel.js
const db = require('../config/db');

// Lista todos os usuários (sem a senha)
async function getAllUsers() {
  const result = await db.query(
    'SELECT id, username, email, created_at FROM usuarios ORDER BY id'
  );
  return result.rows;
}

// Usuário por ID, com posts e grupos (3 SELECTs)
async function getUserById(id) {
  // dados básicos
  const userResult = await db.query(
    'SELECT id, username, email, created_at FROM usuarios WHERE id = $1',
    [id]
  );
  if (userResult.rows.length === 0) return null;
  const user = userResult.rows[0];

  // posts do usuário
  const postsResult = await db.query(
    `SELECT p.id, p.texto, p.created_at, g.id AS grupo_id, g.nome AS grupo_nome
     FROM posts p
     LEFT JOIN grupos g ON p.grupo_id = g.id
     WHERE p.autor_id = $1
     ORDER BY p.created_at DESC`,
    [id]
  );

  // grupos que o usuário participa
  const groupsResult = await db.query(
    `SELECT g.id, g.nome, g.created_at
     FROM usuarios_grupos ug
     JOIN grupos g ON ug.grupo_id = g.id
     WHERE ug.usuario_id = $1
     ORDER BY g.nome ASC`,
    [id]
  );

  return {
    ...user,
    posts: postsResult.rows,
    groups: groupsResult.rows
  };
}

// Busca usuário por email (para login)
async function getUserByEmail(email) {
  const result = await db.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

// Cria usuário
async function createUser({ username, email, senhaHash }) {
  const result = await db.query(
    `INSERT INTO usuarios (username, email, senha_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, created_at`,
    [username, email, senhaHash]
  );
  return result.rows[0];
}

// Atualiza dados básicos do usuário
async function updateUser(id, { username, email }) {
  const result = await db.query(
    `UPDATE usuarios
     SET username = $1, email = $2
     WHERE id = $3
     RETURNING id, username, email, created_at`,
    [username, email, id]
  );
  return result.rows[0] || null;
}

// Deleta usuário (FKs devem estar com ON DELETE CASCADE)
async function deleteUser(id) {
  const result = await db.query(
    'DELETE FROM usuarios WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};