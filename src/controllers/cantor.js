const knex = require("../connection");

const listarCantor = async (req, res) => {
  try {
    const rows = await knex("cantor").select("*").returning("*");

    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const adicionarCantor = async (req, res) => {
  const { nome } = req.body;
  console.log(nome);
  try {
    const buscarCantor = await knex("cantor").where({ nome }).first();

    if (buscarCantor) {
      return res.status(400).json(`O cantor "${nome}" já foi registrado`);
    }

    const novoCantor = await knex("cantor").insert({ nome });

    if (!novoCantor) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json({ mensagem: "Cantor cadastrado com sucesso." });
  } catch (error) {
    console.log(error);
  }
};

const atualizarCantor = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    if (!id) {
      return res.status(400).json("O ID do cantor é necessário");
    }

    if (!nome) {
      return res.status(400).json("O nome do cantor é necessário");
    }

    const cantor = await knex("cantor")
      .update({ nome })
      .where("id", id)
      .returning("*");

    return res
      .status(204)
      .json({ mensagem: `Contor ${cantor} atualizado com sucesso` });
  } catch (error) {
    console.log(error);
  }
};

const deleteCantor = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await knex("cantor")
      .delete()
      .where("id", id)
      .returning("id");

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Cantor não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  adicionarCantor,
  atualizarCantor,
  listarCantor,
  deleteCantor,
};
