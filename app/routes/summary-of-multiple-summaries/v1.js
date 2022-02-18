var path = '/summary-of-multiple-summaries/'
var v = 'v1/'

var months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October',
  'November', 'December'
]

function monthNumToName (monthnum) {
  return months[monthnum - 1] || ''
}

module.exports = function (router) {
  // Start page
  router.post(path + v + 'start', function (req, res) {
    // Clear session data
    req.session.data = {}
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
      // Clear session flag for custom dates
      req.session.data.customDates = null
      // Clear custom dates if already set previously
      req.session.data.whatDateFromDay = null
      req.session.data.whatDateFromMonth = null
      req.session.data.whatDateFromMonthText = null
      req.session.data.whatDateFromYear = null
      req.session.data.whatDateToDay = null
      req.session.data.whatDateToMonth = null
      req.session.data.whatDateToMonthText = null
      req.session.data.whatDateToYear = null
      // CTA redirects to the value of work guidance page
      res.redirect(path + v + 'value-of-work')
    }
    // If user answers no to 'able to report' question
    if (req.session.data.ableToReport === 'no') {
      // CTA redirects to the 'what dates can you report for' question page
      res.redirect(path + v + 'what-dates-will-you-be-reporting-for')
    }
  })

  // 'What dates will you be reporting for?' question page
  router.post(path + v + 'what-dates-will-you-be-reporting-for', function (req, res) {
    // Set session flag for custom dates
    req.session.data.customDates = true

    // Convert month number to text string for the date from
    req.session.data.whatDateFromMonthText = monthNumToName(req.session.data.whatDateFromMonth)

    // Convert month number to text string for the date to
    req.session.data.whatDateToMonthText = monthNumToName(req.session.data.whatDateToMonth)

    // CTA redirects to 'value of work' guidance page
    res.redirect(path + v + 'value-of-work')
  })

  // Value of work guidance page
  router.post(path + v + 'value-of-work', function (req, res) {
    // CTA redirects to 'total value of all construction work' question page
    res.redirect(path + v + 'total-value-of-all-construction-work')
  })
}
