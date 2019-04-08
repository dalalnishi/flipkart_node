const Category = require('../Schema/Category.js');
const SubcategorySchema = require('../Schema/Subcategory.js');
const BrandSchema = require('../Schema/Brand.js');

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
           isDelete: 0,
        },
        include: [{
            model: SubcategorySchema,
        
            include: [{
                model: BrandSchema               
            }]
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
