const assert = require('assert')
const describe = require('describe')
const it = require('it')
const Line = require('../classes/line/index')
const utils = require('./index')

describe('Utils', function () {
  describe('Check exists in path filter', function () {
    it('Should find it and return true', function () {
      const list = [
        new Line(10, 20),
        new Line(60, 100)
      ]
      const result = list.filter(utils.checkExistInPath(15))
      assert.strictEqual(1, result.length)
      assert.strictEqual(result[0].start, 10)
      assert.strictEqual(result[0].end, 20)
    })

    it('Should find no lines', function () {
      const list = [
        new Line(60, 100)
      ]
      const result = list.filter(utils.checkExistInPath(15))
      assert.strictEqual(0, result.length)
    })
  })

  describe('Check sort with start sort function', function () {
    it('Should sort it asc', function () {
      const list = [
        new Line(100, 120),
        new Line(60, 130),
        new Line(10, 150)
      ]
      const result = list.sort(utils.sortWithStart)
      assert.strictEqual(result[0].start, 10)
      assert.strictEqual(result[1].start, 60)
      assert.strictEqual(result[2].start, 100)
    })
  })

  describe('Check sort with end sort function', function () {
    it('Should sort it desc', function () {
      const list = [
        new Line(100, 120),
        new Line(60, 130),
        new Line(10, 150)
      ]
      const result = list.sort(utils.sortWithStart)
      assert.strictEqual(result[0].end, 150)
      assert.strictEqual(result[1].end, 130)
      assert.strictEqual(result[2].end, 120)
    })
  })

  describe('Check exists a bigger line filter', function () {
    it('Should find it', function () {
      const list = [
        new Line(10, 20),
        new Line(60, 100)
      ]
      const result = list.filter(utils.checkBiggerPathExists(12, 17))
      assert.strictEqual(1, result.length)
      assert.strictEqual(result[0].start, 10)
      assert.strictEqual(result[0].end, 20)
    })

    it('Should find no lines', function () {
      const list = [
        new Line(60, 100)
      ]
      const result = list.filter(utils.checkBiggerPathExists(12, 17))
      assert.strictEqual(0, result.length)
    })
  })
})
