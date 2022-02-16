const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Summary of multiple summaries
require('./routes/summary-of-multiple-summaries/v1.js')(router);

module.exports = router
