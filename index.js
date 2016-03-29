import lint from "stylelint/dist/restricted"

const sourceEl = document.getElementById("source")
const configEl = document.getElementById("config")
const resultsEl = document.getElementById("results")
const lintEl = document.getElementById("run")
const options = {}
let results = ""

const run = () => {
  options.code = sourceEl.value
  try {
    options.config = JSON.parse(configEl.value)
  } catch (err) {
    window.alert(`Failed to parse stylelint config with error:\n\n ${err}`)
    return
  }

  lint(options).then(output => {
    for (const w of output.results[0].warnings) {
      results += `Line ${w.line}, Col ${w.column}: ${w.text}\n`
    }
    resultsEl.innerHTML = results
    results = ""
  }).catch(err => {
    window.alert(`Failed to parse CSS with error:\n\n ${err}`)
  })
}

lintEl.addEventListener("click", run)
