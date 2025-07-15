const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Define o caminho da rota '/' GET e define os parametros request e response
//Para lidar com a requisição do cliente e enviar uma resposta do servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query

    if (!nome || !ingredientes)
        return res.status(400).send('Parâmetros ausentes')

    res.send(`<script>alert("Obrigado pela sua sugestão ${nome}! Você sugeriu ${ingredientes}"); window.location.href = "/page_location"; </script>`)
})

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'))
})

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body

    if (!nome || !email || !assunto || !mensagem)
        return res.status(400).send('Todos os campos são obrigatórios!')

    res.send(`
        <h1>Contato Recebido, obrigado ${nome}!</h1>
        <p>Email: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Voltar</a>
        `)

})

app.get('/api/lanches', (req, res) => {
    let lanches = [
        {
            "id": 1,
            "nome": "DevBurger Clássico",
            "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
        },
        {
            "id": 2,
            "nome": "Burger de Bacon",
            "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
        },
        {
            "id": 3,
            "nome": "Commit Veggie",
            "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
        }
    ]

    return res.json(lanches)
}) 