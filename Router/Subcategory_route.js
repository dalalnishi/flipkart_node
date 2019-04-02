const { Router } = require('express');
const router = Router();

const { addSubcategory } = require('../Controller/Subcat_cont');

router.post('/', ( req, res, next ) => {
    addSubcategory(req.body, (err, result) => {
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