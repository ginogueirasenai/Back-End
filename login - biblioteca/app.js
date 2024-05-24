const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'giovanna',
    password: 'SENAI123',
    database: 'biblioteca'
});

db.connect((error) => {
    if (error) {
        console.log("Erro ao conectar com o banco de dados");
    } else {
        console.log("Conectado ao MySQL");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.post("/login", (req, res) => {
    const email = req.body.usuario;
    const password = req.body.senha;

    db.query('SELECT password FROM usuario WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("Erro na consulta ao banco de dados:", error);
            res.status(500).send("Erro interno do servidor");
        } else if (results.length > 0) {
            const passwordBD = results[0].password;
            if (password === passwordBD) {
                console.log("Login bem-sucedido!");
                res.send("Login bem-sucedido!");
            } else {
                console.log("Senha incorreta!");
                res.redirect('/?error=Senha+incorreta!');
            }
        } else {
            console.log("Usuário não cadastrado!");
            res.redirect('/cadastro?error=Usuário+não+cadastrado');
        }
    });
});

app.post("/cadastro", (req, res) => {
    const nome = req.body.name;
    const email = req.body.email;
    const password = req.body.senha;

    db.query('SELECT email FROM usuario WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("Erro na consulta ao banco de dados:", error);
            res.status(500).send("Erro interno do servidor");
        } else if (results.length > 0) {
            console.log("Usuário já existe!");
            res.redirect('/?error=Usuário+já+existe');
        } else {
            db.query('INSERT INTO usuario (nome, email, password) VALUES (?, ?, ?)', [nome, email, password], (error, results) => {
                if (error) {
                    console.log("Erro ao inserir usuário no banco de dados:", error);
                    res.status(500).send("Erro interno do servidor");
                } else {
                    console.log("Usuário cadastrado com sucesso!");
                    res.redirect('/?email=' + encodeURIComponent(email));
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando no endereço https://localhost:${port}`);
});