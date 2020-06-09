const mongodb = require('mongodb');
const mongoose = require('mongoose');
const mongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'subletimDB'

mongoClient.connect(connectionURL, function (err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);

    const userSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        userName: String,
    });

    const apartmentSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        apartmentName: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    const UserModel = mongoose.model('UserModel', userSchema);
    const Apartment = mongoose.model('Apartment', apartmentSchema);
});




