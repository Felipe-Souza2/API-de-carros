let database = []

async function saveCar() {
  await wait()
  const car = { carId: 'V123', brand: 'BMW', model: 'X1', registrationNumber: '211-C-99999', mileage: 100, isOn: false }
  database.push(car)
}

async function listCars() {
  await wait()
  return database
}

async function showCar(carId) {
  await wait()
  const car = database.find((data) => data.carId === carId)
  return car
}

async function updateCar(carId, car) {
  await wait()
  const index = database.findIndex((data) => data.carId === carId)
  if (index >= 0) {
    database[index] = car
  }
}

async function deleteCar(carId) {
  await wait()
  carDatabase = database.filter((data) => data.carId !== carId)
}

/* export async function wait(duration: Number = 0) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}*/