const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const jimp = require('jimp');

const { addProducts } = require('../Controller/Product_cont');

var storage = multer.diskStorage({
    destination: (req, file, cb)  => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    },
    size: {
        width: 100,
        height: 100
    }
});

var upload = multer({storage: storage}).array('product_img', 10);

router.post('/', upload, ( req, res, next ) => {

    var images = [];

    for(let image of req.files){
        images.push(image.filename);

        let imagePath = path.join(__dirname, '../Images/' + image.filename);
        let thumbnailImagePath = path.join(__dirname, '../Images/ThumbnailImages/' + image.filename);

        jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(60, 100) // resize (width, height)
                    .quality(100) // set JPEG quality
                    .write(thumbnailImagePath); // save
            })
            .catch(err => {
                console.error(err);
            });
        }

        req.body.product_img = JSON.stringify(images);

        addProducts( req.body, (err, result) => {
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