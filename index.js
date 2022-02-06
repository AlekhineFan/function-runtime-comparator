async function compare(fns) {
  return fns.map(fn => exec(fn))
}

function exec(fn) {
  createTestVariables()
  const t = performance.now()
  const res = fn()
  const t2 = performance.now()
  const diff = t2 - t

  return { diff, res }
}

const colorGradient = [
  '#39FF14',
  '#88FF0C',
  '#B0FF08',
  '#D7FF04',
  '#FFFF00',
  '#F5BD25',
  '#FFA203',
  '#FF8A05',
  '#FE691E',
  '#F54545',
]

function runFunctionFromInput() {
  const functions = []
  const inputs = document.querySelectorAll('.function-container')
  inputs.forEach(input => functions.push(createStringForFuntionConstructor(input.value)))
  compare(functions).then(res => writeResultsToDOM(inputs, res)).catch(err => console.log(err))

  function writeResultsToDOM(inputs, results) {
    for (let i = 0; i < results.length; i++) {
      inputs[i].value = `${results[i].diff} ms\r\nreturns ${results[i].res}\r\n\r\n${inputs[i].value}`
    }
  }
}

function addTextArea() {
  const newtextArea = document.createElement('textarea')
  newtextArea.setAttribute('cols', 80)
  newtextArea.setAttribute('rows', 6)
  newtextArea.classList.add('function-container')
  newtextArea.classList.add('text-container')

  const deleteIcon = document.createElement('img')
  deleteIcon.setAttribute('src', `./icons/remove.png`)
  deleteIcon.classList.add('delete-icon')

  const functionInputs = document.querySelector('#div-funtion-input')
  const container = document.createElement('div')
  container.style = "position:relative"
  container.appendChild(newtextArea)
  container.appendChild(deleteIcon)

  functionInputs.appendChild(container)

  document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const parent = icon.parentNode
      parent.remove()
    })
  })
}

const argumentsInput = document.querySelector('#txtarea-arguments')

function createTestVariables() {
  const argumentStrings = argumentsInput.value.split('\n')
  for (const argStr of argumentStrings) {
    const splitted = argStr.split('=')
    window[`${splitted[0].trim()}`] = `${splitted[1].trim()}`
    console.log(window[`${splitted[0].trim()}`] = `${splitted[1].trim()}`)
  }
}

function createStringForFuntionConstructor(inputStr) {
  let firstClosingBracket = inputStr.indexOf(')')
  const fnBody = inputStr.substring(++firstClosingBracket)
  return new Function(fnBody)
}

document.querySelector('#btn-add').addEventListener('click', addTextArea)
document.querySelector('#btn-compare').addEventListener('click', createTestVariables)
document.querySelector('#btn-compare').addEventListener('click', runFunctionFromInput)
