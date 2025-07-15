const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true})) //Para tratar dados que vem do form

let ultimoContato = null

app.get('/not-found', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.post('/contato', (req, res) => {
    ultimoContato = req.body

    res.redirect('/contato-recebido')
})

app.get('/contato-recebido', (req, res) => {
    if (!ultimoContato){
        return res.redirect('/not-found')
    }

    const { name, email} = ultimoContato
    res.send(``)
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`)
})