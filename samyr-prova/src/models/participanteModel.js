import conn from "../config/conn.js";

const tableParticipante =  `
    CREATE TABLE IF NOT EXISTS participantes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tableParticipante, (err) => {
  if (err) {
    console.error("Error ao criar a tabela participantes: " + err.stack);
    return;
  }
  console.log("Tabela [participantes] criada com sucesso");
});
