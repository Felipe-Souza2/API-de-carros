

const irishCounty = new Set([
  "C", "CE", "CN", "CW", "D", "DL", "G",
  "KE", "KK", "KY", "L", "LD", "LH", "LM", "LS",
  "MH", "MN", "MO", "OY", "RN", "SO", "T",
  "W", "WH", "WW", "WX"
])
const SIZE_PLATES = 3
const FIRST_SEMESTER = '1'
const SECOND_SEMESTER = '2'
const MAX_LENGTH = 5

export function isMileageInvalid(mileage) {
  if (mileage < 0 || !Number.isInteger(mileage) ) return true
  return false
}

export function isDistanceInvalid(distance) {
  if (distance <= 0 || !Number.isInteger(distance)) return true
  return false
}

export function isOnInvalid(isOn) {
  if (typeof isOn !== "boolean") return true
  return false
}
 export function isRegistrationNumberInvalid(registrationNumber) {
  if (typeof registrationNumber !== "string"|| registrationNumber === '') return true
  const parts = registrationNumber.split('-')
  const digits = '0123456789'
  if (parts.length !== SIZE_PLATES) return true
  if (parts.includes('')) return true
  if (parts[0].length !== SIZE_PLATES) return true
  if (parts[0][2] !== FIRST_SEMESTER && parts[0][2] !== SECOND_SEMESTER) return true
  if (!digits.includes(parts[0][0] ) || !digits.includes(parts[0][1])) return true
  if (!irishCounty.has(parts[1])) return true
  for (const character of parts[2]) {
  if (!digits.includes(character)) return true
  }
  if (parts[2].length > MAX_LENGTH) return true
  return false
}



