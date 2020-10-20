import { films } from './data/films.js'
import { people } from './data/people.js'

//console.log(people.length)

//console.log(films[0])


people.forEach(person => {
    let newParagraph = document.body.appendChild(document.createElement('p'))
    newParagraph.textContent = person.name
})