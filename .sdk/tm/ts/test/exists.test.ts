
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WaifuimSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WaifuimSDK.test()
    equal(testsdk instanceof WaifuimSDK, true,
      'WaifuimSDK.test() must return a client synchronously')
  })

})
