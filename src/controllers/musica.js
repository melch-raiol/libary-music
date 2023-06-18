const knex = require("../connection");

const listarMusica = async (req, res) => {
  try {
    const rows = await knex("musica").select("*").returning("*");

    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const adicionarMusica = async (req, res) => {
  const { nome, tempo, midia_id } = req.body;

  try {
    if (!nome) return res.status(400).json(`O nome é obrigatório`);
    if (!tempo) return res.status(400).json(`O tempo é obrigatório`);
    if (!midia_id) return res.status(400).json(`O ID da mídia é obrigatório`);

    const novaMusica = await knex("musica").insert({
      nome,
      tempo,
      midia_id,
    });

    if (!novaMusica) {
      return res.status(400).json("A musica não foi cadastrado.");
    }

    return res.status(200).json({ mensagem: "Música cadastrada com sucesso." });
  } catch (error) {
    console.log(error);
  }
};

const atualizarMusica = async (req, res) => {
  const { id } = req.params;
  const { nome, tempo, midia_id } = req.body;

  try {
    if (!nome) return res.status(400).json(`O nome é obrigatório`);
    if (!tempo) return res.status(400).json(`O tempo é obrigatório`);
    if (!midia_id) return res.status(400).json(`O ID da mídia é obrigatório`);

    const musica = await knex("musica")
      .update({ nome, tempo, midia_id })
      .where("id", id)
      .returning("*");

    return res
      .status(204)
      .json({ mensagem: `Música ${musica} atualizado com sucesso` });
  } catch (error) {
    console.log(error);
  }
};

const deleteMusica = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await knex("musica")
      .delete()
      .where("id", id)
      .returning("id");

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Musica não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  adicionarMusica,
  atualizarMusica,
  listarMusica,
  deleteMusica,
};
