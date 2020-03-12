function checkExistInPath (index) { // Check if this point is in a visited path
  return function (element) {
    return element.start <= index && element.end >= index
  }
}

function sortWithStart (a, b) { // Sort with start of paths
  return a.start > b.start
}

function sortWithEnd (a, b) { // Sort with end of paths
  return a.end < b.end
}

function checkBiggerPathExists (start, end) { // Check if a bigger path exists in this row/column
  return function (element) {
    return element.start <= start && element.end >= end
  }
}

module.exports = {
  checkExistInPath,
  sortWithStart,
  sortWithEnd,
  checkBiggerPathExists
}
