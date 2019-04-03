const Sequelize = require('sequelize');
const { db } = require('../db.js');

const Subcategory = require('../Schema/Subcategory');

const BrandSchema = db.define('tbl_brand', {
    brand_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    brand_name: {
        type: Sequelize.STRING,
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

BrandSchema.belongsTo(Subcategory, { foreignKey: 'subcat_id' });
Subcategory.hasMany(BrandSchema, { foreignKey: 'subcat_id' });

BrandSchema.sync({force: false})
    .then(() => {
        console.log('Brand table created Successfully!');
    })
    .catch(err => {
        console.log('Error in creation of Brand table: ', err);
    })

module.exports = BrandSchema;