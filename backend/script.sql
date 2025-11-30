DROP TABLE IF EXISTS usuarios_grupos;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS grupos;
DROP TABLE IF EXISTS usuarios;

-- =========================
-- Tabela de usuários
-- =========================
CREATE TABLE usuarios (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL UNIQUE,
    senha_hash  TEXT         NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- =========================
-- Tabela de grupos
-- =========================
CREATE TABLE grupos (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    descricao   TEXT,
    owner_id    INTEGER      REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- =========================
-- Tabela de posts
-- =========================
CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    texto       TEXT        NOT NULL,
    autor_id    INTEGER     NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    grupo_id    INTEGER     REFERENCES grupos(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- Tabela de associação usuário <-> grupo
-- =========================
CREATE TABLE usuarios_grupos (
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    grupo_id    INTEGER NOT NULL REFERENCES grupos(id)   ON DELETE CASCADE,
    joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (usuario_id, grupo_id)
);