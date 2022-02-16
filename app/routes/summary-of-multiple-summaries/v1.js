var path = '/summary-of-multiple-summaries/'
var v = 'v1/'

module.exports = function (router) {

  // Start page
  router.post(path + v + 'start', function (req, res) {
    // CTA redirects to 'how to complete' page
    res.redirect(path + v + 'how-to-complete')
  })

  // How to complete guidance page
  router.post(path + v + 'how-to-complete', function (req, res) {
    // CTA redirects to 'are you able to report for the dates' question page
    res.redirect(path + v + 'are-you-able-to-report')
  })

  // 'Are you able to report for the dates' question page
  router.post(path + v + 'are-you-able-to-report', function (req, res) {
    // If user answers yes to 'able to report' question
    if (req.session.data.ableToReport === 'yes') {
      // CTA redirects to the value of work guidance page
      res.redirect(path + v + 'value-of-work')
    }
    // If user answers no to 'able to report' question
    if (req.session.data.ableToReport === 'no') {
      // CTA redirects to the 'what dates can you report for' question page
      res.redirect(path + v + 'what-dates-will-you-be-reporting-for')
    }
  })

}
