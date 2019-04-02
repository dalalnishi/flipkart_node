const Sequelize = require('sequelize');
const { db } = require('../db.js');
const category = require('./Category');

const SubcategorySchema = db.define('tbl_subcategory', {
    subcat_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    subcat_name: {
        type: Sequelize.STRING
    },
    cat_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.INTEGER,    
        defaultValue: 0
    }
});

SubcategorySchema.belongsTo(category, { foreignKey: 'cat_id' });
category.hasMany(SubcategorySchema, { foreignKey: 'cat_id' });

SubcategorySchema.sync({force: false})
    .then((res) => {
        console.log('Subcategory table created Successfully!!!');
    })
    .catch(err => {
        console.log('Error in creation of subcategory table: ', err);
    })

module.exports = SubcategorySchema;