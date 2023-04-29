import { For } from 'solid-js'
import './Cabin.scss'
import CabinIndicator from './CabinIndicator.jsx'
import Person from './Person.jsx'
import { floors } from '../logic/gameRules.js'

function Cabin(props) {
  return (
    <div
      class="cabin"
      classList={{
        'cabin--open': props.open
      }}
      style={{ top: `-${props.floor * (100 / floors)}%` }}
    >
      <div class="indicators">
        <CabinIndicator
          n={0}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 0)}
        />
        <CabinIndicator
          n={1}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 1)}
        />
        <CabinIndicator
          n={2}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 2)}
        />
        <CabinIndicator
          n={3}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 3)}
        />
        <CabinIndicator
          n={4}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 4)}
        />
        <CabinIndicator
          n={5}
          floor={props.floor}
          queued={props.people.find((k) => k.targetFloor === 5)}
        />
      </div>
      <div class="people">
        <For each={props.people}>{(p) => <Person person={p} />}</For>
      </div>
    </div>
  )
}

export default Cabin
