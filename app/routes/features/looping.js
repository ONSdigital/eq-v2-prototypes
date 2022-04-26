var path = '/features/'
var pathGet = 'features/'
var v = 'looping/'
var collector = 'collector/'
var postcode = 'postcode/'
var freeText = 'free-text/'

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
}
