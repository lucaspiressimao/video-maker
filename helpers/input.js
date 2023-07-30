const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
  const content = {
    maximumSentences: 7
  }

  content.searchTheme = askAndReturnSearchTheme()
  content.prefix = askAndReturnVideoType()
  content.duration = askAndReturnDuration()
  state.save(content)

  function askAndReturnSearchTheme() {
    return readline.question('Type theme: ')
  }

  function askAndReturnVideoType() {
    const videoTypes = ['Curiosidades', 'Reviews e Análises ', 'Documentários', 'Música', 'Tutoriais']
    const selectedPrefixIndex = readline.keyInSelect(videoTypes, 'Choose one option: ')
    const selectedPrefixText = videoTypes[selectedPrefixIndex]

    return selectedPrefixText
  }

  function askAndReturnDuration() {
    const videoTypes = ['de 1 a 2 minutos', 'de 3 a 4 minutos', 'de 4 a 6 minutos', 'de 6 a 10 minutos', 'de 10 a 20 minutos']
    const selectedPrefixIndex = readline.keyInSelect(videoTypes, 'Choose one option: ')
    const selectedPrefixText = videoTypes[selectedPrefixIndex]

    return selectedPrefixText
  }

}

module.exports = robot
