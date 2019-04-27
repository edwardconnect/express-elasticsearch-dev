// import mongoose from 'mongoose';
import { model } from 'mongoose';

export const Product = model('Product', {
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
