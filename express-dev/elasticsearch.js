const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://172.24.0.2:9200', requestTimeout: 20000 })

client.search({
    index: 'blog'
}, (err, result) => {
    if (err) 
        console.error(err)
    console.log(result)
});

// client.indices.create({
//     index: 'blog'
// }, (err, res, next) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(res)
//     }
// })