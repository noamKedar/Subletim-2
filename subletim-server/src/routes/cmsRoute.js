const express = require('express');
const router = express.Router();

router.get('/apartmentsStat', function (req, res, next) {
    console.log (global.cms.query('apartments'));
    res.json(global.cms.query('apartments'));
   });

module.exports = router;

