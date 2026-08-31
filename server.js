import express from 'express'

const app = express();
app.use(express.json()) // para que o arquivo entenda que esta recebendo arquivos em JSON

const database = [] //'banco de dados'

app.post('/', (req, res) => {
 
  database.push (req.body)  //rota de envio de dados
  res.status(201)     //status 201 td ok e foi criada sua  requisicao
})

app.get('/', (req, res) => {  //rota de recebimento de dados 
  res.status(200).json(database)  //status (200) 'td ok'      
});

app.listen(5500);