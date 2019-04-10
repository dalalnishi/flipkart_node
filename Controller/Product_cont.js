const Product = require('../Schema/Product.js');

const Sequelize = require('sequelize');
const { db } = require('../db.js');

// Add Products
exports.addProducts = (body, done) => {
        
    Product.create(body).then((doc) => {
        if(doc) {
            done(null, doc);
        }
    })
    .catch(err => {
        done(err);
    })

};

// Brand wise Products
exports.getProductsByBid = (id, done) => {
    
    db.query("SELECT s.subcat_id, s.subcat_name, b.brand_id, b.brand_name, p.* FROM `tbl_products` as p, `tbl_brands` as b, `tbl_subcategories` as s WHERE p.bid =b.brand_id and b.subcat_id=s.subcat_id and s.isDelete='0' and b.isDelete='0' and p.isDelete='0' and p.bid="+ id, { type: Sequelize.QueryTypes.SELECT })
        .then((data) => {
            done(null, data)
        }).catch((err) => {
            done(err)
        })
};

// Subcategory wise Products
exports.getProductsBySid = (id, done) => {
    
    db.query("Select DISTINCT s.subcat_id, s.subcat_name, b.brand_id, b.brand_name, p.* from `tbl_subcategories` as s, `tbl_brands` as b, `tbl_products` as p where s.subcat_id = b.subcat_id and b.brand_id = p.bid and s.isDelete=0 and b.isDelete=0 and p.isDelete=0 and s.subcat_id="+ id +" GROUP BY b.brand_id" , { type: Sequelize.QueryTypes.SELECT })
        .then((data) => {
            done(null, data)
        }).catch((err) => {
            done(err)
        })
};

exports.getAllProducts = (done) => {

    db.query("SELECT s.subcat_id, s.subcat_name, b.brand_id, b.brand_name, p.product_id, p.product_name, p.product_img, p.product_price FROM `tbl_subcategories` as s, `tbl_brands` as b, `tbl_products` as p WHERE s.subcat_id = b.subcat_id and b.brand_id = p.bid group by b.brand_id", { type: Sequelize.QueryTypes.SELECT })
        .then((data) => {
            done(null, data);
        }).catch(err => {
            done(err);
        });
};

exports.getProductById = (id, done) => {

    db.query("select p.*, b.brand_id, b.brand_name from `tbl_products` as p, `tbl_brands` as b where product_id = "+id+" and p.bid = b.brand_id", { type: Sequelize.QueryTypes.SELECT })
    .then((doc) => {
        done(null, doc);
    }).catch(err => {
        done(err);
    }) 
}
