const knex = require("../connection");

const listarMidia = async (req, res) => {
  try {
    const rows = await knex("midia").select("*").returning("*");

    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const adicionarMidia = async (req, res) => {
  const { nome, tipo, preco, cantor_id } = req.body;

  try {
    if (!nome) return res.status(400).json(`O nome é obrigatório`);
    if (!tipo) return res.status(400).json(`O tipo da mídia é obrigatório`);
    if (!preco) return res.status(400).json(`O preço da mídia é obrigatório`);
    if (!cantor_id) return res.status(400).json(`O ID do cantor é obrigatório`);

    const novaMidia = await knex("midia").insert({
      nome,
      tipo,
      preco,
      cantor_id,
    });

    if (!novaMidia) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json({ mensagem: "Midia cadastrada com sucesso." });
  } catch (error) {
    console.log(error);
  }
};

const atualizarMidia = async (req, res) => {
  const { id } = req.params;
  const { nome, tipo, preco, cantor_id } = req.body;
  console.log(nome);
  try {
    if (!nome) return res.status(400).json(`O nome é obrigatório`);
    if (!tipo) return res.status(400).json(`O tipo da mídia é obrigatório`);
    if (!preco) return res.status(400).json(`O preço da mídia é obrigatório`);
    if (!cantor_id) return res.status(400).json(`O ID do cantor é obrigatório`);

    const cantor = await knex("midia")
      .update({ nome, tipo, preco, cantor_id })
      .where("id", id)
      .returning("*");

    return res
      .status(204)
      .json({ mensagem: `Contor ${cantor} atualizado com sucesso` });
  } catch (error) {
    console.log(error);
  }
};

const deleteMidia = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await knex("midia")
      .delete()
      .where("id", id)
      .returning("id");

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Midia não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = { adicionarMidia, atualizarMidia, listarMidia, deleteMidia };
