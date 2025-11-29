// src/models/groupModel.js
const db = require('../config/db');

// Lista todos os grupos
async function getAllGroups() {
  const result = await db.query(
    `SELECT g.id, g.nome, g.descricao, g.created_at,
            u.id AS owner_id, u.username AS owner_username
     FROM grupos g
     LEFT JOIN usuarios u ON g.owner_id = u.id
     ORDER BY g.nome ASC`
  );
  return result.rows;
}

// Grupo por ID com posts e membros
async function getGroupById(id) {
  const groupResult = await db.query(
    `SELECT g.id, g.nome, g.descricao, g.created_at,
            u.id AS owner_id, u.username AS owner_username
     FROM grupos g
     LEFT JOIN usuarios u ON g.owner_id = u.id
     WHERE g.id = $1`,
    [id]
  );
  if (groupResult.rows.length === 0) return null;
  const group = groupResult.rows[0];

  // posts do grupo
  const postsResult = await db.query(
    `SELECT p.id, p.texto, p.created_at,
            a.id AS autor_id, a.username AS autor_username
     FROM posts p
     JOIN usuarios a ON p.autor_id = a.id
     WHERE p.grupo_id = $1
     ORDER BY p.created_at DESC`,
    [id]
  );

  // membros do grupo
  const membersResult = await db.query(
    `SELECT u.id, u.username, u.email
     FROM usuarios_grupos ug
     JOIN usuarios u ON ug.usuario_id = u.id
     WHERE ug.grupo_id = $1
     ORDER BY u.username ASC`,
    [id]
  );

  return {
    ...group,
    posts: postsResult.rows,
    members: membersResult.rows
  };
}

// Cria grupo
async function createGroup({ nome, descricao, ownerId }) {
  const result = await db.query(
    `INSERT INTO grupos (nome, descricao, owner_id)
     VALUES ($1, $2, $3)
     RETURNING id, nome, descricao, created_at, owner_id`,
    [nome, descricao || null, ownerId]
  );
  return result.rows[0];
}

// Atualiza nome/descrição do grupo
async function updateGroup(id, { nome, descricao }) {
  const result = await db.query(
    `UPDATE grupos
     SET nome = $1, descricao = $2
     WHERE id = $3
     RETURNING id, nome, descricao, created_at, owner_id`,
    [nome, descricao || null, id]
  );
  return result.rows[0] || null;
}

// Deleta grupo (posts devem ser deletados em cascata via FK)
async function deleteGroup(id) {
  const result = await db.query(
    'DELETE FROM grupos WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
}

// Adiciona usuário a um grupo (join table)
async function addUserToGroup({ usuarioId, grupoId }) {
  const result = await db.query(
    `INSERT INTO usuarios_grupos (usuario_id, grupo_id)
     VALUES ($1, $2)
     ON CONFLICT (usuario_id, grupo_id) DO NOTHING
     RETURNING usuario_id, grupo_id`,
    [usuarioId, grupoId]
  );
  return result.rows[0] || null;
}

// Remove usuário de um grupo
async function removeUserFromGroup({ usuarioId, grupoId }) {
  const result = await db.query(
    `DELETE FROM usuarios_grupos
     WHERE usuario_id = $1 AND grupo_id = $2
     RETURNING usuario_id, grupo_id`,
    [usuarioId, grupoId]
  );
  return result.rows[0] || null;
}

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup
};