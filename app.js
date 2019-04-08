const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var ImageDir = require('path').join(__dirname, '/Images');
app.use(express.static(ImageDir));

var ThumbDir = require('path').join(__dirname, '/Images/ThumbnailImages');
app.use(express.static(ThumbDir));

//Schemas
const Category = require('./Schema/Category.js');
const Subcategory = require('./Schema/Subcategory.js')
const Brand = require('./Schema/Brand.js');
const Product = require('./Schema/Product.js')

//Database file
const { db } = require('./db.js');

//Routes
const CategoryRoute = require('./Router/Category_route');
const SubcategoryRoute = require('./Router/Subcategory_route');
const BrandRoute = require('./Router/Brand_route');
const ProductRoute = require('./Router/Product_route');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/images', express.static(ImageDir));
app.use('/thumbimages', express.static(ThumbDir));

app.use('/category', CategoryRoute);
app.use('/subcat', SubcategoryRoute);
app.use('/brand', BrandRoute);
app.use('/product', ProductRoute);

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