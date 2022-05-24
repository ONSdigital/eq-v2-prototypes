var path = '/features/'
var pathGet = 'features/'
var v = 'looping/'
var collector = 'collector/'
var postcode = 'postcode/'
var freeText = 'free-text/'
var supermarket = 'supermarket/'
var country = 'countries-travelled-to/'
var calculatedSummaryEnergy = 'calculated-summary-along-others/'

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
  // Collector for adding values

  router.post(path + v + collector + 'anything-to-add', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + collector + 'add-one')
  })

  router.post(path + v + collector + 'add-one', function (req, res) {
    req.session.data.loopingData.push({ description: req.session.data.description, acquisition: req.session.data.acquisition, disposal: req.session.data.disposal })
    res.redirect(path + v + collector + 'view-added')
  })

  router.post(path + v + collector + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + collector + 'add-one')
    } else {
      if (req.session.data.loopingData.length === 1) {
        res.redirect(path + v + collector + 'done')
      } else {
        res.redirect(path + v + collector + 'calculate-acq')
      }
    }
  })

  router.get(path + v + collector + 'calculate-acq', function (req, res) {
    req.session.data.totalAcq = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalAcq += parseInt(x.acquisition)
    })
    req.session.data.totalAcqParsed = parseInt(req.session.data.totalAcq, 10)
    req.session.data.valueOfAcquisitions = numberWithCommas(req.session.data.totalAcqParsed)
    res.redirect(path + v + collector + 'value-of-acquisitions')
  })

  router.post(path + v + collector + 'value-of-acquisitions', function (req, res) {
    res.redirect(path + v + collector + 'calculate-disps')
  })

  router.get(path + v + collector + 'calculate-disps', function (req, res) {
    req.session.data.totalDisp = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalDisp += parseInt(x.disposal)
    })
    req.session.data.totalDispParsed = parseInt(req.session.data.totalDisp, 10)
    req.session.data.valueOfDisposals = numberWithCommas(req.session.data.totalDispParsed)
    res.redirect(path + v + collector + 'value-of-disposals')
  })

  router.post(path + v + collector + 'value-of-disposals', function (req, res) {
    res.redirect(path + v + collector + 'done')
  })

  // Postcode

  router.get(path + v + postcode + 'start', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + postcode + 'add-postcodes')
  })

  router.post(path + v + postcode + 'add-postcodes', function (req, res) {
    req.session.data.loopingData.push({ postcode: req.session.data.postcode })
    res.redirect(path + v + postcode + 'view-postcodes')
  })

  router.post(path + v + postcode + 'view-postcodes', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + postcode + 'add-postcodes')
    }
    if (req.session.data.addMore === 'no') {
      if (req.session.data.loopingData.length === 1) {
        res.redirect(path + v + postcode + 'done')
      } else {
        res.redirect(path + v + postcode + 'percentages')
      }
    }
  })

  router.post(path + v + postcode + 'percentages', function (req, res) {
    if (req.session.data.error === 'true') {
      req.session.data.showValidation = true
      res.redirect(path + v + postcode + 'percentages')
    } else {
      req.session.data.showValidation = null
      req.session.data.error = null
      res.redirect(path + v + postcode + 'done')
    }
  })

  // Free texts

  router.post(path + v + freeText + 'anything-to-add', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + freeText + 'add-one')
  })

  router.post(path + v + freeText + 'add-one', function (req, res) {
    req.session.data.loopingData.push({ description: req.session.data.description, registration: req.session.data.registration, authorised: req.session.data.authorised })
    res.redirect(path + v + freeText + 'view-added')
  })

  router.post(path + v + freeText + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + freeText + 'add-one')
    } else {
      res.redirect(path + v + freeText + 'summary')
    }
  })

  router.post(path + v + freeText + 'summary', function (req, res) {
    res.redirect(path + v + freeText + 'done')
  })

  // 8 JUNE UR ITERATION

  // supermarket

  router.get(path + v + supermarket + 'start', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + supermarket + 'add-supermarkets')
  })

  router.post(path + v + supermarket + 'add-supermarkets', function (req, res) {
    req.session.data.loopingData.push({ supermarket: req.session.data.supermarket })
    res.redirect(path + v + supermarket + 'view-supermarkets')
  })

  router.post(path + v + supermarket + 'view-supermarkets', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + supermarket + 'add-supermarkets')
    }
    if (req.session.data.addMore === 'no') {
      if (req.session.data.loopingData.length === 1) {
        res.redirect(path + v + supermarket + 'done')
      } else {
        res.redirect(path + v + supermarket + 'percentages')
      }
    }
  })

  router.post(path + v + supermarket + 'percentages', function (req, res) {
    if (req.session.data.error === 'true') {
      req.session.data.showValidation = true
      res.redirect(path + v + supermarket + 'percentages')
    } else {
      req.session.data.showValidation = null
      req.session.data.error = null
      res.redirect(path + v + supermarket + 'done')
    }
  })

  // countrys

  router.get(path + v + country + 'start', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + country + 'anything-to-add')
  })

  router.post(path + v + country + 'anything-to-add', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + country + 'add-countrys')
  })

  router.post(path + v + country + 'add-countrys', function (req, res) {
    req.session.data.loopingData.push({ country: req.session.data.country })
    res.redirect(path + v + country + 'view-countrys')
  })

  router.post(path + v + country + 'view-countrys', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + country + 'add-countrys')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + country + 'done')
    }
  })

  // calculated summary energy

  router.get(path + v + calculatedSummaryEnergy + 'start', function (req, res) {
    req.session.data = {}
    req.session.data.loopingData = []
    res.redirect(path + v + calculatedSummaryEnergy + 'expenditure-on-electricity')
  })

  router.post(path + v + calculatedSummaryEnergy + 'expenditure-on-electricity', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergy + 'expenditure-on-gas-from-mains')
  })

  router.post(path + v + calculatedSummaryEnergy + 'expenditure-on-gas-from-mains', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergy + 'anything-to-add')
  })

  router.post(path + v + calculatedSummaryEnergy + 'anything-to-add', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergy + 'add-one')
  })

  router.post(path + v + calculatedSummaryEnergy + 'add-one', function (req, res) {
    req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryEnergy + 'view-added')
  })

  router.post(path + v + calculatedSummaryEnergy + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + calculatedSummaryEnergy + 'add-one')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + calculatedSummaryEnergy + 'calculate-exp')
    }
  })

  router.get(path + v + calculatedSummaryEnergy + 'calculate-exp', function (req, res) {
    req.session.data.totalExp = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalExp += parseInt(x.expenditure)
    })
    req.session.data.totalOtherExpParsed = parseInt(req.session.data.totalExp, 10)
    req.session.data.gasParsed = parseInt(req.session.data.gas, 10)
    req.session.data.electricityParsed = parseInt(req.session.data.electricity, 10)
    req.session.data.totalExp = req.session.data.totalOtherExpParsed + req.session.data.electricityParsed + req.session.data.gasParsed
    req.session.data.totalExpParsed = numberWithCommas(req.session.data.totalExp)
    res.redirect(path + v + calculatedSummaryEnergy + 'value-of-expenditure')
  })

  router.post(path + v + calculatedSummaryEnergy + 'value-of-expenditure', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergy + 'done')
  })
}
