import express from 'express';
import mongooseClient from '../src/db/mongoose';
import { Product } from '../src/model/product-model';
import { saveProduct, esClient } from '../src/db/elasticsearch'

const router = express.Router();

router.post('/', async (req, res, next) => {
    const product = new Product(req.body);
    try {
        const mongoProduct = await product.save();
        const elasticProduct = await saveProduct(mongoProduct);
        res.send();
    } catch (error) {
        console.log('Error!', error)
        next();
    }
    product.save()
        .then((savedProduct) => {
            console.log(savedProduct)
            res.send(savedProduct)
        })
        .catch(error => {
            console.log('Error', error)
        })
})

router.get('/elasticsearch', (req, res, next) => {
    console.log('REST request to search product');
    const queryString = req.query.queryString;
    const size = req.query.size
w
    const query = {
        query: {
            prefix: { name: queryString }
        }
    }

    esClient.search({
        index: 'product',
        q: 'name:Bo'
    }).then((result) => {
        console.log(result);
        res.send(result.body)
    }).catch(error => {
        console.log('Error',error);
        res.send();
    })

    // console.log(queryString)
    // console.log(size)
    // console.log(req.query)
    // res.send();
})

router.get('/', (req, res, next) => {
    console.log('REST request to get product');
    Product.find({}).then(products => {
        res.send(products);
    }).catch(error => console.log('Error', error));
})

module.exports = router