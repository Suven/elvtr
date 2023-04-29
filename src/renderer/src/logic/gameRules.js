// ms per Tick
const tickSpeed = 1000
// peopleSpawnRate
const peopleTickSpeed = tickSpeed * 0.7
// Number of supported floors
const floors = 6
// max number of waiting people
const maxPeople = floors * 4
// elevatorCapacity
const elevatorCapacity = 5
// Number of elevators
const elevators = 4
// Returns a random valid floor-number between 0 and `floors`
const randomFloor = () => Math.floor(Math.random() * floors)
// Returns a floor randomly higher or lower
const floorUpOrDown = (c) => (Math.random() > 0.5 ? floorOneUp(c) : floorOneDown(c))
// Returns a floor one higher
const floorOneUp = (c) => (c >= floors - 1 ? floors - 1 : c + 1)
// Returns a floor one lower
const floorOneDown = (c) => (c <= 0 ? 0 : c - 1)

export {
  elevators,
  floors,
  maxPeople,
  elevatorCapacity,
  randomFloor,
  tickSpeed,
  floorUpOrDown,
  floorOneUp,
  floorOneDown,
  peopleTickSpeed
}
