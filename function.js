import { isMileageInvalid, isOnInvalid, isRegistrationNumberInvalid} from "./validation.js";

export async function createCar(brand, model, registrationNumber, mileage, isOn) {
  if (isMileageInvalid(mileage)) {
    new Error(('mileage Inválida'))
  }
  if (isOnInvalid(isOn)) {
    new Error('isOn deve se true/false')
  }
  if (isRegistrationNumberInvalid(registrationNumber)){
    new Error('registration number ja existe ou é invalido')
  }

}