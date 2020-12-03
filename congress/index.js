import { senators } from '../data/senators.js'
import { removeChildren } from '../utils/index.js'

const senatorGrid = document.querySelector('.senatorGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

seniorityButton.addEventListener('click', () => {
    senioritySort()
})

birthdayButton.addEventListener('click', () => {
  birthdaySort()
})

function populateSenatorDiv(simpleSenators) {
  removeChildren(senatorGrid)
  simpleSenators.forEach(senator => {
      let senDiv = document.createElement('div')
      let senFigure = document.createElement('figure')
      let figImg = document.createElement('img')
      let figCaption = document.createElement('figcaption')
      let partyIcon = document.createElement('i')
      if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
      if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
      if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
      figImg.src = senator.imgURL
      figCaption.textContent = senator.name

      figCaption.appendChild(partyIcon)
      senFigure.appendChild(figImg)
      senFigure.appendChild(figCaption)
      senDiv.appendChild(senFigure)
      //senDiv.appendChild(progressBars(senator))
      senatorGrid.appendChild(senDiv)
  })
}

function getSimplifiedSenators(senatorArray) {
  return senatorArray.map(senator => {
      let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
      return {
          id: senator.id,
          name: `${senator.first_name}${middleName}${senator.last_name}`,
          imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
          seniority: parseInt(senator.seniority, 10),
          missedVotesPct: senator.missed_votes_pct,
          party: senator.party,
          loyaltyPct: senator.votes_with_party_pct,
          date_of_birth: senator.date_of_birth
      }
  })
}

const mostSeniority = getSimplifiedSenators(senators).reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

const missedVotes = getSimplifiedSenators(senators).reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

const filterSenators = (prop, value) => {
  return senators.filter(senator => {
      return senator[prop] === value
  })
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')

let loyalArray = []

const mostLoyal = getSimplifiedSenators(democrats).reduce((acc, senator) => {
    if (senator.loyaltyPct === 100) {
        loyalArray.push(senator)
    }
    return acc.loyaltyPct > senator.loyaltyPct ? acc : senator
})

// sort by value
function senioritySort() {
  populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
      return parseInt(a.seniority) - parseInt(b.seniority)
  })
  )
}

function birthdaySort() {
  populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
      return parseInt(a.date_of_birth) - parseInt(b.date_of_birth)
  })
  )
}

console.log(mostSeniority, missedVotes, loyalArray)

// by default on page load, we show all senators unsorted
populateSenatorDiv(getSimplifiedSenators(senators))