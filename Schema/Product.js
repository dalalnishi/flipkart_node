const Sequelize = require('sequelize');
const { db } = require('../db.js');

const Brand = require('../Schema/Brand.js');

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
    bid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

ProductSchema.belongsTo(Brand, { foreignKey: 'bid' });
Brand.hasMany(ProductSchema, { foreignKey: 'bid' })

ProductSchema.sync({force: false})
    .then(() => {
        console.log('Product table created Successfully!');
    })
    .catch(err => {
        console.log('Error in creation of Product table: ', err);
    })

module.exports = ProductSchema;