const express = require('express');
const app = express();
app.use(express.json());

let eventos = [];  


app.post('/eventos', (req, res) => {
    const { titulo, data, descricao, local, palestrantesId } = req.body;
    const novoEvento = { id: eventos.length + 1, titulo, data, descricao, local, palestrantesId };
    eventos.push(novoEvento);
    res.status(201).json(novoEvento);
});


app.get('/eventos', (req, res) => {
    res.json(eventos);
});


app.get('/eventos/:eventoId', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.eventoId));
    if (!evento) return res.status(404).send('Evento não encontrado.');
    res.json(evento);
});


app.put('/eventos/:eventoId', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.eventoId));
    if (!evento) return res.status(404).send('Evento não encontrado.');
    const { titulo, data, descricao, local, palestrantesId } = req.body;
    evento.titulo = titulo || evento.titulo;
    evento.data = data || evento.data;
    evento.descricao = descricao || evento.descricao;
    evento.local = local || evento.local;
    evento.palestrantesId = palestrantesId || evento.palestrantesId;
    res.json(evento);
});


app.delete('/eventos/:eventoId', (req, res) => {
    const index = eventos.findIndex(e => e.id === parseInt(req.params.eventoId));
    if (index === -1) return res.status(404).send('Evento não encontrado.');
    eventos.splice(index, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
