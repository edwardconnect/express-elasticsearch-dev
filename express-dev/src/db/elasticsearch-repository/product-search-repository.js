import { esClient } from "../elasticsearch";

export class ProductSearchRepository {
    constructor() { }

    indexName = 'product'

    createProductIndex() {
        return esClient.indices.create({
            indexName
        });
    }

    addProductDocument(product) {
        return esClient.index({
            index: indexName,
            id: product.id,
            body: {
                "name": product.name,
                "description:": product.description,
                "tags": product.tags
            }
        })
    }

    findProductByName(name) {
        return esClient.search({
            index: indexName,
            body: {
                query: {
                    match: {
                        "name": name
                    }
                }
            }
        })
    }
}