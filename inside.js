// This file is translated from C++ found here: https://www.geeksforgeeks.org/how-to-check-if-a-given-point-lies-inside-a-polygon/

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `[${this.x},${this.y}]`
  }
}

/**
 * Checks if point q lies on the segment 'pr'
 * @param {Point} p Point p
 * @param {Point} q Point q
 * @param {Point} r Point r
 * @returns {boolean} true or false, true -> on point, false -> not on point
 */
function onSegment(p, q, r) {
  if(q.x <= Math.max(p.x, r.x) && q.x >= min(p.x, r.x) &&
  q.y <= Math.max(p.y, r.y) && q.y >= min(p.y, r.y)){
    return true
  }
  return false
}


/**
 * Find orientation of ordered triplet (p, q, r)
 * @param {Point} p Point p
 * @param {Point} q Point q
 * @param {Point} r Point r
 * @returns {number} Returns an integer 0-2. 0 -> Colinear, 1 -> Clockwise, 2 -> Counterclockwise
 */
function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) -
              (q.x - p.x) * (r.y - q.y)

  return val === 0 ? 0 : val > 0 ? 1 : 2
}

function doIntersect(p1, q1, p2, q2) {
  let o1 = orientation(p1, q1, p2) 
  let o2 = orientation(p1, q1, q2) 
  let o3 = orientation(p2, q2, p1) 
  let o4 = orientation(p2, q2, q1) 
  
  if(o1 != o2 && o3 != o4){
      return true
  }
  
  if (o1 == 0 && onSegment(p1, p2, q1)) {
    return true
  }
  if (o3 == 0 && onSegment(p2, p1, q2)) {
    return true
  } 
  if (o4 == 0 && onSegment(p2, q1, q2)) {
    return true
  } 
  return false
}

/**
 * Check if the point p lies inside the polygon
 * @param {Point[]} polygon List of points that form the polygon
 * @param {number} n Number of vertices in the polygon
 * @param {Point} p Point p
 * @returns {boolean} true or false, true if the point is inside the polygon, false if not
 */
function isInside(polygon, n, p) {
  if (n < 3) return false
  const extreme = new Point(100000, p.y)
  let count = 0, i = 0, next
  do {
    next = (i + 1) % n
    if (doIntersect(polygon[i], polygon[next], p, extreme)) {
      if (orientation(polygon[i], p, polygon[next]) === 0) {
        return onSegment(polygon[i], p, polygon[next])
      }
      count++
    }
    i = next
  } while (i !== 0)
  return count % 2 === 1
}

function main() {
  const polygon1 = [new Point(0,0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]
  const n1 = polygon1.length
  const p1 = new Point(20, 20)
  const p2 = new Point(5, 5)
  console.log(`Is point ${p1} inside polygon ${polygon1}? ${isInside(polygon1, n1, p1) ? 'yes' : 'no'}`)
  console.log(`Is point ${p2} inside polygon ${polygon1}? ${isInside(polygon1, n1, p2) ? 'yes' : 'no'}`)
}

main()
