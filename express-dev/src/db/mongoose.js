import mongoose from 'mongoose';
mongoose.connect("mongodb://mongo-service:27017/express", {useNewUrlParser: true});

const mongooseClient = mongoose.connection;

module.exports = mongooseClient;