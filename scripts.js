document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    fetch('/api/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    }).then(response => response.json())
      .then(data => {
          alert('Cadastro realizado com sucesso!');
      }).catch(error => {
          alert('Ocorreu um erro ao realizar o cadastro.');
          console.error('Error:', error);
      });
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/fidelidade', { useNewUrlParser: true, useUnifiedTopology: true });

const agenciaSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String
});

const Agencia = mongoose.model('Agencia', agenciaSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/cadastro', (req, res) => {
    const { nome, email, telefone } = req.body;
    const novaAgencia = new Agencia({ nome, email, telefone });

    novaAgencia.save((err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao cadastrar agência' });
        } else {
            res.status(200).send({ message: 'Cadastro realizado com sucesso!' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
