const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const Category = require('./Schema/Category.js');
const Subcategory = require('./Schema/Subcategory.js')
const Product = require('./Schema/Product.js')

const { db } = require('./db.js');

const CategoryRoute = require('./Router/Category_route');
const SubcategoryRoute = require('./Router/Subcategory_route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/category', CategoryRoute);
app.use('/subcat', SubcategoryRoute);

db.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully!');
    })
    .catch(err => {
        console.log('Database connection error: ', err);
    })

app.listen(5001, () => {
    console.log('Running on Port: ', 5001);
})