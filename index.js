const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snapshot = await User.doc(id).get();

  if (!snapshot.exists) {
    return res.send("Usuário não encontrado.");
  }

  const user = { id: snapshot.id, ...snapshot.data() };
  res.send(user);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "User Created" });
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "User Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "User Deleted" });
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor em execução na porta http://localhost:${port}/`);
});