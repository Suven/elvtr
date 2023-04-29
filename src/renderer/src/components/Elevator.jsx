import { createSignal, onCleanup, createMemo, createEffect, on } from 'solid-js'
import Cabin from './Cabin.jsx'
import { floorUpOrDown, tickSpeed, elevatorCapacity } from '../logic/gameRules.js'
import peopleStore from '../stores/people.js'

import './Elevator.scss'

function Elevator(props) {
  const [tick, setTick] = createSignal(0)
  const [floor, setFloor] = createSignal(0)
  const [ppl, setPpl] = createSignal([])
  const [open, setOpen] = createSignal(false)
  const remainingCapacity = createMemo(() => elevatorCapacity - ppl().length)

  createEffect(
    on(tick, () => {
      // Unboard people in the elevator
      if (open() && ppl().length > 0) {
        peopleStore.unboardElevator(floor(), props.n)
        setPpl(peopleStore.inElevator(props.n))
      }
      // Board when the elevator is open and has capacity
      if (open() && remainingCapacity() > 0) {
        peopleStore.boardElevator(floor(), remainingCapacity(), props.n)
        setPpl(peopleStore.inElevator(props.n))
      }
    })
  )

  const timer = setInterval(() => {
    // Do the assigned action
    if (Math.random() > 0.5) {
      setFloor(floorUpOrDown(floor()))
    } else {
      setOpen(true)
      setTimeout(() => setOpen(false), tickSpeed - 200)
    }

    setTimeout(() => {
      setTick(tick() + 1)
    }, 200)
  }, tickSpeed)

  onCleanup(() => clearInterval(timer))

  return (
    <div class="elevator">
      <Cabin floor={floor()} open={open()} people={ppl()} />
    </div>
  )
}

export default Elevator
