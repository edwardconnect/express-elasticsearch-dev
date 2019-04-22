import mongoose from 'mongoose';

const Product = mongoose.model('Product', {
    name: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    }
})

module.exports = Product;