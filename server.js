import express from 'express'

const app = express();
app.use(express.json()) // para que o arquivo entenda que esta recebendo arquivos em JSON

const database = [] //'banco de dados'

app.post('/', (req, res) => {
   database.push (req.body)  //rota de envio de dados
   res.status(201).json(req.body)    //status 201 td ok e foi criada sua  requisicao
})

app.get('/', (req, res) => {  //rota de recebimento de dados 
   res.json(database)
   res.status(200).json(database)  //status (200) 'td ok'      
});
app.delete('/' , (req,res) => {
  res.json(database)
})

app.listen(51620)
