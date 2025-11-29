// src/controllers/groupController.js
const GroupModel = require('../models/groupModel');

// GET /api/groups
async function listGroups(req, res, next) {
  try {
    const groups = await GroupModel.getAllGroups();
    res.json(groups);
  } catch (err) {
    next(err);
  }
}

// GET /api/groups/:id
async function getGroup(req, res, next) {
  try {
    const { id } = req.params;
    const group = await GroupModel.getGroupById(id);
    if (!group) return res.status(404).json({ error: 'Grupo não encontrado' });
    res.json(group);
  } catch (err) {
    next(err);
  }
}

// POST /api/groups
async function createGroup(req, res, next) {
  try {
    const { nome, descricao, ownerId } = req.body;

    if (!nome || !ownerId) {
      return res.status(400).json({ error: 'nome e ownerId são obrigatórios' });
    }

    const group = await GroupModel.createGroup({ nome, descricao, ownerId });
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
}

// PUT /api/groups/:id
async function updateGroup(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const updated = await GroupModel.updateGroup(id, { nome, descricao });
    if (!updated) return res.status(404).json({ error: 'Grupo não encontrado' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/groups/:id
async function deleteGroup(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await GroupModel.deleteGroup(id);
    if (!deleted) return res.status(404).json({ error: 'Grupo não encontrado' });

    res.json({ message: 'Grupo deletado com sucesso' });
  } catch (err) {
    next(err);
  }
}

// POST /api/groups/:id/join
async function joinGroup(req, res, next) {
  try {
    const { id } = req.params; // groupId
    const { usuarioId } = req.body;

    const rel = await GroupModel.addUserToGroup({ usuarioId, grupoId: id });
    if (!rel) {
      // já estava no grupo ou algo assim
      return res.status(200).json({ message: 'Usuário já está no grupo ou nada mudou' });
    }
    res.status(201).json(rel);
  } catch (err) {
    next(err);
  }
}

// POST /api/groups/:id/leave
async function leaveGroup(req, res, next) {
  try {
    const { id } = req.params; // groupId
    const { usuarioId } = req.body;

    const rel = await GroupModel.removeUserFromGroup({ usuarioId, grupoId: id });
    if (!rel) {
      return res.status(404).json({ error: 'Usuário não estava neste grupo' });
    }
    res.json({ message: 'Usuário removido do grupo' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup
};