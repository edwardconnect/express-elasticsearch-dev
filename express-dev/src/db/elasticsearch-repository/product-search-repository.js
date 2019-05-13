import { esClient } from "../elasticsearch";

export class ProductSearchRepository {
    constructor() {
        this.indexName = 'product';
    }

    addProductDocument(product) {
        return esClient.index({
            index: this.indexName,
            id: product.id,
            body: {
                "name": product.name,
                "description": product.description,
                "tags": product.tags
            }
        });
    }

    refreshIndex() {
        return esClient.indices.refresh({
            index: 'product'
        })
    }
    
    findProductByName(name) {
        return esClient.search({
            index: this.indexName,
            body: {
                query: {
                    match: {
                        "name": name
                    }
                }
            }
        });
    }

    searchProductMyQueryString(queryString) {
        return esClient.search({
            index: this.indexName,
            body: {
                
            }
        });
    }

    findAllProducts() {
        return esClient.search({
            index: this.indexName,
            filterPath : ['hits.hits._source', 'hits.total']
        });
    }
}