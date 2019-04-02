const Sequelize = require('sequelize');
const { db } = require('../db.js');

const CategorySchema = db.define('tbl_category', {
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isDelete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }    
});

CategorySchema.sync({force: false})
    .then((res) => {
        console.log('Category table created Successfully!');
    })
    .catch(err => {
        console.log('Error in creation of category table: ', err);
    })

module.exports = CategorySchema;