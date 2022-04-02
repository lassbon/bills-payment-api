const { add, subtract } = require('../controllers/hikmah.controllers')

describe("Hikmah class test", () => {
    test('the test should return addiion of 3 number', () => {
        const resp = add(3, 5, 2)
        const resp2 = add(3, 5, 1)
        // expect(add(3, 5)).toBeGreaterThanOrEqual({status:false, data:7})
        // expect(resp.data).toBeGreaterThanOrEqual(7)
        expect(resp.data).toBe(10)
        expect(resp2.data).toEqual(9)
       // expect(resp2.data).toBeLessThanOrEqual(8)


    })
})

