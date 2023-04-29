import { randomFloor, maxPeople } from '../logic/gameRules.js'

const states = {
  WAITING: 0,
  ELEVATING: 1
}

export default {
  ai: 0,
  all: [],
  recentDones: [],
  done: 0,
  currentSpeed() {
    return this.recentDones.reduce((k, t) => k + t, 0)
  },
  waiting() {
    return this.all.filter((k) => k.state === states.WAITING)
  },
  waitingOnFloor(floor) {
    return this.waiting().filter((k) => k.floor === floor)
  },
  inElevator(n) {
    return this.all.filter((k) => k.state === states.ELEVATING && k.elevator === n)
  },
  addWaitingPerson() {
    if (this.waiting().length >= maxPeople) {
      return
    }

    this.all.push({
      id: this.ai++,
      added: Date.now(),
      gender: Math.random() < 0.5 ? 'm' : 'f',
      state: states.WAITING,
      floor: randomFloor(),
      elevator: undefined,
      // @TODO make sure the target floor is different
      targetFloor: randomFloor(),
      color:
        Math.random() < 0.2
          ? 'green'
          : Math.random() < 0.2
          ? 'blue'
          : Math.random() < 0.2
          ? 'pink'
          : Math.random() < 0.2
          ? 'yellow'
          : 'red'
    })
  },
  boardElevator(floor, max, elevator) {
    const matchingPeople = this.waitingOnFloor(floor).slice(0, max)
    matchingPeople.forEach((p) => {
      p.state = states.ELEVATING
      p.elevator = elevator
    })
  },
  unboardElevator(floor, elevator) {
    // Get the number of unboarding ppl
    const unboarding = this.all.filter((k) => k.targetFloor === floor && k.elevator === elevator)
    this.recentDones.push(unboarding.length)
    this.recentDones = this.recentDones.slice(-5)
    this.done = this.done + unboarding.length
    // Save the remaining list
    this.all = this.all.filter((k) => k.targetFloor !== floor || k.elevator !== elevator)
  }
}
