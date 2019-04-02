const Category = require('../Schema/Category.js');
const SubcategorySchema = require('../Schema/Subcategory.js');

exports.addCategory = (body, done) => {
    
    Category.create(body).then((doc) => {
        if(doc) {
            done(null, doc);
        }
    })
    .catch(err => {
        done(err);
    })
}

exports.getCategories = (done) => {

    Category.findAll({
        where: {
           isDelete: 0
        },
        include: [{
            model: SubcategorySchema
        }]
    }).then((doc) => {
        if(doc) {
            done(null, doc);
        }
    })
    .catch(err => {
        done(err);
    })
}