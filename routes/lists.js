const express = require('express');
const router = express.Router();


router.get('/listPreview', (req,res) => {
    res.render('listPreview');
})

router.get('/list', (req,res) => {
    res.render('list');
})

module.exports = router;