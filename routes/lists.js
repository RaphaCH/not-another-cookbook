const express = require('express');
const router = express.Router();


router.get('/listPreview', (req,res) => {
    res.render('listPreview');
})

module.exports = router;