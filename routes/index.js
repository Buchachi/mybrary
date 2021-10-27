const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})


//Exporting information from this file
module.exports = router;