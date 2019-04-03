const Brand = require('../Schema/Brand');

exports.addBrands = (body, done) => {
    Brand.create(body).then((doc) => {
        if(doc) {
            done(null, doc)
        }
    })
    .catch(err => {
        done(err);
    })
}