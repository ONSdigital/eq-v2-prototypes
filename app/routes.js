const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Monthly business survey - construction and allied trades
require('./routes/monthly-business-survey-construction-and-allied-trades/v1.js')(router);

// Utilities social survey
require('./routes/utilities-social-survey/v1.js')(router);

module.exports = router
