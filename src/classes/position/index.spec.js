const assert = require('assert')
const describe = require('describe')
const it = require('it')
const Position = require('./index')

describe('Position Class', function () {
  describe('Check constructor', function () {
    it('Should retrun values that we passed them in construction', function () {
      const position = new Position(10, 40)
      assert.strictEqual(position.x, 10)
      assert.strictEqual(position.y, 40)
    })
  })
})
