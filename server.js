import express from 'express'
// import {PrismaClient} from '@prisma/client';
import {createCar, listCars, driveCar,update,remove} from "./controller.js";

// const prisma = new PrismaClient()
const app = express();
app.use(express.json()) // para que o arquivo entenda que esta recebendo arquivos em JSON

app.post('/new_vehicles/', async (req, res) => {
  const output = await createCar(
    req.body.brand,
    req.body.model,
    req.body.registrationNumber,
    req.body.mileage,
    req.body.isOn
  ) //aqui impota a funcao do arqivo function que utiliza as validacoes
  res.status(201).json(output)    //status 201 td ok e foi criada sua  requisicao
})

app.get('/new_vehicles/', async (req, res) => {  //rota de recebimento de dados/listagem 
  const cars = await listCars()
  res.status(200).json(cars)  //status (200) 'td ok'      
});

app.put('/new_vehicles/:id', async (req, res) => { // para por variaveis dentro da rota nomeia e antes do nome poem :
  const output = await update(req.params.id, req.body.brand, req.body.model, req.body.registrationNumber, req.body.mileage, req.body.isOn)  //vai atualizar
   res.status(200).json(output)    //status 201 td ok e foi criada sua  requisicao
})

app.patch('/new_vehicles/:id', async (req, res) =>{  
const output = await driveCar(req.params.id, req.body.distance)
  res.status(200).json(output)
})

app.patch('/new_vehicles/:id/turn_on', async (req, res) => {
  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id
    }
  })
  if (car === null) return res.status(404).json({message: "Carro não encontrado"})
    const updatedCar = await prisma.car.update({    //aqui onde vai ligar o carro nessa url //new_vehicles/o id do carro/turn_on
      where: {
        id: req.params.id
      },
        data: {
          isOn: true
        }
    })
    res.status(200).json(updatedCar)
})

app.patch('/new_vehicles/:id/turn_off', async (req, res) => {
  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id
    }
  })
  if (car === null) return res.status(404).json({message: "Carro não encontrado"})
    const updatedCar = await prisma.car.update({          //aqui onde vai desligar o carro nessa url //new_vehicles/o id do carro/turn_off
      where: {
        id: req.params.id
      },
        data: {
          isOn: false
        }
    })
    res.status(200).json(updatedCar)
})

app.delete('/new_vehicles/:id', async (req,res) => {
  const output = await remove(req.params.id) 
  
  res.status(200).json(output,{message: "Carro Deletado"})
})

app.listen(51620)


