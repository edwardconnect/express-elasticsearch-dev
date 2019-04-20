const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://172.24.0.2:9200', requestTimeout: 20000 })

const tutoringCaseName = 'tutoring_case';

function checkIndicesExist() {
    return esClient.indices.exists({
        index: tutoringCaseName
    });
}

function initialiseElasticsearch() {
    checkIndicesExist()
        .then(res => {
            if (res.body === false) {
                createTutorialCaseIndex();
            } else {
                console.log('Index has been already created before.')
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function createTutorialCaseIndex() {
    esClient.indices.create({
        index: tutoringCaseName
    })
        .then(res => {
            console.log(res);
        })
        .catch(err =>{
            console.log('Fail to create index')
            console.error(err)
        });
}


initialiseElasticsearch();

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