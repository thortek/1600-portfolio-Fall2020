// Reusable async function to fetch data from the provided url
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// now, use the async getAPIData function
function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then
        (async (data) => {
            for (const pokemon of data.results) {
                await getAPIData(pokemon.url).then((pokeData) => {
                    populatePokeCard(pokeData)
                })
            }
        })
}

const pokemonGrid = document.querySelector('.pokemonGrid')
const loadButton = document.querySelector('button')

loadButton.addEventListener('click', () => {
    loadPage()
    loadButton.disabled = true
})

/* mudsDaleButton.addEventListener('click', () => {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/750`).then
        (async (data) => {
            let mudMoves = document.createElement('ul')
            data.moves.forEach(move => {
                console.log(move.move.name)
                let moveItem = document.createElement('li')
                moveItem.textContent = move.move.name
                mudMoves.appendChild(moveItem)
            })
            let mudImage = document.createElement('img')
            mudImage.src = `../images/pokemon/750.png`
            pokemonGrid.appendChild(mudMoves)
            pokemonGrid.appendChild(mudImage)
    })
}) */

function populatePokeCard(pokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div')
    cardFront.className = `card__face card__face--front`
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    frontLabel.textContent = pokemon.name
    frontImage.src = `../images/pokemon/${getImageFileName(pokemon)}.png`
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div')
    cardBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('h3')
    backLabel.textContent = `Abilities:`
    let abilityList = document.createElement('ul')
    pokemon.abilities.forEach(ability => {
        let abilityName = document.createElement('li')
        abilityName.textContent = ability.ability.name
        abilityList.appendChild(abilityName)
    })
    let movesLabel = document.createElement('h3')
    movesLabel.textContent = 'Most Accurate Move:'
    let moveAccuracy = document.createElement('h4')
    const mostAccurateMove = getBestAccuracyAndPower(pokemon.moves)
    //console.log(mostAccurateMove.move)
    //moveAccuracy.textContent = `${mostAccurateMove.move.name}`
    cardBack.appendChild(backLabel)
    cardBack.appendChild(abilityList)
    cardBack.appendChild(movesLabel)
    cardBack.appendChild(moveAccuracy)
    return cardBack
}

function getBestAccuracyAndPower(pokemoves) {
    return pokemoves.reduce((mostAccurate, move) => {
        //console.log(move.move.url)
        getAPIData(move.move.url).then
            (async (data) => {
                console.log(data.accuracy, data.power)
            })
    //    return mostAccurate.accuracy > move.accuracy ? mostAccurate : move;
      }, {});
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id < 99) {
        return `0${pokemon.id}`
    }
}

function Pokemon(name, height, weight, abilities) {
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.id = 900
}

let thoremon = new Pokemon('Thoremon', 450, 200, ['gorge', 'sleep', 'cough'])
console.log(thoremon)