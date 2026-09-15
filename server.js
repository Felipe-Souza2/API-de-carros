import express from 'express'
import {PrismaClient} from '@prisma/client';
import {createCar, driveCar} from "./function.js";

const prisma = new PrismaClient()
const app = express();
app.use(express.json()) // para que o arquivo entenda que esta recebendo arquivos em JSON

app.post('/new_vehicles/', async (req, res) => {
  createCar(req.body.brand, req.body.model, req.body.registrationNumber, req.body.mileage, req.body.isOn)
  await prisma.car.create({
     data: {
      brand: req.body.brand,
      model: req.body.model,
      registrationNumber: req.body.registrationNumber,
      mileage: req.body.mileage,
      isOn: req.body.isOn
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
        mileage: req.body.mileage,
        isOn: req.body.isOn
     }
  })
   res.status(200).json(req.body)    //status 201 td ok e foi criada sua  requisicao
})

app.patch('/new_vehicles/:id', async (req, res) =>{
  driveCar(req.body.distance)
  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id
    }
  })
  if (car === null) return res.status(404).json({message: "Carro não encontrado"})
  if (car.isOn === false) return res.status(409).json({message: "Carro precisa estar ligado"})
  const updatedCar = await prisma.car.update({
     where: {
      id: req.params.id
    },
      data: {
        mileage: {increment:req.body.distance}
    }
  })
  res.status(200).json(updatedCar)
})

app.patch('/new_vehicles/:id/turn_on', async (req, res) => {
  const car = await prisma.car.findUnique({
    where: {
      id: req.params.id
    }
  })
  if (car === null) return res.status(404).json({message: "Carro não encontrado"})
    const updatedCar = await prisma.car.update({
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
    const updatedCar = await prisma.car.update({
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
  await prisma.car.delete ({
    where: {
      id: req.params.id
    },
  })
  res.status(200).json({message: "Carro Deletado"})
})

app.listen(51620)


