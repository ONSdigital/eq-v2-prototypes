var path = '/features/'
var pathGet = 'features/'
var v = 'thou-validation/'

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

  router.get(path + v + 'thou-start', function (req, res) {
    req.session.data.thouErrorFlag = null
    res.redirect(path + v + 'enter-in-thou')
  })

  router.post(path + v + 'enter-in-thou', function (req, res) {
    if (req.session.data.totalHousingPublic.includes('000')) {
      req.session.data.thouErrorFlag = null
      res.redirect(path + v + 'completed')
    }
    else {
      req.session.data.thouErrorFlag = true
      res.redirect(path + v + 'enter-in-thou')
    }
  })
}
