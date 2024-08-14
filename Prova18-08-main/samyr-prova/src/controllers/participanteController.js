const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'gerenciamento_eventos'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});


const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  jwt.verify(token, 'secreta', (err, user) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });
    req.user = user;
    next();
  });
};


app.post('/eventos/criar', authenticate, (req, res) => {
  const { titulo, data, palestrantesId } = req.body;
  const sql = 'INSERT INTO eventos (titulo, data) VALUES (?, ?)';
  
  db.query(sql, [titulo, data], (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao criar evento' });

    const eventoId = result.insertId;

    
    if (palestrantesId && palestrantesId.length) {
      const values = palestrantesId.map(palestranteId => [eventoId, palestranteId]);
      db.query('INSERT INTO eventos_palestrantes (evento_id, palestrante_id) VALUES ?', [values], err => {
        if (err) return res.status(500).json({ mensagem: 'Erro ao associar palestrantes' });
        res.status(201).json({ mensagem: 'Evento criado com sucesso', eventoId });
      });
    } else {
      res.status(201).json({ mensagem: 'Evento criado com sucesso', eventoId });
    }
  });
});



app.get('/eventos/agenda', (req, res) => {
  const sql = `
    SELECT e.id, e.titulo, e.data, GROUP_CONCAT(p.nome) AS palestrantes
    FROM eventos e
    LEFT JOIN eventos_palestrantes ep ON e.id = ep.evento_id
    LEFT JOIN palestrantes p ON ep.palestrante_id = p.id
    GROUP BY e.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar eventos' });
    res.json(results);
  });
});


app.post('/eventos/participantes/registrar', (req, res) => {
  const { nome, email } = req.body;
  const sql = 'INSERT INTO participantes (nome, email) VALUES (?, ?)';

  db.query(sql, [nome, email], (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao registrar participante' });
    res.status(201).json({ mensagem: 'Participante registrado com sucesso', participanteId: result.insertId });
  });
});


app.post('/eventos/inscrever', (req, res) => {
  const { participanteId, eventoId } = req.body;
  const sql = 'INSERT INTO eventos_participantes (evento_id, participante_id) VALUES (?, ?)';

  db.query(sql, [eventoId, participanteId], err => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao inscrever participante' });
    res.status(201).json({ mensagem: 'Participante inscrito no evento com sucesso' });
  });
});


app.post('/auth/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === 'senha') {
    const token = jwt.sign({ usuario }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
