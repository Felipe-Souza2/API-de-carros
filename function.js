
import { isMileageInvalid, isOnInvalid, isRegistrationNumberInvalid, isDistanceInvalid} from "./validation.js";

export function createCar(brand, model, registrationNumber, mileage, isOn) {
  if (isMileageInvalid(mileage)) {
    throw new Error(('mileage Inválida'))
  }
  if (isOnInvalid(isOn)) {
    throw new Error('isOn deve se true/false')
  }
  if (isRegistrationNumberInvalid(registrationNumber)){
    throw new Error('registrationNumber é invalido')
  }
}

export function driveCar(distance) {
  
  if (isDistanceInvalid(distance)) {
     throw new Error('distancia Invalida')
   }
}