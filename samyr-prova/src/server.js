import "dotenv/config";
import express from "express";
import mysql from "mysql2";


import participantesRoutes from "./routes/participantesRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js"; 


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conn.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL');
});


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/participantes", participantesRoutes);
app.use("/eventos", eventosRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
