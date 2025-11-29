// src/controllers/userController.js
const UserModel = require('../models/userModel');
const GroupModel = require('../models/groupModel');
const { hashPassword, comparePassword } = require('../utils/password');

// GET /api/users
async function listUsers(req, res, next) {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

// GET /api/users/:id
async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// POST /api/users
async function createUser(req, res, next) {
  try {
    const { username, email, senha } = req.body;

    if (!username || !email || !senha) {
      return res.status(400).json({ error: 'username, email e senha são obrigatórios' });
    }

    const existing = await UserModel.getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const senhaHash = await hashPassword(senha);
    const user = await UserModel.createUser({ username, email, senhaHash });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

// PUT /api/users/:id
async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const updated = await UserModel.updateUser(id, { username, email });
    if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await UserModel.deleteUser(id);
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    next(err);
  }
}

// POST /api/users/login
async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const user = await UserModel.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const senhaConfere = await comparePassword(senha, user.senha_hash);
    if (!senhaConfere) return res.status(401).json({ error: 'Credenciais inválidas' });

    const { id, username, created_at } = user;
    res.json({ id, username, email, created_at });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login
};