var path = '/utilities-social-survey/'
var pathGet = 'utilities-social-survey/'
var v = 'v2/'

var guidance = 'guidance/'
var aboutYou = 'about-your-household/'
var reportingPeriod = 'reporting-period/'
var energyUtilities = 'energy-utilities/'
var entertainment = 'entertainment/'
var food = 'food/'
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
  router.get(path + v + 'start', function (req, res) {
    // Clears session data
    req.session.data = {}
    // CTA redirects to 'how to complete' page
    res.redirect(path + v + guidance + 'how-to-complete')
  })

  // **********************************************************************
  // ******* HUB PAGE *******
  // **********************************************************************
  router.post(path + v + 'hub', function (req, res) {
    if (req.session.data.aboutYouComplete !== true) {
      res.redirect(path + v + aboutYou + 'benefits-received')
    }
    if (req.session.data.energyUtilitiesComplete !== true) {
      res.redirect(path + v + energyUtilities + 'total-spent-on-gas')
    }
    if (req.session.data.entertainmentComplete !== true) {
      res.redirect(path + v + entertainment + 'total-spent-on-tv')
    }
    if (req.session.data.foodComplete !== true) {
      res.redirect(path + v + food + 'total-spent-on-takeaways')
    }
    if (req.session.data.totalAmountComplete !== true) {
      res.redirect(path + v + totalAmount + 'complete')
    } else {
      res.redirect(path + v + 'complete')
    }
  })

  // **********************************************************************
  // ******* GUIDANCE PAGE *******
  // **********************************************************************

  // How to complete guidance page
  router.post(path + v + guidance + 'how-to-complete', function (req, res) {
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // *************************************************** COMMENTED THIS SECTION OUT AS REDUNDANT ***************************************************

  // **********************************************************************
  // ******* REPORTING PERIOD SECTION *******
  // **********************************************************************
  //
  // // 'Are you able to report for the dates' question page
  // router.post(path + v + reportingPeriod + 'are-you-able-to-report', function (req, res) {
  //   // If user answers yes to 'able to report' question
  //   if (req.session.data.ableToReport === 'yes') {
  //     // Clear session flag for custom dates
  //     req.session.data.customDates = null
  //     // Clear custom dates if already set previously
  //     req.session.data.whatDateFromDay = null
  //     req.session.data.whatDateFromMonth = null
  //     req.session.data.whatDateFromMonthText = null
  //     req.session.data.whatDateFromYear = null
  //     req.session.data.whatDateToDay = null
  //     req.session.data.whatDateToMonth = null
  //     req.session.data.whatDateToMonthText = null
  //     req.session.data.whatDateToYear = null
  //     // CTA redirects to the reporting period CYA page
  //     res.redirect(path + v + reportingPeriod + 'check-your-answers')
  //   }
  //   // If user answers no to 'able to report' question
  //   if (req.session.data.ableToReport === 'no') {
  //     // CTA redirects to the 'what dates can you report for' question page
  //     res.redirect(path + v + reportingPeriod + 'what-dates-will-you-be-reporting-for')
  //   }
  // })
  //
  // // 'What dates will you be reporting for?' question page
  // router.post(path + v + reportingPeriod + 'what-dates-will-you-be-reporting-for', function (req, res) {
  //   // Set session flag for custom dates
  //   req.session.data.customDates = true
  //
  //   // Convert month number to text string for the date from
  //   req.session.data.whatDateFromMonthText = monthNumToName(req.session.data.whatDateFromMonth)
  //
  //   // Convert month number to text string for the date to
  //   req.session.data.whatDateToMonthText = monthNumToName(req.session.data.whatDateToMonth)
  //
  //   // CTA redirects to the reporting period CYA page
  //   res.redirect(path + v + reportingPeriod + 'check-your-answers')
  // })
  //
  // // Reporting period check your answers page
  // router.post(path + v + reportingPeriod + 'check-your-answers', function (req, res) {
  //   // Mark section as complete
  //   req.session.data.reportingPeriodComplete = true
  //   // CTA redirects to 'hub' page
  //   res.redirect(path + v + 'hub')
  // })
  // *************************************************** END COMMENTED OUT SECTION ***************************************************


  // Benefits received page
  router.post(path + v + aboutYou + 'benefits-received', function (req, res) {
    if (req.session.data.benefitChangeMode === true) {
      req.session.data.benefitChangeMode = false
      res.redirect(path + v + aboutYou + 'complete')
    } else {
      // CTA redirects to contact you page
      res.redirect(path + v + aboutYou + 'contact-you')
    }
  })

  // Change benefits page

  router.get(path + v + aboutYou + 'change-benefits', function (req, res) {
    req.session.data.benefitChangeMode = true
    res.redirect(path + v + aboutYou + 'benefits-received')
  })

  // Contact you page
  router.post(path + v + aboutYou + 'contact-you', function (req, res) {
    if (req.session.data.contactChangeMode === true) {
      req.session.data.contactChangeMode = false
      res.redirect(path + v + aboutYou + 'complete')
    } else {
      // CTA redirects to complete page
      res.redirect(path + v + aboutYou + 'complete')
    }
  })

  // Change contact you page
  router.get(path + v + aboutYou + 'change-contact-you', function (req, res) {
    req.session.data.benefitChangeMode = true
    res.redirect(path + v + aboutYou + 'contact-you')
  })

  // Complete about you
  router.get(path + v + aboutYou + 'complete', function (req, res) {
    // Mark section as complete
    req.session.data.aboutYouComplete = true
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* ENERGY UTILITIES *******
  // **********************************************************************

  // Total spent on gas page
  router.post(path + v + energyUtilities + 'total-spent-on-gas', function (req, res) {
    req.session.data.totalGasSpendFormatted = numberWithCommas(req.session.data.totalGasSpend)
    if (req.session.data.gasChangeMode === true) {
      req.session.data.gasChangeMode = false
      res.redirect(path + v + energyUtilities + 'complete')
    } else {
      // CTA redirects to water spend page
      res.redirect(path + v + energyUtilities + 'total-spent-on-water')
    }
  })

  // Change total spent on gas

  router.get(path + v + energyUtilities + 'change-gas', function (req, res) {
    req.session.data.gasChangeMode = true
    res.redirect(path + v + energyUtilities + 'total-spent-on-gas')
  })

  // Total spent on water page
  router.post(path + v + energyUtilities + 'total-spent-on-water', function (req, res) {
    req.session.data.totalWaterSpendFormatted = numberWithCommas(req.session.data.totalWaterSpend)
    if (req.session.data.waterChangeMode === true) {
      req.session.data.waterChangeMode = false
      res.redirect(path + v + energyUtilities + 'complete')
    } else {
      // CTA redirects to electricity spend page
      res.redirect(path + v + energyUtilities + 'total-spent-on-electricity')
    }
  })

  // Change total spent on water
  router.get(path + v + energyUtilities + 'change-water', function (req, res) {
    req.session.data.waterChangeMode = true
    res.redirect(path + v + energyUtilities + 'total-spent-on-water')
  })

  // Total spent on electricity page
  router.post(path + v + energyUtilities + 'total-spent-on-electricity', function (req, res) {
    req.session.data.totalElectricitySpendFormatted = numberWithCommas(req.session.data.totalElectricitySpend)
    if (req.session.data.electricityChangeMode === true) {
      req.session.data.electricityChangeMode = false
      res.redirect(path + v + energyUtilities + 'complete')
    } else {
      // CTA redirects to check your answers page
      res.redirect(path + v + energyUtilities + 'complete')
    }
  })

  // Change total spent on electricity
  router.get(path + v + energyUtilities + 'change-electricity', function (req, res) {
    req.session.data.electricityChangeMode = true
    res.redirect(path + v + energyUtilities + 'total-spent-on-electricity')
  })

  router.get(path + v + energyUtilities + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalEnergyUtilitiesAmount = parseInt(req.session.data.totalGasSpend) + parseInt(req.session.data.totalWaterSpend) + parseInt(req.session.data.totalElectricitySpend)
    req.session.data.totalEnergyUtilitiesAmountFormatted = numberWithCommas(req.session.data.totalEnergyUtilitiesAmount)
    res.redirect(path + v + energyUtilities + 'check-your-answers')
  })

  // Energy utilities check your answers from change page
  router.get(path + v + energyUtilities + 'change', function (req, res) {
    req.session.data.energyUtiltiesChangeMode = true
    res.redirect(path + v + energyUtilities + 'check-your-answers')
  })

  // Energy utilities check your answers page
  router.post(path + v + energyUtilities + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.energyUtilitiesComplete = true
    if (req.session.data.energyUtiltiesChangeMode === true) {
      req.session.data.energyUtiltiesChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    } else {
      // CTA redirects to 'hub' page
      res.redirect(path + v + 'hub')
    }
  })

  // **********************************************************************
  // ******* ENTERTAINMENT BILLS *******
  // **********************************************************************

  // Total spent on TV
  router.post(path + v + entertainment + 'total-spent-on-tv', function (req, res) {
    req.session.data.totalTVSpendFormatted = numberWithCommas(req.session.data.totalTVSpend)
    if (req.session.data.tvChangeMode === true) {
      req.session.data.tvChangeMode = false
      res.redirect(path + v + entertainment + 'complete')
    } else {
      // CTA redirects to 'broadband' page
      res.redirect(path + v + entertainment + 'total-spent-on-broadband')
    }
  })

  // Change total spent on TV

  router.get(path + v + entertainment + 'change-tv', function (req, res) {
    req.session.data.tvChangeMode = true
    res.redirect(path + v + entertainment + 'total-spent-on-tv')
  })

  // Total spent on broadband
  router.post(path + v + entertainment + 'total-spent-on-broadband', function (req, res) {
    req.session.data.totalBroadbandSpendFormatted = numberWithCommas(req.session.data.totalBroadbandSpend)
    if (req.session.data.broadbandChangeMode === true) {
      req.session.data.broadbandChangeMode = false
      res.redirect(path + v + entertainment + 'complete')
    } else {
      // CTA redirects to 'cinema' page
      res.redirect(path + v + entertainment + 'total-spent-on-cinema')
    }
  })

  // Change total spent on broadband

  router.get(path + v + entertainment + 'change-broadband', function (req, res) {
    req.session.data.broadbandChangeMode = true
    res.redirect(path + v + entertainment + 'total-spent-on-broadband')
  })

  // Total spent on cinema
  router.post(path + v + entertainment + 'total-spent-on-cinema', function (req, res) {
    req.session.data.totalCinemaSpendFormatted = numberWithCommas(req.session.data.totalCinemaSpend)
    if (req.session.data.cinemaChangeMode === true) {
      req.session.data.cinemaChangeMode = false
      res.redirect(path + v + entertainment + 'complete')
    } else {
      // CTA redirects to 'check your answers' page
      res.redirect(path + v + entertainment + 'complete')
    }
  })

  // Change total spent on cinema
  router.get(path + v + entertainment + 'change-cinema', function (req, res) {
    req.session.data.cinemaChangeMode = true
    res.redirect(path + v + entertainment + 'total-spent-on-cinema')
  })

  router.get(path + v + entertainment + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalEntertainmentAmount = parseInt(req.session.data.totalTVSpend) + parseInt(req.session.data.totalBroadbandSpend) + parseInt(req.session.data.totalCinemaSpend)
    req.session.data.totalEntertainmentAmountFormatted = numberWithCommas(req.session.data.totalEntertainmentAmount)
    res.redirect(path + v + entertainment + 'check-your-answers')
  })

  // Entertainment check your answers from change page
  router.get(path + v + entertainment + 'change', function (req, res) {
    req.session.data.entertainmentChangeMode = true
    res.redirect(path + v + entertainment + 'check-your-answers')
  })

  // Entertainment check your answers page
  router.post(path + v + entertainment + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.entertainmentComplete = true
    if (req.session.data.entertainmentChangeMode === true) {
      req.session.data.entertainmentChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    }
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* FOOD BILLS *******
  // **********************************************************************

  // Total spent on takeaways
  router.post(path + v + food + 'total-spent-on-takeaways', function (req, res) {
    req.session.data.totalTakeawaySpendFormatted = numberWithCommas(req.session.data.totalTakeawaySpend)
    if (req.session.data.takeawayChangeMode === true) {
      req.session.data.takeawayChangeMode = false
      res.redirect(path + v + food + 'complete')
    } else {
      // CTA redirects to 'weekly shop' page
      res.redirect(path + v + food + 'total-spent-on-weekly-shop')
    }
  })

  // Change total spent on takeaways
  router.get(path + v + food + 'change-takeaways', function (req, res) {
    req.session.data.takeawayChangeMode = true
    res.redirect(path + v + food + 'total-spent-on-takeaways')
  })

  // Total spent on weekly shop
  router.post(path + v + food + 'total-spent-on-weekly-shop', function (req, res) {
    req.session.data.totalWeeklyShopSpendFormatted = numberWithCommas(req.session.data.totalWeeklyShopSpend)
    if (req.session.data.weeklyShopChangeMode === true) {
      req.session.data.weeklyShopChangeMode = false
      res.redirect(path + v + food + 'complete')
    } else {
      // CTA redirects to 'eating out' page
      res.redirect(path + v + food + 'total-spent-on-eating-out')
    }
  })

  // Change total spent on weekly shop
  router.get(path + v + food + 'change-weekly-shop', function (req, res) {
    req.session.data.weeklyShopChangeMode = true
    res.redirect(path + v + food + 'total-spent-on-weekly-shop')
  })

  // Total spent on eating out
  router.post(path + v + food + 'total-spent-on-eating-out', function (req, res) {
    req.session.data.totalEatingOutSpendFormatted = numberWithCommas(req.session.data.totalEatingOutSpend)
    if (req.session.data.eatingOutChangeMode === true) {
      req.session.data.eatingOutChangeMode = false
      res.redirect(path + v + food + 'complete')
    } else {
      // CTA redirects to 'check your answers' page
      res.redirect(path + v + food + 'complete')
    }
  })

  // Change total spent on eating out
  router.get(path + v + food + 'change-eating-out', function (req, res) {
    req.session.data.eatingOutChangeMode = true
    res.redirect(path + v + food + 'total-spent-on-eating-out')
  })

  router.get(path + v + food + 'complete', function (req, res) {
    // Calculate total of section
    req.session.data.totalFoodAmount = parseInt(req.session.data.totalTakeawaySpend) + parseInt(req.session.data.totalWeeklyShopSpend) + parseInt(req.session.data.totalEatingOutSpend)
    req.session.data.totalFoodAmountFormatted = numberWithCommas(req.session.data.totalFoodAmount)
    res.redirect(path + v + food + 'check-your-answers')
  })

  // Food check your answers from change page
  router.get(path + v + food + 'change', function (req, res) {
    req.session.data.foodChangeMode = true
    res.redirect(path + v + food + 'check-your-answers')
  })

  // Food bills check your answers page
  router.post(path + v + food + 'check-your-answers', function (req, res) {
    // Mark section as complete
    req.session.data.foodComplete = true
    if (req.session.data.foodChangeMode === true) {
      req.session.data.foodChangeMode = false
      res.redirect(path + v + totalAmount + 'complete')
    }
    // CTA redirects to 'hub' page
    res.redirect(path + v + 'hub')
  })

  // **********************************************************************
  // ******* REVIEW TOTAL *******
  // **********************************************************************

  // GET formatted version of total
  router.get(path + v + totalAmount + 'complete', function (req, res) {
    req.session.data.totalAmount = req.session.data.totalEnergyUtilitiesAmount + req.session.data.totalEntertainmentAmount + req.session.data.totalFoodAmount
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
