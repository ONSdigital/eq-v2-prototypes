var path = '/features/'
var pathGet = 'features/'
var v = 'looping/'
var collector = 'collector/'
var postcode = 'postcode/'
var freeText = 'free-text/'
var supermarket = 'supermarket/'
var country = 'countries-travelled-to/'
var calculatedSummaryEnergy = 'calculated-summary-along-others/'
var calculatedSummaryEnergyCheckboxes = 'calculated-summary-along-others-checkboxes/'
var calculatedSummaryLongList = 'long-list-calculated/'
var calculatedSummaryLongListV2 = 'long-list-calculated-v2/'

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

  router.get(path + v + collector + 'start', function (req, res) {
    req.session.data.loopingData = []
    res.redirect(path + v + collector + 'anything-to-add')
  })

  router.post(path + v + collector + 'anything-to-add', function (req, res) {
    res.redirect(path + v + collector + 'add-one')
  })

  router.post(path + v + collector + 'add-one', function (req, res) {
    res.redirect(path + v + collector + 'acq-val')
  })

  router.post(path + v + collector + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + collector + 'add-one')
    } else {
      req.session.data.loopingData.forEach((o, i) => o.id = i + 1);
      res.redirect(path + v + collector + 'collect')
    }
  })

  router.get(path + v + collector + 'collect', function (req, res) {
    req.session.data.loopingData.forEach(x => {
      if (!x.acquisition) {
        req.session.data.loopingDataId = x.id
        req.session.data.descriptionName = x.description
        req.session.data.descriptionNameLower = x.description.toLowerCase()
        res.redirect(path + v + collector + 'acq-val')
      }
    })
    res.redirect(path + v + collector + 'collect-2')
  })

  router.post(path + v + collector + 'acq-val', function (req, res) {
    res.redirect(path + v + collector + 'dis-val')
  })

  router.get(path + v + collector + 'collect-2', function (req, res) {
    req.session.data.loopingData.forEach(x => {
      if (!x.disposal) {
        req.session.data.loopingDataId = x.id
        req.session.data.descriptionName = x.description
        req.session.data.descriptionNameLower = x.description.toLowerCase()
        req.session.data.acquistion = x.acquistion
        res.redirect(path + v + collector + 'dis-val')
      }
    })
    res.redirect(path + v + collector + 'calculate-acq')
  })

  router.post(path + v + collector + 'dis-val', function (req, res) {
    req.session.data.loopingData.push({ description: req.session.data.description, acquisition: req.session.data.acquisition, disposal: req.session.data.disposal })
    res.redirect(path + v + collector + 'view-added')
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
    // req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    // req.session.data.loopingData.forEach((o, i) => o.id = i + 1);
    res.redirect(path + v + calculatedSummaryEnergy + 'add-value')
  })

  router.post(path + v + calculatedSummaryEnergy + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + calculatedSummaryEnergy + 'add-one')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + calculatedSummaryEnergy + 'calculate-exp')
    }
  })

  router.get(path + v + calculatedSummaryEnergy + 'collect', function (req, res) {
    req.session.data.loopingData.forEach(x => {
      if (!x.expenditure) {
        req.session.data.loopingDataId = x.id
        req.session.data.nameOfService = x.otherExpenditure
        req.session.data.nameOfExp = x.otherExpenditure.toLowerCase()
        res.redirect(path + v + calculatedSummaryEnergy + 'add-value')
      }
    })
    res.redirect(path + v + calculatedSummaryEnergy + 'calculate-exp')
  })

  router.post(path + v + calculatedSummaryEnergy + 'add-value', function (req, res) {
    // const numId = req.session.data.loopingDataId - 1
    // req.session.data.loopingData.splice(numId, 1, { otherExpenditure: req.session.data.nameOfService, expenditure: req.session.data.expenditure, id: req.session.data.loopingDataId })
    req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryEnergy + 'view-added')
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

  // calculated summary energy checkboxes

  router.get(path + v + calculatedSummaryEnergyCheckboxes + 'start', function (req, res) {
    req.session.data = {}
    req.session.data.loopingData = []
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'expenditure-on-electricity')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'expenditure-on-electricity', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'expenditure-on-gas-from-mains')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'expenditure-on-gas-from-mains', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'anything-to-add')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'anything-to-add', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'add-one')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'add-one', function (req, res) {
    if (req.session.data['otherExpenditure-0']) {
      req.session.data.loopingData.push({ otherExpenditure: req.session.data['otherExpenditure-0'] })
    }
    if (req.session.data['otherExpenditure-1']) {
      req.session.data.loopingData.push({ otherExpenditure: req.session.data['otherExpenditure-1'] })
    }
    if (req.session.data['otherExpenditure-2']) {
      req.session.data.loopingData.push({ otherExpenditure: req.session.data['otherExpenditure-2'] })
    }
    if (req.session.data['otherExpenditure-3']) {
      req.session.data.loopingData.push({ otherExpenditure: req.session.data['otherExpenditure-3'] })
    }
    req.session.data.loopingData.forEach((o, i) => o.id = i + 1);
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'collect')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'add-one')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'calculate-exp')
    }
  })

  router.get(path + v + calculatedSummaryEnergyCheckboxes + 'collect', function (req, res) {
    req.session.data.loopingData.forEach(x => {
      if (!x.expenditure) {
        req.session.data.loopingDataId = x.id
        req.session.data.nameOfService = x.otherExpenditure
        res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'add-value')
      }
    })
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'calculate-exp')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'add-value', function (req, res) {
    const numId = req.session.data.loopingDataId - 1
    req.session.data.loopingData.splice(numId, 1, { otherExpenditure: req.session.data.nameOfService, expenditure: req.session.data.expenditure, id: req.session.data.loopingDataId })
    // req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'collect')
  })

  router.get(path + v + calculatedSummaryEnergyCheckboxes + 'calculate-exp', function (req, res) {
    req.session.data.totalExp = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalExp += parseInt(x.expenditure)
    })
    req.session.data.totalOtherExpParsed = parseInt(req.session.data.totalExp, 10)
    req.session.data.gasParsed = parseInt(req.session.data.gas, 10)
    req.session.data.electricityParsed = parseInt(req.session.data.electricity, 10)
    req.session.data.totalExp = req.session.data.totalOtherExpParsed + req.session.data.electricityParsed + req.session.data.gasParsed
    req.session.data.totalExpParsed = numberWithCommas(req.session.data.totalExp)
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'value-of-expenditure')
  })

  router.post(path + v + calculatedSummaryEnergyCheckboxes + 'value-of-expenditure', function (req, res) {
    res.redirect(path + v + calculatedSummaryEnergyCheckboxes + 'done')
  })

  // calculated summary with a long list

  router.get(path + v + calculatedSummaryLongList + 'start', function (req, res) {
    req.session.data = {}
    req.session.data.loopingData = []
    res.redirect(path + v + calculatedSummaryLongList + 'expenditure-on-rental-and-leasing-services')
  })

  router.post(path + v + calculatedSummaryLongList + 'expenditure-on-rental-and-leasing-services', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongList + 'expenditure-on-construction-of-buildings')
  })

  router.post(path + v + calculatedSummaryLongList + 'expenditure-on-construction-of-buildings', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongList + 'anything-to-add')
  })

  router.post(path + v + calculatedSummaryLongList + 'anything-to-add', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongList + 'add-one')
  })

  router.post(path + v + calculatedSummaryLongList + 'add-one', function (req, res) {
    // req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryLongList + 'add-value')
  })

  router.post(path + v + calculatedSummaryLongList + 'add-value', function (req, res) {
    // const numId = req.session.data.loopingDataId - 1
    // req.session.data.loopingData.splice(numId, 1, {otherExpenditure: req.session.data.nameOfService, expenditure: req.session.data.expenditure, id: req.session.data.loopingDataId })
    req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryLongList + 'view-added')
  })

  router.post(path + v + calculatedSummaryLongList + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + calculatedSummaryLongList + 'add-one')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + calculatedSummaryLongList + 'calculate-exp')
    }
  })

  router.get(path + v + calculatedSummaryLongList + 'calculate-exp', function (req, res) {
    req.session.data.totalExp = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalExp += parseInt(x.expenditure)
    })
    req.session.data.totalOtherExpParsed = parseInt(req.session.data.totalExp, 10)
    req.session.data.rentParsed = parseInt(req.session.data.rent, 10)
    req.session.data.constructionParsed = parseInt(req.session.data.construction, 10)
    req.session.data.totalExp = req.session.data.totalOtherExpParsed + req.session.data.rentParsed + req.session.data.constructionParsed
    req.session.data.totalExpParsed = numberWithCommas(req.session.data.totalExp)
    res.redirect(path + v + calculatedSummaryLongList + 'value-of-expenditure')
  })

  router.post(path + v + calculatedSummaryLongList + 'value-of-expenditure', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongList + 'done')
  })

  // calculated summary with a long list v2

  router.get(path + v + calculatedSummaryLongListV2 + 'start', function (req, res) {
    req.session.data = {}
    req.session.data.loopingData = []
    res.redirect(path + v + calculatedSummaryLongListV2 + 'expenditure-on-rental-and-leasing-services')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'expenditure-on-rental-and-leasing-services', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongListV2 + 'expenditure-on-construction-of-buildings')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'expenditure-on-construction-of-buildings', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongListV2 + 'anything-to-add')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'anything-to-add', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongListV2 + 'add-one')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'add-one', function (req, res) {
    // req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure })
    // req.session.data.loopingData.forEach((o, i) => o.id = i + 1);
    res.redirect(path + v + calculatedSummaryLongListV2 + 'add-value')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'view-added', function (req, res) {
    if (req.session.data.addMore === 'yes') {
      res.redirect(path + v + calculatedSummaryLongListV2 + 'add-one')
    }
    if (req.session.data.addMore === 'no') {
      res.redirect(path + v + calculatedSummaryLongListV2 + 'calculate-exp')
    }
  })

  router.get(path + v + calculatedSummaryLongListV2 + 'collect', function (req, res) {
    req.session.data.loopingData.forEach(x => {
      if (!x.expenditure) {
        req.session.data.loopingDataId = x.id
        req.session.data.nameOfService = x.otherExpenditure
        req.session.data.nameOfExp = x.otherExpenditure.toLowerCase()
        res.redirect(path + v + calculatedSummaryLongListV2 + 'add-value')
      }
    })
    res.redirect(path + v + calculatedSummaryLongListV2 + 'calculate-exp')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'add-value', function (req, res) {
    // const numId = req.session.data.loopingDataId - 1
    // req.session.data.loopingData.splice(numId, 1, {otherExpenditure: req.session.data.nameOfService, expenditure: req.session.data.expenditure, id: req.session.data.loopingDataId })
    req.session.data.loopingData.push({ otherExpenditure: req.session.data.otherExpenditure, expenditure: req.session.data.expenditure })
    res.redirect(path + v + calculatedSummaryLongListV2 + 'view-added')
  })

  router.get(path + v + calculatedSummaryLongListV2 + 'calculate-exp', function (req, res) {
    req.session.data.totalExp = 0
    req.session.data.loopingData.forEach(x => {
      req.session.data.totalExp += parseInt(x.expenditure)
    })
    req.session.data.totalOtherExpParsed = parseInt(req.session.data.totalExp, 10)
    req.session.data.rentParsed = parseInt(req.session.data.rent, 10)
    req.session.data.constructionParsed = parseInt(req.session.data.construction, 10)
    req.session.data.totalExp = req.session.data.totalOtherExpParsed + req.session.data.rentParsed + req.session.data.constructionParsed
    req.session.data.totalExpParsed = numberWithCommas(req.session.data.totalExp)
    res.redirect(path + v + calculatedSummaryLongListV2 + 'value-of-expenditure')
  })

  router.post(path + v + calculatedSummaryLongListV2 + 'value-of-expenditure', function (req, res) {
    res.redirect(path + v + calculatedSummaryLongListV2 + 'done')
  })

}
