import './CabinIndicator.scss'

function CabinIndicator(props) {
  return (
    <div
      class="cabinIndicator"
      classList={{
        'cabinIndicator--active': props.floor === props.n,
        'cabinIndicator--queued': props.queued
      }}
    >
      {props.n}
    </div>
  )
}

export default CabinIndicator
