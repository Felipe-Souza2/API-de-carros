
import { isMileageInvalid, isOnInvalid, isRegistrationNumberInvalid, isDistanceInvalid} from "./validation.js";
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient()

export async function createCar(brand, model, registrationNumber, mileage, isOn) {
  if (isMileageInvalid(mileage)) {
    throw new Error(('mileage Inválida'))
  }
  if (isOnInvalid(isOn)) {
    throw new Error('isOn deve se true/false')
  }
  if (isRegistrationNumberInvalid(registrationNumber)){
    throw new Error('registrationNumber é invalido')
  }

  const newCar = await prisma.car.create({
    data: {
      brand,
      model,
      registrationNumber,
      mileage,
      isOn
    }

  })
  return newCar
}

export async function listCars() {
  const cars = await prisma.car.findMany()
  return cars
}

export async function update(id, brand, model, registrationNumber, mileage, isOn) {
  const settings = await prisma.car.update({
    where: {      // onde e quem vai chamar no caso aqui o id
      id
    }, //nao usuar a palavra não faco ideia
    data: {
      brand,
      model,
      registrationNumber,
      mileage,
      isOn
    }
  })
  return settings
}

export async function remove(id) {
  const deletedCar = await prisma.car.delete({
    where: {
      id           //aqui vai deletar
    },
  })
  return deletedCar
}

export async function driveCar(id, distance) {
  if (isDistanceInvalid(distance)) {
     throw new Error('distancia Invalida')
   }
   const car = await prisma.car.findUnique({
    where: {
      id
    }
  })
  if (car === null) throw new Error('Carro não Encontrado')
  if (car.isOn === false) throw new Error('carro precisa estar ligado')
  const updatedCar = await prisma.car.update({      //aqui vai procurar o carro ver se existe e se esta ligado,se existir e estiver ligado vai "andar" adicionando km na mileagem total
     where: {
      id
    },
      data: {
        mileage: {increment:distance}
    }
  })
  return updatedCar
}