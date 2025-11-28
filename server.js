const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 chave secreta do JWT
const SECRET = "minha_chave_super_secreta";

// 📌 Conexão MySQL
const db = mysql.createConnection({
  host: "localhost", // depois trocamos para nuvem
  user: "root",
  password: "1234",
  database: "certificados",
});

// Testar conexão
db.connect(err => {
  if (err) throw err;
  console.log("MySQL conectado!");
});

/* -----------------------------------------------
   ROTAS DE AUTENTICAÇÃO
------------------------------------------------*/

// 🔹 Cadastro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao cadastrar" });
        res.json({ message: "Usuário criado com sucesso!" });
      }
    );
  });
});

// 🔹 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  });
});

/* -----------------------------------------------
   MIDDLEWARE PARA PROTEGER ROTAS
------------------------------------------------*/
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Token ausente" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });

    req.user = decoded;
    next();
  });
}

/* -----------------------------------------------
   ROTA PROTEGIDA (exemplo)
------------------------------------------------*/
app.get("/user-info", verifyToken, (req, res) => {
  res.json({ message: "Acesso autorizado!", user: req.user });
});

/* -----------------------------------------------
   INICIAR SERVIDOR
------------------------------------------------*/
app.listen(3000, () => {
  console.log("API rodando na porta 3000!");
});
