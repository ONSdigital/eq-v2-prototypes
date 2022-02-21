/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

function showAlert(){
  alert("Sorry, this feature has not been added to this prototype yet")
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
