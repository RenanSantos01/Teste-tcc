const express = require("express");
const router = express.Router();

router.post("/validar", (req, res) => {
  const { hash } = req.body;

  // Apenas exemplo — banco vem depois
  if (hash === "123456") {
    return res.json({ valido: true, aluno: "Renan", curso: "Node + React" });
  }

  res.json({ valido: false });
});

module.exports = router;
