import Elevator from './components/Elevator.jsx'
import Floor from './components/Floor.jsx'
import { elevators, floors, peopleTickSpeed } from './logic/gameRules.js'
import peopleStore from './stores/people.js'
import { createSignal, onCleanup, For } from 'solid-js'

function App() {
  const [total, setTotal] = createSignal(0)
  const [speed, setSpeed] = createSignal(0)
  const [flrs, setFlrs] = createSignal(
    Array.from(Array(floors).keys())
      .reverse()
      .map((n) => ({ n, people: [] }))
  )
  const elvs = Array.from(Array(elevators).keys())

  const peopleTimer = setInterval(() => {
    peopleStore.addWaitingPerson()
  }, peopleTickSpeed)

  const peopleMover = setInterval(() => {
    setFlrs(
      flrs().map((f) => ({
        n: f.n,
        people: peopleStore.waitingOnFloor(f.n)
      }))
    )
    setTotal(peopleStore.done)
    setSpeed(peopleStore.currentSpeed())
  }, 1000 / 60)

  onCleanup(() => clearInterval(peopleTimer))
  onCleanup(() => clearInterval(peopleMover))

  return (
    <div class="container">
      <div class="navigation">
        <div class="navigation-item navigation-item--active">Elevators</div>
        <div class="navigation-item">Rules</div>
        <div class="navigation-item">Upgrades [0]</div>
        <div class="navigation-item">Info</div>
        <div class="navigation-item navigation-item--info">
          <span>
            {total()}
            <span class="icon icon-person"></span>
          </span>
          &nbsp;
          <span>
            {speed()}
            <span class="icon icon-person"></span>/<span class="icon icon-clock"></span>
          </span>
        </div>
      </div>
      <div class="main">
        <div class="floors">
          <For each={flrs()}>{(f) => <Floor n={f.n} people={f.people} />}</For>
        </div>
        <div class="elevators">
          <For each={elvs}>{(n) => <Elevator n={n} />}</For>
        </div>
      </div>
    </div>
  )
}

export default App
