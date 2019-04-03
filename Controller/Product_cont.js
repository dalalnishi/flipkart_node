const Product = require('../Schema/Product.js');

exports.addProducts = (body, done) => {
        
    Product.create(body).then((doc) => {
        if(doc) {
            done(null, doc);
        }
    })
    .catch(err => {
        done(err);
    })

}