// src/controllers/groupController.js
const GroupModel = require('../models/groupModel');

// GET /api/groups
async function listGroups(req, res, next) {
  try {
    const { nome } = req.query;
    const groups = await GroupModel.getAllGroups({ nome });
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
    const { nome, descricao, userId } = req.body; // userId do frontend

    if (!userId) {
      return res.status(401).json({ error: 'Autenticação necessária.' });
    }

    const group = await GroupModel.getGroupById(id);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }

    if (group.owner_id !== userId) {
      return res.status(403).json({ error: 'Ação não permitida. Você não é o criador deste grupo.' });
    }

    const updated = await GroupModel.updateGroup(id, { nome, descricao });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/groups/:id
async function deleteGroup(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body; // userId do frontend

    if (!userId) {
      return res.status(401).json({ error: 'Autenticação necessária.' });
    }

    const group = await GroupModel.getGroupById(id);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }

    if (group.owner_id !== userId) {
      return res.status(403).json({ error: 'Ação não permitida. Você não é o criador deste grupo.' });
    }

    const deleted = await GroupModel.deleteGroup(id);

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