import { lint } from "stylelint"

const sourceEl = document.querySelector(".Source")
const configEl = document.querySelector(".Config")
const resultsEl = document.querySelector(".Results")
const consoleEl = document.querySelector(".Console")

function parseConfig(config) {
  try {
    return JSON.parse(config)
  } catch (err) {
    renderError(`There was a problem with the config:\n\n ${err}`)
    return false
  }
}

function renderWarnings(warnings) {
  let parsedWarnings = ""
  consoleEl.innerHTML = ""

  for (const w of warnings) {
    parsedWarnings += `Line ${w.line}, Col ${w.column}: ${w.text}\n`
  }

  resultsEl.innerHTML = parsedWarnings
}

function renderError(message) {
  resultsEl.innerHTML = ""
  consoleEl.innerHTML = message
}

function lintCSS(options) {
  lint(options)
    .then(output => {
      renderWarnings(output.results[0].warnings)
    }).catch(err => {
      renderError(`Failed to lint CSS! \n\n ${err}`)
    })
}

function run() {
  const config = parseConfig(configEl.value)
  if (config) {
    lintCSS({
      code: sourceEl.value,
      config,
    })
  }
}

sourceEl.addEventListener("change", run)
sourceEl.addEventListener("keyup", run)
configEl.addEventListener("change", run)
configEl.addEventListener("keyup", run)

run()
