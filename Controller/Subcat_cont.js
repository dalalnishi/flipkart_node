const Subcategory = require('../Schema/Subcategory');

exports.addSubcategory = (body, done) => {
    Subcategory.create(body).then((doc) => {
        if(doc) {
            done(null, doc)
        }
    })
    .catch(err => {
        done(err);
    })
}