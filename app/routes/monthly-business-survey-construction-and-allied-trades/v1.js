var path = '/monthly-business-survey-construction-and-allied-trades/'
var v = 'v1/'

var guidance = 'guidance/'
var reportingPeriod = 'reporting-period/'
var housing = 'housing/'
var infrastructure = 'infrastructure/'
var nonhousing = 'nonhousing/'
var totalAmount = 'total-amount/'

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

  router.get(path + v + 'start-page-from-section-page', function (req, res) {
    req.session.data.startPageRedirect = true
    res.redirect(path + v + 'start')
  })

  router.post(path + v + 'start', function (req, res) {
    if (req.session.data.startPageRedirect === true)
    {
      req.session.data.startPageRedirect = false
      res.redirect(path + v + 'hub')
    }
    else {
      // Clears session data
      req.session.data = {}
      // CTA redirects to 'how to complete' page
      res.redirect(path + v + guidance + 'how-to-complete')
    }
  })

  // **********************************************************************
  // ******* HUB PAGE *******
  // **********************************************************************
  router.post(path + v + 'hub', function (req, res) {
    if (req.session.data.reportingPeriodComplete !== true) {
      res.redirect(path + v + guidance + 'how-to-complete')
    }
    if (req.session.data.housingComplete !== true) {
      res.redirect(path + v + housing + 'value-public')
    }
    if (req.session.data.infrastructureComplete !== true) {
      res.redirect(path + v + infrastructure + 'value-new')
    }
    if (req.session.data.nonhousingComplete !== true) {
      res.redirect(path + v + nonhousing + 'value-new')
    }
    if (req.session.data.totalAmountComplete !== true) {
      res.redirect(path + v + totalAmount + 'complete')
    }
    else {
      res.redirect(path + v + 'complete')
    }
  })

  // Completed all sections
  router.get(path + v + 'completed-all', function (req, res) {
    req.session.data.reportingPeriodComplete = true
    req.session.data.housingComplete = true
    req.session.data.infrastructureComplete = true
    req.session.data.nonhousingComplete = true
    req.session.data.totalAmountComplete = true
    req.session.data.ableToReport = true
    req.session.data.totalHousingPublic = '1'
    req.session.data.totalHousingPublicFormatted = '1'
    req.session.data.totalHousingPrivate = '1'
    req.session.data.totalHousingPrivateFormatted = '1'
    req.session.data.totalHousingAmount = '2'
    req.session.data.totalHousingAmountFormatted = '2'
    req.session.data.totalNonhousingNew = '1'
    req.session.data.totalNonhousingNewFormatted = '1'
    req.session.data.totalNonhousingExisting = '1'
    req.session.data.totalNonhousingExistingFormatted = '1'
    req.session.data.totalNonhousingAmount = '2'
    req.session.data.totalNonhousingAmountFormatted = '2'
    req.session.data.totalInfrastructureNew = '1'
    req.session.data.totalInfrastructureNewFormatted = '1'
    req.session.data.totalInfrastructureExisting = '1'
    req.session.data.totalInfrastructureExistingFormatted = '1'
    req.session.data.totalInfrastructureAmount = '2'
    req.session.data.totalInfrastructureAmountFormatted = '2'
    req.session.data.totalAmount = '6'
    req.session.data.totalAmountFormatted = '6'
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* GUIDANCE PAGE *******
  // **********************************************************************

  // How to complete guidance page
  router.post(path + v + guidance + 'how-to-complete', function (req, res) {
    // CTA redirects to 'are you able to report for the dates' question page
    if (req.session.data.howToCompleteFromHub === true) {
      req.session.data.howToCompleteFromHub = false
      res.redirect(path + v + 'hub')
    }
    else {
      res.redirect(path + v + reportingPeriod + 'are-you-able-to-report')
    }
  })

  // How to complete guidance page from hub
  router.get(path + v + guidance + 'how-to-complete-from-hub', function (req, res) {
    req.session.data.howToCompleteFromHub = true;
    // CTA redirects to how to complete
    res.redirect(path + v + guidance + 'how-to-complete')
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
  // ******* HOUSING SECTION *******
  // **********************************************************************

  // Total value of housing public
  router.post(path + v + housing + 'value-public', function (req, res) {
    req.session.data.totalHousingPublicFormatted = numberWithCommas(req.session.data.totalHousingPublic)
    if (req.session.data.housingPublicChangeMode === true) {
      req.session.data.housingPublicChangeMode = false
      res.redirect(path + v + housing + 'complete')
    } else {
      // CTA redirects to water spend page
      res.redirect(path + v + housing + 'value-private')
    }
  })

  // Change total spent on housing public

  router.get(path + v + housing + 'change-value-public', function (req, res) {
    req.session.data.housingPublicChangeMode = true
    res.redirect(path + v + housing + 'value-public')
  })

  // Total value of housing private
  router.post(path + v + housing + 'value-private', function (req, res) {
    req.session.data.totalHousingPrivateFormatted = numberWithCommas(req.session.data.totalHousingPrivate)
    if (req.session.data.housingPrivateChangeMode === true) {
      req.session.data.housingPrivateChangeMode = false
      res.redirect(path + v + housing + 'complete')
    } else {
      // CTA redirects to check your answers page
      res.redirect(path + v + housing + 'complete')
    }
  })

  // Change total spent on housing private

  router.get(path + v + housing + 'change-value-private', function (req, res) {
    req.session.data.housingPrivateChangeMode = true
    res.redirect(path + v + housing + 'value-private')
  })

  router.get(path + v + housing + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalHousingAmount = parseInt(req.session.data.totalHousingPublic) + parseInt(req.session.data.totalHousingPrivate)
    req.session.data.totalHousingAmountFormatted = numberWithCommas(req.session.data.totalHousingAmount)
    res.redirect(path + v + housing + 'check-your-answers')
  })

  // Housing check your answers from change page
  router.get(path + v + housing + 'change', function (req, res) {
    req.session.data.housingChangeMode = true
    res.redirect(path + v + housing + 'check-your-answers')
  })

  // Housing check your answers page
  router.post(path + v + housing + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.housingComplete = true
    if (req.session.data.housingChangeMode === true) {
      req.session.data.housingChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    } else {
      // CTA redirects to 'hub' page
      res.redirect(path + v + 'hub')
    }
  })

  // **********************************************************************
  // ******* INFRASTRUCTURE SECTION *******
  // **********************************************************************

  // Total value of infrastructure new
  router.post(path + v + infrastructure + 'value-new', function (req, res) {
    req.session.data.totalInfrastructureNewFormatted = numberWithCommas(req.session.data.totalInfrastructureNew)
    if (req.session.data.infrastructureNewChangeMode === true) {
      req.session.data.infrastructureNewChangeMode = false
      res.redirect(path + v + infrastructure + 'complete')
    } else {
      // CTA redirects to existing value page
      res.redirect(path + v + infrastructure + 'value-existing')
    }
  })

  // Change total spent on infrastructure new

  router.get(path + v + infrastructure + 'change-value-new', function (req, res) {
    req.session.data.infrastructureNewChangeMode = true
    res.redirect(path + v + infrastructure + 'value-new')
  })

  // Total value of infrastructure existing
  router.post(path + v + infrastructure + 'value-existing', function (req, res) {
    req.session.data.totalInfrastructureExistingFormatted = numberWithCommas(req.session.data.totalInfrastructureExisting)
    if (req.session.data.infrastructureExistingChangeMode === true) {
      req.session.data.infrastructureExistingChangeMode = false
      res.redirect(path + v + infrastructure + 'complete')
    } else {
      // CTA redirects to check your answers page
      res.redirect(path + v + infrastructure + 'complete')
    }
  })

  // Change total spent on infrastructure existing

  router.get(path + v + infrastructure + 'change-value-existing', function (req, res) {
    req.session.data.infrastructureExistingChangeMode = true
    res.redirect(path + v + infrastructure + 'value-existing')
  })

  router.get(path + v + infrastructure + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalInfrastructureAmount = parseInt(req.session.data.totalInfrastructureNew) + parseInt(req.session.data.totalInfrastructureExisting)
    req.session.data.totalInfrastructureAmountFormatted = numberWithCommas(req.session.data.totalInfrastructureAmount)
    res.redirect(path + v + infrastructure + 'check-your-answers')
  })

  // Infrastructure check your answers from change page
  router.get(path + v + infrastructure + 'change', function (req, res) {
    req.session.data.infrastructureChangeMode = true
    res.redirect(path + v + infrastructure + 'check-your-answers')
  })

  // Infrastructure check your answers page
  router.post(path + v + infrastructure + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.infrastructureComplete = true
    if (req.session.data.infrastructureChangeMode === true) {
      req.session.data.infrastructureChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    } else {
      // CTA redirects to 'hub' page
      res.redirect(path + v + 'hub')
    }
  })

  // **********************************************************************
  // ******* NON-HOUSING SECTION *******
  // **********************************************************************

  // Total value of nonhousing new
  router.post(path + v + nonhousing + 'value-new', function (req, res) {
    req.session.data.totalNonhousingNewFormatted = numberWithCommas(req.session.data.totalNonhousingNew)
    if (req.session.data.nonhousingNewChangeMode === true) {
      req.session.data.nonhousingNewChangeMode = false
      res.redirect(path + v + nonhousing + 'complete')
    } else {
      // CTA redirects to existing value page
      res.redirect(path + v + nonhousing + 'value-existing')
    }
  })

  // Change total spent on nonhousing new

  router.get(path + v + nonhousing + 'change-value-new', function (req, res) {
    req.session.data.nonhousingNewChangeMode = true
    res.redirect(path + v + nonhousing + 'value-new')
  })

  // Total value of nonhousing existing
  router.post(path + v + nonhousing + 'value-existing', function (req, res) {
    req.session.data.totalNonhousingExistingFormatted = numberWithCommas(req.session.data.totalNonhousingExisting)
    if (req.session.data.nonhousingExistingChangeMode === true) {
      req.session.data.nonhousingExistingChangeMode = false
      res.redirect(path + v + nonhousing + 'complete')
    } else {
      // CTA redirects to check your answers page
      res.redirect(path + v + nonhousing + 'complete')
    }
  })

  // Change total spent on nonhousing existing

  router.get(path + v + nonhousing + 'change-value-existing', function (req, res) {
    req.session.data.nonhousingExistingChangeMode = true
    res.redirect(path + v + nonhousing + 'value-existing')
  })

  router.get(path + v + nonhousing + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalNonhousingAmount = parseInt(req.session.data.totalNonhousingNew) + parseInt(req.session.data.totalNonhousingExisting)
    req.session.data.totalNonhousingAmountFormatted = numberWithCommas(req.session.data.totalNonhousingAmount)
    res.redirect(path + v + nonhousing + 'check-your-answers')
  })

  // Nonhousing check your answers from change page
  router.get(path + v + nonhousing + 'change', function (req, res) {
    req.session.data.nonhousingChangeMode = true
    res.redirect(path + v + nonhousing + 'check-your-answers')
  })

  // Nonhousing check your answers page
  router.post(path + v + nonhousing + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.nonhousingComplete = true
    if (req.session.data.nonhousingChangeMode === true) {
      req.session.data.nonhousingChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    } else {
      // CTA redirects to 'hub' page
      res.redirect(path + v + 'hub')
    }
  })

  // **********************************************************************
  // ******* REVIEW TOTAL *******
  // **********************************************************************

  // GET formatted version of total
  router.get(path + v + totalAmount + 'complete', function (req, res) {
    req.session.data.totalAmount = req.session.data.totalHousingAmount + req.session.data.totalInfrastructureAmount + req.session.data.totalNonhousingAmount
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

  // **********************************************************************
  // ******* COMPLETE JOURNEY *******
  // **********************************************************************

  router.get(path + v + 'complete', function (req, res) {
    res.redirect(path + v + 'confirmation')
  })
}