import express from 'express';
import mongooseClient from '../src/db/mongoose';
import { Product } from '../src/model/product-model';
import { ProductSearchRepository } from "../src/db/elasticsearch-repository/product-search-repository";

const router = express.Router();
const productSearchRepository = new ProductSearchRepository();

/**
 * POST /product - Create product
 */
router.post('/', async (req, res, next) => {
    console.log('REST request to create product')
    console.log(JSON.stringify(req.body), undefined, 2);

    const product = new Product(req.body);
    try {
        const mongoResult = await product.save();
        await productSearchRepository.addProductDocument(mongoResult);

        res.send(mongoResult).statusCode(201);
    } catch(error) {
        res.status(400).send(error);
    }
})

/**
 * GET /product/elasticsearch - Search products by query string
 */
router.get('/', async (req, res, next) => {
    console.log('REST request to get product');
    const queryString = req.query.queryString;

    // if (queryString === undefined) {
    //     next('Request param "name" not found');
    // } 

    try {
        let result;
        if (queryString) {
            result = await productSearchRepository.findProductByName(queryString);
        } else {
            result = await productSearchRepository.findAllProducts();
        }
        res.send(result.body.hits.hits);
    } catch(error) {
        res.status(400).send(error);
    }
})

// router.get('/', (req, res, next) => {
//     console.log('REST request to get product');
//     Product.find({}).then(products => {
//         res.send(products);
//     }).catch(error => console.log('Error', error));
// })

module.exports = router