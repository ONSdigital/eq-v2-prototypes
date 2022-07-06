var path = '/features/'
var pathGet = 'features/'
var v = 'pre-pop/'
var ashe = 'ashe/'
var barry = 'barry/'
var wilhelmina = 'wilhelmina/'

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
  router.get(path + v + ashe + 'start', function (req, res) {
    req.session.data = []
    res.redirect(path + v + ashe + 'employees')
  })

  router.post(path + v + ashe + 'hub', function (req, res) {
    if (req.session.data.barryComplete !== true) {
      res.redirect(path + v + ashe + barry + 'when')
    }
    if (req.session.data.wilhelminaComplete !== true) {
      res.redirect(path + v + ashe + wilhelmina + 'when')
    }
    else {
      res.redirect(path + v + ashe + 'index')
    }
  })

  router.post(path + v + ashe + 'employees', function (req, res) {
    res.redirect(path + v + ashe + 'hub')
  })

  // barry scott
  router.post(path + v + ashe + barry + 'was-employee-paid', function (req, res) {
    if (req.session.data.employeePaid === 'yes') {
      res.redirect(path + v + ashe + barry + 'when')
    }
    if (req.session.data.employeePaid === 'no') {
      // Do nothing
      res.render()
    }
  })

  router.post(path + v + ashe + barry + 'when', function (req, res) {
    res.redirect(path + v + ashe + barry + 'work-postcode')
  })

  router.post(path + v + ashe + barry + 'work-postcode', function (req, res) {
    res.redirect(path + v + ashe + barry + 'home-postcode')
  })

  router.post(path + v + ashe + barry + 'home-postcode', function (req, res) {
    res.redirect(path + v + ashe + barry + 'basic-pay')
  })

  router.post(path + v + ashe + barry + 'basic-pay', function (req, res) {
    res.redirect(path + v + ashe + barry + 'overtime-pay')
  })

  router.post(path + v + ashe + barry + 'overtime-pay', function (req, res) {
    res.redirect(path + v + ashe + barry + 'overtime-hours')
  })

  router.post(path + v + ashe + barry + 'overtime-hours', function (req, res) {
    req.session.data.barryComplete = true
    res.redirect(path + v + ashe + 'hub')
  })

  // wilhelmina

  router.post(path + v + ashe + wilhelmina + 'was-employee-paid', function (req, res) {
    if (req.session.data.employeePaid === 'yes') {
      res.redirect(path + v + ashe + wilhelmina + 'when')
    }
    if (req.session.data.employeePaid === 'no') {
      // Do nothing
      res.render()
    }
  })

  router.post(path + v + ashe + wilhelmina + 'when', function (req, res) {
    res.redirect(path + v + ashe + wilhelmina + 'work-postcode')
  })

  router.post(path + v + ashe + wilhelmina + 'work-postcode', function (req, res) {
    res.redirect(path + v + ashe + wilhelmina + 'home-postcode')
  })

  router.post(path + v + ashe + wilhelmina + 'home-postcode', function (req, res) {
    res.redirect(path + v + ashe + wilhelmina + 'basic-pay')
  })

  router.post(path + v + ashe + wilhelmina + 'basic-pay', function (req, res) {
    res.redirect(path + v + ashe + wilhelmina + 'overtime-pay')
  })

  router.post(path + v + ashe + wilhelmina + 'overtime-pay', function (req, res) {
    res.redirect(path + v + ashe + wilhelmina + 'overtime-hours')
  })

  router.post(path + v + ashe + wilhelmina + 'overtime-hours', function (req, res) {
    req.session.data.wilhelminaComplete = true
    res.redirect(path + v + ashe + 'hub')
  })

}
