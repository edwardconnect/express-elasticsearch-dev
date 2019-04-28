const { Client } = require('@elastic/elasticsearch')
export const esClient = new Client({ node: 'http://elasticsearch-service:9200', requestTimeout: 20000 })

export const connectElasticsearch = () => {
    esClient.ping({
        requestTimeout: 30000,
    }, (error) => {
        if (error) {
            console.error('Elasticsearch cluster is down!');
        } else {
            console.log('Elasticsearch is up.')
        }
    });
}

const indexNames = ['product'];

const createIndex = async (indexName) => {
    return esClient.indices.create({
        index: indexName
    });
}

const isIndexExist = async(indexName) => {
    console.log('Is indicies exist')
    return esClient.indices.exists({
        index: indexName
    });
}

export const initialiseIndices = async () => {
    for (let indexName of indexNames) {
        try {
            const isExistIndexName = await isIndexExist(indexName);
            if (isExistIndexName.body === false) {
                await createIndex(indexName);
                console.log(`Index ${indexName} is sucessfully created`);
            } else {
                console.log(`Index ${indexName} has been created before`);
            }
        } catch (error) {
            console.error(`Fail to create index ${indexName}`);
            console.error(error)
        }
    }
    // indexNames.forEach(indexName => {
    //     try {
    //         const isExistIndexName = await isIndexExist(indexName);
    //         if (isExistIndexName.body === false) {
    //             await createIndex(indexName);
    //             console.log(`Index ${indexName} is sucessfully created`);
    //         } else {
    //             console.log(`Index ${indexName} has been created before`);
    //         }
    //     } catch (error) {
    //         console.error(`Fail to create index ${indexName}`);
    //         console.error(error)
    //     }
    // })
}

// export const initialiseProductIndex = async () => {
//     console.log('Initialising product index')
//     try {
//         console.log('Trying init indicies')
//         const result = await isIndicesExist();

//         if (result.body === false) {
//             await createProductIndex();
//         }
//     } catch (error) {
//         console.log('Error!', error);
//         return;
//     }
// }

// export const saveProduct = async (product) => {
//     return esClient.index({
//         index: 'product',
//         body: {
//             properties: {
//                 name: product.name,
//                 description: product.description,
//                 tags: product.tags,
//                 _id: product._id
//             }
//         }
//     })
// }