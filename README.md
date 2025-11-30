# Ágora – Projeto Web II

Ágora é uma aplicação web de rede social inspirada na edificação grega de mesmo nome, onde as pessoas se reuniam em assembleia.  
Os usuários podem se cadastrar, entrar em grupos e publicar mensagens (postagens) que podem estar associadas à timeline geral ou a um grupo específico.

---

## ⚙️ Tecnologias utilizadas

- **Backend:** Node.js, Express
- **Frontend:** React, Material UI
- **Banco de dados:** PostgreSQL (NeonDB)
- **Autenticação:** senhas com hash (bcrypt) e sessão via localStorage

---

## 💻 Pré-requisitos

- Node.js instalado
- Conta e banco configurados no **NeonDB**

---

## 🌐 Configuração do banco (NeonDB)
- Na pasta backend, dentro do arquivo script.sql, copie o script de criação das tabelas
- No painel 'SQL Editor' do NeonDB, cole o script e aperte o botão 'Run'
- No painel 'Dashboard' do NeonDB, aperte o botão 'Connect' e copie a connection string
- Na pasta backend, dentro do arquivo .env, cole a connection string no valor da variável DATABASE_URL

## 🧩 Configuração do back-end
- Abra um terminal (**cmd** ou PowerShell)
- Acesse a pasta do back-end: cd backend
- Instale as dependências: npm install
- Inicie o servidor back-end: npm run dev
- Back-end disponível em: http://localhost:4000

## 🎨 Configuração do front-end
- Abra outro terminal: (**cmd** ou PowerShell)
- Acesse a pasta front-end: cd frontend
- Instale as dependências: npm install
- Inicie o servidor front-end: npm start
- Acesse a aplicação em: http://localhost:3000

---

## 👥 Autores
- Fabio Vivarelli
- Joao Vitor Gimenes dos Santos
- Nathan Henrique Guimaraes de Oliveira

🔗 link documento:
https://docs.google.com/document/d/1SOUAvqXuJuBH7sNVBrbwBqMVkbef1UjvDXRB41Bwx5k/edit?pli=1&tab=t.0
