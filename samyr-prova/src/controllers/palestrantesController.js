import { response } from "express";
import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const listarPalestrantes = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM palestrantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar palestrantes" });
      return;
    }
    const palestrantes = data;
    res.status(200).json(palestrantes);
  });
};

export const cadastrarPalestrantes = (req, res) => {
  const { nome, expertise } = req.body;

  if (!nome) {
    res.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!expertise) {
    res.status(400).json({ message: "A expertise é obrigatório" });
    return;
  }
    const id = uuidv4();
    const insertSQL = /*sql*/ ` INSERT INTO palestrantes (??,??,?? )
    VALUES
    (?,?,?)`;
    const insertData = [
      "id",
      "nome",
      "expertise",
      id,
      nome,
      expertise,
    ];

    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "erro ao Cadastrar palestrante" });
        return;
      }
      res.status(201).json({ message: "palestrante cadastrado com sucesso" });
    })
}