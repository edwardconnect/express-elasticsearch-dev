import express from 'express';
import mongooseClient from '../src/db/mongoose';
import { Product } from '../src/model/product-model';
import { ProductSearchRepository } from "../src/db/elasticsearch-repository/product-search-repository";

const router = express.Router();
const productSearchRepository = new ProductSearchRepository();

router.post('/', async (req, res, next) => {
    console.log('REST request to create product')
    console.log(JSON.stringify(req.body), undefined, 2);

    const product = new Product(req.body);
    try {
        const mongoResult = await product.save();
        const elasticResult = await productSearchRepository.addProductDocument(mongoResult);
        res.send(mongoResult);
    } catch(error) {
        next(error);
    }
})

router.get('/elasticsearch', (req, res, next) => {
    console.log('REST request to get product');
    const queryName = req.query.name;

    if (queryName === undefined) {
        next('Request param "name" not found');
    } 

    try {
        const result = await productSearchRepository.findProductByName(queryName);
        res.send(result);
    } catch(error) {
        next(error)
    }
})

// router.post('/', async (req, res, next) => {
//     const product = new Product(req.body);
//     try {
//         const mongoProduct = await product.save();
//         const elasticProduct = await saveProduct(mongoProduct);
//         res.send();
//     } catch (error) {
//         console.log('Error!', error)
//         next();
//     }
//     product.save()
//         .then((savedProduct) => {
//             console.log(savedProduct)
//             res.send(savedProduct)
//         })
//         .catch(error => {
//             console.log('Error', error)
//         })
// })


router.get('/', (req, res, next) => {
    console.log('REST request to get product');
    Product.find({}).then(products => {
        res.send(products);
    }).catch(error => console.log('Error', error));
})

module.exports = router