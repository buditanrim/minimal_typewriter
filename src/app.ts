const RANDOM_QUOTE_URL = 'https://api.quotable.io/random?minLength=100'
const quoteBase = document.getElementById('quoteBase')
const quoteInput = document.getElementById('quoteInput') as HTMLInputElement

// pull quote from the API
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_URL)
    .then((res) => res.json())
    .then((data) => data.content)
}

async function renderQuote() {
  // insert the random quote
  const quote = await getRandomQuote()
  const quoteArray = quote.split('')

  // split the character and wrap it into span
  if (quoteBase !== null) {
    quoteBase.innerText = ''
    quoteArray.forEach((character: string) => {
      const letter = document.createElement('span')
      letter.innerText = character
      quoteBase.appendChild(letter)
    })
  }

  if (quoteInput !== null) {
    quoteInput.value = ''
  }
}

renderQuote()

// listen to input
if (quoteInput !== null) {
  quoteInput.addEventListener('input', () => {
    if (quoteBase !== null) {
      const quoteArray = quoteBase.querySelectorAll('span') // array of span
      const inputArray = quoteInput.value.split('') //
      let wordCompleted

      quoteArray.forEach((character, i) => {
        const quoteLetter = character.innerText
        const inputLetter = inputArray[i]

        if (inputLetter == null) {
          character.classList.add('neutral')
          character.classList.remove('correct')
          character.classList.remove('incorrect')
          wordCompleted = false
        } else if (inputLetter === quoteLetter) {
          character.classList.add('correct')
          character.classList.remove('incorrect')
          wordCompleted = true
        } else {
          character.classList.add('incorrect')
          character.classList.remove('correct')
          wordCompleted = false
        }
      })

      if (wordCompleted) renderQuote()
    }
  })
}
