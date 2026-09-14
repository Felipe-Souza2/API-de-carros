import express from 'express'
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()
const app = express();
app.use(express.json()) // para que o arquivo entenda que esta recebendo arquivos em JSON

app.post('/new_vehicles/', async (req, res) => {
  await prisma.car.create({
     data: {
      brand: req.body.brand,
      model: req.body.model,
      registrationNumber: req.body.registrationNumber,
      mileage: req.body.mileage
     }
  })
   res.status(201).json(req.body)    //status 201 td ok e foi criada sua  requisicao
})

app.get('/new_vehicles/', async (req, res) => {  //rota de recebimento de dados 
  const cars = await prisma.car.findMany()
   res.status(200).json(cars)  //status (200) 'td ok'      
});

app.put('/new_vehicles/:id', async (req, res) => { // para por variaveis dentro da rota nomeia e antes do nome poem :
  await prisma.car.update({   //vai atualizar
    where: {      // onde e quem vai chamar no caso aqui o id
      id: req.params.id
    },
     data: {
      brand: req.body.brand,
      model: req.body.model,
      registrationNumber: req.body.registrationNumber,
      mileage: req.body.mileage
     }
  })
   res.status(201).json(req.body)    //status 201 td ok e foi criada sua  requisicao
})

app.delete('/new_vehicles/:id', async (req,res) => {
  await prisma.car.delete ({
    where: {
      id: req.params.id
    },
  })
  res.status(200).json({message: "Usuário Deletado"})
})

app.listen(51620)


