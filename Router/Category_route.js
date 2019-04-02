const { Router } = require('express');
const router = Router();

const { addCategory, getCategories } = require('../Controller/Category_cont');

router.post('/', (req, res, next) => {
    addCategory(req.body, (err, result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 201;
            res.json(result);
        }
    })
})

router.get('/all', (req, res, next) => {
    getCategories((err, result) => {
        if(err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 201;
            res.json(result);
        }
    })
})

module.exports = router;