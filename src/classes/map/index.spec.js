const assert = require('assert')
const describe = require('describe')
const it = require('it')
const Map = require('./index')

describe('Map', function () {
  describe('Check the initialization', function () {
    it('Should return true values from input file', function () {
      const map = new Map('test-input/input1.txt')
      assert.strictEqual(6, map.commandsLength)
      assert.strictEqual(10, map.currentPosition.x)
      assert.strictEqual(20, map.currentPosition.y)
    })

    it('Should calculate the end position', function () {
      const map = new Map('test-input/input1.txt')
      map.start()
      assert.strictEqual(0, map.currentPosition.x)
      assert.strictEqual(20, map.currentPosition.y)
    })

    it('Should not add new line if there is bigger path', function () {
      let map = new Map('test-input/input2.txt')
      map.start()
      assert.strictEqual(1, map.rows['50'].length)

      map = new Map('test-input/input3.txt')
      map.start()
      assert.strictEqual(1, map.rows['50'].length)

      map = new Map('test-input/input4.txt')
      map.start()
      assert.strictEqual(1, map.columns['10'].length)

      map = new Map('test-input/input5.txt')
      map.start()
      assert.strictEqual(1, map.columns['10'].length)
    })

    it('Should not let to go over the bound', function () {
      const map = new Map('test-input/input6.txt')
      map.start()
      assert.strictEqual(100000, map.currentPosition.x)
      assert.strictEqual(100000, map.currentPosition.y)
    })

    it('Should calculate the cleaned area right', function () {
      const map = new Map('test-input/input1.txt')
      map.start()
      assert.strictEqual(45, map.counter)
    })

    it('Should check is crossed path history', function () {
      const map = new Map('test-input/input7.txt')
      map.start()
      assert.strictEqual(50, map.counter)
    })
  })
})
