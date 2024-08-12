import conn from "../config/conn.js";

const tablePalestrante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        id  varchar(60) primary key ,
        nome varchar(255) not null,
        expertise varchar(255) not null,
        created_at timestamp default CURRENT_TIMESTAMP,
        updated_at timestamp default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
        )
`;

conn.query(tablePalestrante, (err) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [palestrantes] criada com sucesso");
});
