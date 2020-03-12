const assert = require('assert')
const describe = require('describe')
const it = require('it')
const Line = require('./index')

describe('Line Class', function () {
  describe('Check constructor', function () {
    it('Should retrun values that we passed them in constructor', function () {
      const line = new Line(12, 65)
      assert.strictEqual(line.start, 12)
      assert.strictEqual(line.end, 65)
    })
  })
})
