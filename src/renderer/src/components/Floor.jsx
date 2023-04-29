import './Floor.scss'
import Person from './Person.jsx'
import { For } from 'solid-js'

function Floor(props) {
  return (
    <div class="floor">
      <div class="floor-number">{props.n}</div>
      <div className="floor-people">
        <For each={props.people.reverse()}>{(p) => <Person person={p} />}</For>
      </div>
    </div>
  )
}

export default Floor
