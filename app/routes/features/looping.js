var path = '/features/'
var v = 'looping/'
var collector = 'collector/'
var postcode = 'postcode/'

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
      res.redirect(path + v + 'index')
    }
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
      }
      else {
        res.redirect(path + v + postcode + 'percentages')
      }
    }
  })

  router.post(path + v + postcode + 'percentages', function (req, res) {
    res.redirect(path + v + postcode + 'done')
  })
}
