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
    } catch (error) {
        console.log('Error', error)
        res.status(400).send(error);
    }
})

/**
 * PUT /product - Update product
 */
router.put('/', async (req, res, next) => {
    console.log('REST request to update product')

    const product = new Product(req.body);
    try {
        const mongoResult = await product.save();
        await productSearchRepository.addProductDocument(mongoResult);
        await productSearchRepository.refreshIndex();
        console.log(`Update product ${product.name} success`)
        res.status(200).send(mongoResult)
    } catch (error) {
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
    const pageable = {
        page: req.query.page,
        size: req.query.size
    }

    try {
        let result;
        if (queryString) {
            result = await productSearchRepository.searchProductMyQueryString(queryString, pageable);
        } else {
            result = await productSearchRepository.findAllProducts(pageable);
        }
        res.append('access-control-expose-headers', 'X-total-count')
            .header('X-total-count', result.body.hits.total.value)
            .send(result.body.hits.hits.map(item => item._source));
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router