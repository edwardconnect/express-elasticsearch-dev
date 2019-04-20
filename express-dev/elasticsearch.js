const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200', requestTimeout: 20000 })

client.search({
    index: 'product'
}, (err, result) => {
    if (err) 
        console.error(err)
    console.log(result)
})

// client.indices.create({
//     index: 'blog'
// }, (err, res, next) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(res)
//     }
// })