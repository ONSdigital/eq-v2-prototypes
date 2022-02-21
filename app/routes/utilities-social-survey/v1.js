var path = '/utilities-social-survey/'
var pathGet = 'utilities-social-survey/'
var v = 'v1/'

var guidance = 'guidance/'
var reportingPeriod = 'reporting-period/'
var energyUtilities = 'energy-utilities/'
var broadbandPhoneTV = 'broadband-phone-tv/'
var householdShopping = 'household-shopping/'
var totalAmount = 'total-amount/'

var months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October',
  'November', 'December'
]

function monthNumToName (monthnum) {
  return months[monthnum - 1] || ''
}

function numberWithCommas (x) {
  x = x.toString()
  var pattern = /(-?\d+)(\d{3})/
  while (pattern.test(x)) { x = x.replace(pattern, '$1,$2') }
  return x
}

module.exports = function (router) {
  // ******* START PAGE *******
  router.post(path + v + 'start', function (req, res) {
    // Clears session data
    req.session.data = {}
    // CTA redirects to 'how to complete' page
    res.redirect(path + v + guidance + 'how-to-complete')
  })

  // **********************************************************************
  // ******* HUB PAGE *******
  // **********************************************************************
  router.post(path + v + 'hub', function (req, res) {
    if (req.session.data.reportingPeriodComplete !== true) {
      res.redirect(path + v + guidance + 'how-to-complete')
    }
    if (req.session.data.energyUtilitiesComplete !== true) {
      res.redirect(path + v + energyUtilities + 'total-spent-on-energy-utilities')
    }
    if (req.session.data.broadbandPhoneTVComplete !== true) {
      res.redirect(path + v + broadbandPhoneTV + 'total-spent-on-broadband-phone-tv')
    }
    if (req.session.data.householdShoppingComplete !== true) {
      res.redirect(path + v + householdShopping + 'total-spent-on-household-shopping')
    }
    if (req.session.data.totalAmountComplete !== true) {
      res.redirect(path + v + totalAmount + 'complete')
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
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* ENERGY UTILITIES *******
  // **********************************************************************

  // Total spent on energy utilities page
  router.post(path + v + energyUtilities + 'total-spent-on-energy-utilities', function (req, res) {
    req.session.data.totalEnergyUtilitiesFormatted = numberWithCommas(req.session.data.totalEnergyUtilities)
    // CTA redirects to 'check your answers' page
    res.redirect(path + v + energyUtilities + 'check-your-answers')
  })

  // Energy utilities check your answers page
  router.post(path + v + energyUtilities + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.energyUtilitiesComplete = true
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* BROADBAND PHONE AND TV BILLS *******
  // **********************************************************************

  // Total spent on broadband phone and tv page
  router.post(path + v + broadbandPhoneTV + 'total-spent-on-broadband-phone-tv', function (req, res) {
    req.session.data.totalBroadbandPhoneTVFormatted = numberWithCommas(req.session.data.totalBroadbandPhoneTV)
    // CTA redirects to 'check your answers' page
    res.redirect(path + v + broadbandPhoneTV + 'check-your-answers')
  })

  // Broadband phone and TV check your answers page
  router.post(path + v + broadbandPhoneTV + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.broadbandPhoneTVComplete = true
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* HOUSEHOLD SHOPPING BILLS *******
  // **********************************************************************

  // Total spent on household shopping
  router.post(path + v + householdShopping + 'total-spent-on-household-shopping', function (req, res) {
    req.session.data.totalHouseholdShoppingFormatted = numberWithCommas(req.session.data.totalHouseholdShopping)
    // CTA redirects to 'check your answers' page
    res.redirect(path + v + householdShopping + 'check-your-answers')
  })

  // Household shopping check your answers page
  router.post(path + v + householdShopping + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.householdShoppingComplete = true
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* REVIEW TOTAL *******
  // **********************************************************************

  // GET formatted version of total
  router.get(path + v + totalAmount + 'complete', function (req, res) {
    req.session.data.totalEnergyUtilitiesInt = parseInt(req.session.data.totalEnergyUtilities)
    req.session.data.totalBroadbandPhoneTVInt = parseInt(req.session.data.totalBroadbandPhoneTV)
    req.session.data.totalHouseholdShoppingInt = parseInt(req.session.data.totalHouseholdShopping)
    req.session.data.totalAmount = req.session.data.totalEnergyUtilitiesInt + req.session.data.totalBroadbandPhoneTVInt + req.session.data.totalHouseholdShoppingInt
    req.session.data.totalAmountFormatted = numberWithCommas(req.session.data.totalAmount)
    res.redirect(path + v + totalAmount + 'check-your-answers')
  })

  // Summary of all summaries page
  router.post(path + v + totalAmount + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.totalAmountComplete = true
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })
}
