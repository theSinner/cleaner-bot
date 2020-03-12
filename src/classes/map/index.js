const Position = require('../position/index')
const Line = require('../line/index')
const LineByLine = require('n-readlines')
const utils = require('../../utils/index')

class Map {
  constructor (inputFilePath) {
    this.liner = new LineByLine(inputFilePath)
    this.rows = {}
    this.columns = {}
    this.counter = 0
    this.commandsLength = parseInt(this.liner.next().toString())

    const currentPositionStr = this.liner.next().toString()
    let [x, y] = currentPositionStr.split(' ')
    x = parseInt(x)
    y = parseInt(y)
    this.currentPosition = new Position(x, y)
  }

  start () {
    for (let i = 0; i < this.commandsLength; i++) {
      this.move(this.liner.next().toString(), this.currentPosition)
    }
  }

  move (command, position) {
    let [direction, length] = command.split(' ')
    length = parseInt(length)
    let newVisited, newCoordinate
    switch (direction) {
      case 'N':
        newCoordinate = Math.min(position.y + length, 100000)
        newVisited = this.updateMainAxis(this.columns, position.x, position.y, newCoordinate)
        if (newVisited != null) {
          this.counter += this.updateCrossAxis(this.rows, position.x, newVisited.start, newVisited.end)
        }
        position.y = newCoordinate
        break
      case 'S':
        newCoordinate = Math.max(position.y - length, -100000)
        newVisited = this.updateMainAxis(this.columns, position.x, newCoordinate, position.y)
        if (newVisited != null) {
          this.counter += this.updateCrossAxis(this.rows, position.x, newVisited.start, newVisited.end)
        }
        position.y = newCoordinate
        break
      case 'E':
        newCoordinate = Math.min(position.x + length, 100000)
        newVisited = this.updateMainAxis(this.rows, position.y, position.x, newCoordinate)
        if (newVisited != null) {
          this.counter += this.updateCrossAxis(this.columns, position.y, newVisited.start, newVisited.end)
        }
        position.x = newCoordinate
        break
      case 'W':
        newCoordinate = Math.max(position.x - length, -100000)
        newVisited = this.updateMainAxis(this.rows, position.y, newCoordinate, position.x)
        if (newVisited != null) {
          this.counter += this.updateCrossAxis(this.columns, position.y, newVisited.start, newVisited.end)
        }
        position.x = newCoordinate
        break
    }
  }

  updateCrossAxis (crossAxis, index, start, end) {
    /*
                       Check point by point in the cross axis
                       If the direction is N or S we check the rows and
                       if the direction is W or E we check the columns
                    */
    let counter = 0
    for (let i = start; i <= end; i++) {
      if (i in crossAxis) {
        if (crossAxis[i].filter(utils.checkExistInPath(index)).length === 0) {
          counter += 1
        }
      } else {
        counter += 1
      }
    }
    return counter
  }

  updateMainAxis (mainAxis, index, start, end) {
    /*
                       Check path in the main axis
                       If the direction is N or S we check the columns and
                       if the direction is W or E we check the rows
                    */
    if (index in mainAxis) {
      if (mainAxis[index].filter(utils.checkBiggerPathExists(start, end)).length > 0) {
        // return null when we already visited the whole path
        return
      } else {
        let found = false
        const containsStart = mainAxis[index].filter(utils.checkExistInPath(start)).sort(utils.sortWithStart) // Finding biggest path that contains the start point
        const containsEnd = mainAxis[index].filter(utils.checkExistInPath(end)).sort(utils.sortWithEnd) // Finding biggest path that contains the end point
        if (containsStart.length > 0) {
          start = containsStart[0].end + 1 // Cut the old-visited part from the start of path
          found = true
          mainAxis[index][mainAxis[index].indexOf(containsStart[0])].end = end // Update the path
        }
        if (containsEnd.length > 0) {
          end = containsEnd[0].start - 1 // Cut the old-visited part from the end of path
          if (!found) {
            mainAxis[index][mainAxis[index].indexOf(containsEnd[0])].start = start // Update the path if is wasn't updated in the previous IF condition
          }
          found = true
        }
        if (!found) { // Add new path to main axis if there is no old path containing parts of it
          mainAxis[index] = [new Line(start, end)]
        } else {
        }
      }
    } else { // Add new path if there is no path in this row/column
      mainAxis[index] = [new Line(start, end)]
    }
    return { start, end }
  }
}

module.exports = Map
