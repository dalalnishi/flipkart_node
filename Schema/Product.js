const Sequelize = require('sequelize');
const { db } = require('../db.js');

const Category = require('../Schema/Category.js');
const Subcategory = require('../Schema/Subcategory.js');

const ProductSchema = db.define('tbl_product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product_desc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cat_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subcat_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

ProductSchema.belongsTo(Subcategory, { foreignKey: 'subcat_id' });
Subcategory.hasMany(ProductSchema, { foreignKey: 'subcat_id' })

ProductSchema.belongsTo(Category, { foreignKey: 'cat_id' });
Category.hasMany(ProductSchema, { foreignKey: 'cat_id' })

ProductSchema.sync({force: false})
    .then(() => {
        console.log('Product table created Successfully!');
    })
    .catch(err => {
        console.log('Error in creation of Product table: ', err);
    })

module.exports = ProductSchema;