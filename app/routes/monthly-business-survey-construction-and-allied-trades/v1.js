var path = '/monthly-business-survey-construction-and-allied-trades/'
var v = 'v1/'

var guidance = 'guidance/'
var reportingPeriod = 'reporting-period/'
var valueOfWork = 'value-of-work/'

var months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October',
  'November', 'December'
]

function monthNumToName (monthnum) {
  return months[monthnum - 1] || ''
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

module.exports = function (router) {

  // ******* START PAGE *******
  router.post(path + v + 'start', function (req, res) {
    // Clears session data
    req.session.data = {}
    // Set section as how to complete and reporting period
    req.session.data.activeSection = 'reportingPeriod'
    // CTA redirects to 'how to complete' page
    res.redirect(path + v + guidance + 'how-to-complete')
  })

  // **********************************************************************
  // ******* HUB PAGE *******
  // **********************************************************************
  router.post(path + v + 'hub', function (req, res) {
    if (req.session.data.activeSection === 'reportingPeriod') {
      res.redirect(path + v + guidance + 'how-to-complete')
    }
    if (req.session.data.activeSection === 'valueOfWork') {
      res.redirect(path + v + valueOfWork + 'value-of-work')
    }
    else {
      res.redirect(path + v + guidance + 'how-to-complete')
    }
  })

  // **********************************************************************
  // ******* GUIDANCE PAGE *******
  // **********************************************************************

  // How to complete guidance page
  router.post(path + v + guidance + 'how-to-complete', function (req, res) {
    // CTA redirects to 'are you able to report for the dates' question page
    res.redirect(path + v + reportingPeriod + 'are-you-able-to-report')
  })

  // **********************************************************************
  // ******* REPORTING PERIOD SECTION *******
  // **********************************************************************

  // 'Are you able to report for the dates' question page
  router.post(path + v + reportingPeriod + 'are-you-able-to-report', function (req, res) {
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
      // CTA redirects to the reporting period CYA page
      res.redirect(path + v + reportingPeriod + 'check-your-answers')
    }
    // If user answers no to 'able to report' question
    if (req.session.data.ableToReport === 'no') {
      // CTA redirects to the 'what dates can you report for' question page
      res.redirect(path + v + reportingPeriod + 'what-dates-will-you-be-reporting-for')
    }
  })

  // 'What dates will you be reporting for?' question page
  router.post(path + v + reportingPeriod + 'what-dates-will-you-be-reporting-for', function (req, res) {
    // Set session flag for custom dates
    req.session.data.customDates = true

    // Convert month number to text string for the date from
    req.session.data.whatDateFromMonthText = monthNumToName(req.session.data.whatDateFromMonth)

    // Convert month number to text string for the date to
    req.session.data.whatDateToMonthText = monthNumToName(req.session.data.whatDateToMonth)

    // CTA redirects to the reporting period CYA page
    res.redirect(path + v + reportingPeriod + 'check-your-answers')
  })

  // Reporting period check your answers page
  router.post(path + v + reportingPeriod + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.reportingPeriodComplete = true
    // Complete section and set active section as value of work
    req.session.data.activeSection = 'valueOfWork'
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* VALUE OF WORK SECTION *******
  // **********************************************************************

  // Value of work guidance page
  router.post(path + v + valueOfWork + 'value-of-work', function (req, res) {
    // CTA redirects to 'total value of all construction work' question page
    res.redirect(path + v + valueOfWork + 'total-value-of-all-construction-work')
  })

  // Total value of work question page
  router.post(path + v + valueOfWork + 'total-value-of-all-construction-work', function (req, res) {
    // Reformat money
    req.session.data.totalValueOfAllWorkFormatted = numberWithCommas(req.session.data.totalValueOfAllWork)
    // CTA redirects to 'check your answers' page
    res.redirect(path + v + valueOfWork + 'check-your-answers')
  })

  // Value of work check your answers page
  router.post(path + v + valueOfWork + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.valueOfWorkComplete = true
    // Complete section and set active section as housing work
    req.session.data.activeSection = 'housingWork'
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })
}
