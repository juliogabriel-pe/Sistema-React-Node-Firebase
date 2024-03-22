const express = require("express");
const cors = require("cors");
const User = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rota para obter todos os usuários
app.get("/", async (req, res) => {
  try {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Rota para obter um usuário por ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await User.doc(id).get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = { id: snapshot.id, ...snapshot.data() };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// Rota para criar um novo usuário
app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await User.add(data);
    res.json({ msg: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// Rota para atualizar um usuário existente
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.doc(id).delete();
    const data = req.body;
    await User.add(data);
    res.json({ msg: "Usuário atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// Rota para deletar um usuário
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.doc(id).delete();
    res.json({ msg: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor em execução na porta http://localhost:${port}/`);
});
