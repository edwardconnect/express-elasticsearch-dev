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
        await productSearchRepository.refreshIndex();
        console.log('Save all success')
        res.status(201).send(mongoResult)
    } catch(error) {
        console.log('Error', error)
        res.status(400).send(error);
    }
})

/**
 * GET /product/elasticsearch - Search products by query string
 */
router.get('/', async (req, res, next) => {
    console.log('REST request to get product');
    const queryString = req.query.queryString;

    try {
        let result;
        if (queryString) {
            result = await productSearchRepository.findProductByName(queryString);
        } else {
            result = await productSearchRepository.findAllProducts();
        }
        console.log(result)
        res.send(result.body.hits.hits.map(item => item._source));
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router