import { starships } from '../data/starships.js'

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.main')

function populateNav(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', event => {
            let shipName = event.target.textContent
            const foundShip = starships.find(ship => ship.name === shipName)
            populateShipView(foundShip)
        })

        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
        nav.appendChild(navList)
    })
}

function populateShipView(shipData) {
    console.log(shipData)
    // use createElement to make new img elements
    // set their src to the url below
    // make shipNum act like charNum from the characters page
    //https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg
    // append the image to the shipView element
}

populateNav(starships)