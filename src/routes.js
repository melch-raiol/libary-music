const express = require("express");
const routes = express();

const {
  adicionarCantor,
  atualizarCantor,
  listarCantor,
  deleteCantor,
} = require("./controllers/cantor");

const {
  adicionarMidia,
  atualizarMidia,
  listarMidia,
  deleteMidia,
} = require("./controllers/midia");

const {
  adicionarMusica,
  atualizarMusica,
  listarMusica,
  deleteMusica,
} = require("./controllers/musica");

routes.post("/cantor", adicionarCantor);
routes.put("/cantor/:id", atualizarCantor);
routes.get("/cantor", listarCantor);
routes.delete("/cantor/:id", deleteCantor);

routes.post("/midia", adicionarMidia);
routes.put("/midia/:id", atualizarMidia);
routes.get("/midia", listarMidia);
routes.delete("/midia/:id", deleteMidia);

routes.post("/musica", adicionarMusica);
routes.put("/musica/:id", atualizarMusica);
routes.get("/musica", listarMusica);
routes.delete("/musica/:id", deleteMusica);

module.exports = routes;
