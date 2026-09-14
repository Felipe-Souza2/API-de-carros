import assert from "node:assert"
import test from "node:test"

import {isMileageInvalid, isOnInvalid, isRegistrationNumberInvalid} from "./validation.js";

test(" deve verificar se a mileagem é invalida", () => {
  assert.equal(isMileageInvalid(-12),true)
  assert.equal(isMileageInvalid(12.7),true)
  assert.equal(isMileageInvalid('doze'),true)
  assert.equal(isMileageInvalid(''),true)
})

test(" deve verificar se a mileagem é valida", () => {
  assert.equal(isMileageInvalid(12),false)
  assert.equal(isMileageInvalid(120),false)
  assert.equal(isMileageInvalid(0),false)
  assert.equal(isMileageInvalid(10000),false)
 
})
test (" deve verificar se não recebe boolean", () => {
  assert.equal(isOnInvalid('dois'),true)
  assert.equal(isOnInvalid('ligado'),true)
  assert.equal(isOnInvalid(100),true)
})

test (" deve verificar se recebe boolean", () => {
  assert.deepEqual(isOnInvalid(false),false)
  assert.deepEqual(isOnInvalid(true),false)
})

test (" deve verificar se recebe um registration Number Invalido", () => {
  assert.equal(isRegistrationNumberInvalid(''),true)
  assert.equal(isRegistrationNumberInvalid(12345),true)
  assert.equal(isRegistrationNumberInvalid('261--12345'),true)
  assert.equal(isRegistrationNumberInvalid('26-W-12345'),true)
  assert.equal(isRegistrationNumberInvalid('A61-W-12345'),true)
  assert.equal(isRegistrationNumberInvalid('2A2-W-12345'),true)
  assert.equal(isRegistrationNumberInvalid('B23-W-12345'),true)
  assert.equal(isRegistrationNumberInvalid('223-A-12345'),true)
  assert.equal(isRegistrationNumberInvalid('222-XX-12345'),true)
  assert.equal(isRegistrationNumberInvalid('222-WH-1A345'),true)
  assert.equal(isRegistrationNumberInvalid('222-WH-1A34W'),true)
  assert.equal(isRegistrationNumberInvalid('222-WH-123456'),true)
})

test (" deve verificar se recebe um registration Number valido", () => {
  assert.equal(isRegistrationNumberInvalid('261-W-12345'),false)
  assert.equal(isRegistrationNumberInvalid('262-RN-12345'),false)
  assert.equal(isRegistrationNumberInvalid('122-C-12345'),false)
  assert.equal(isRegistrationNumberInvalid('111-W-12345'),false)
  assert.equal(isRegistrationNumberInvalid('111-LH-12345'),false)
  assert.equal(isRegistrationNumberInvalid('111-T-1'),false)
  assert.equal(isRegistrationNumberInvalid('111-MO-12'),false)
  assert.equal(isRegistrationNumberInvalid('111-LH-123'),false)
  assert.equal(isRegistrationNumberInvalid('111-KE-1234'),false)
})

