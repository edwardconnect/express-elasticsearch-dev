const { Client } = require('@elastic/elasticsearch')
export const esClient = new Client({ node: 'http://elasticsearch-service:9200', requestTimeout: 20000 })
const createProductIndex = () => {
    return esClient.indices.create({
        index: 'product',
        body: {
            mappings: {
                properties: {
                    _id: {
                        type: "text"
                    },
                    name: {
                        type: "text",
                        input: document.title.split(" ")
                    },
                    description: {
                        type: "text"
                    },
                    tags: {
                        type: "text"
                    }
                }
            }
        }
    })
}

const isIndicesExist = () => {
    console.log('Is indicies exist')
    return esClient.indices.exists({
        index: 'product'
    });
}

export const initialiseProductIndex = async () => {
    console.log('Initialising product index')
    try {
        console.log('Trying init indicies')
        const result = await isIndicesExist();
        if (result.body === false) {
            await createProductIndex();
        }
    } catch (error) {
        console.log('Error!', error);
        return;
    }
}

export const saveProduct = async (product) => {
    return esClient.index({
        index: 'product',
        body: {
            properties: {
                name: product.name,
                description: product.description,
                tags: product.tags,
                _id: product._id
            }
        }
    })
}


// const tutoringCaseName = 'tutoring_case';

// function checkIndicesExist() {
//     return esClient.indices.exists({
//         index: tutoringCaseName
//     });
// }

// function initialiseElasticsearch() {
//     checkIndicesExist()
//         .then(res => {
//             if (res.body === false) {
//                 createTutorialCaseIndex();
//             } else {
//                 console.log('Index has been already created before.')
//             }
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

// function createTutorialCaseIndex() {
//     esClient.indices.create({
//         index: tutoringCaseName
//     })
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err =>{
//             console.log('Fail to create index')
//             console.error(err)
//         });
// }


// initialiseElasticsearch();

// esClient.search({
//     index: 'blog'
// }, (err, result) => {
//     if (err)
//         console.error(err)
//     console.log(result)
// });

// client.indices.create({
//     index: 'blog'
// }, (err, res, next) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(res)
//     }
// })