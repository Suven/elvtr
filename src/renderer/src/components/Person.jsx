import './Person.scss'

function Person(props) {
  return (
    <div
      class="person"
      classList={{
        'person--m': props.person.gender === 'm',
        'person--f': props.person.gender === 'f',
        'person--green': props.person.color === 'green',
        'person--blue': props.person.color === 'blue',
        'person--pink': props.person.color === 'pink',
        'person--yellow': props.person.color === 'yellow',
        'person--red': props.person.color === 'red'
      }}
    />
  )
}

export default Person
