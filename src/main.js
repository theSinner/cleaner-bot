
const Map = require('./classes/map/index')

const map = new Map('input.txt')
map.start()
console.log('=> Cleaned:', map.counter)
