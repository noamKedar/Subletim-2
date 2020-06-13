const mongoose = require("mongoose");
ObjectID = require('mongodb').ObjectID


const user = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    phoneNumber: String
});
module.exports = user;

const apartment = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    apartmentName: String,
    city: String,
    address: String,
    owner: {type: mongoose.Schema.Types.ObjectID, ref: 'user'} ,
    roomNumber: Number
});
module.exports = apartment;

const sublet = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    subletName: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    apartment: {type: mongoose.Schema.Types.ObjectID, ref: 'apartment'} ,
});
module.exports = sublet;

mongoose.connect("mongodb://localhost:27017/subletimDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Create Connection Successfully!");
});

const UserModel = mongoose.model("userModel",user , "usersCollection");
const ApartmentModel = mongoose.model("apartmentModel",apartment , "apartmentsCollection");
const SubletModel = mongoose.model("subletModel",sublet , "subletimCollection");

function insertToDB(collectionName, objectType, objectsArr) {
    db.collection(collectionName).insertMany(objectsArr, function(err, res) {
        console.log(objectsArr[0])
        if (err) throw err;
        console.log("Number of " + objectType + " documents inserted: " + res.insertedCount);
        db.close()
    });
}

const user1 = new UserModel({ _id : new ObjectID, firstName: "Shaked", lastName: "Rozenfarb", email: "shaked@gmail.com",
    userName: "shakroz", phoneNumber: "0502870099"
});
const user2 = new UserModel({ _id : new ObjectID, firstName: "Michal", lastName: "Katzir", email: "michal@gmail.com",
    userName: "michalkat", phoneNumber: "0501122334"
});
const user3 = new UserModel({ _id : new ObjectID, firstName: "Noam", lastName: "Kedar", email: "noam@gmail.com",
    userName: "noamked", phoneNumber: "0501234567"
});

const usersArr = [user1, user2, user3]
insertToDB("usersCollection", "users", usersArr);

const apartment1 = new ApartmentModel({_id : new ObjectID, apartmentName: "Great Apartment", city:"Tel Aviv", address: "Rotschild 1",
    owner: user1._id, roomNumber: 3
});
const apartment2 = new ApartmentModel({_id : new ObjectID, apartmentName: "Cool Apartment", city:"Eilat", address: "Rotschild 2",
    owner: user2._id, roomNumber: 4
});
const apartment3 = new ApartmentModel({_id : new ObjectID, apartmentName: "Beautiful Apartment", city:"Tel Aviv", address: "Rotschild 3",
    owner: user3._id, roomNumber: 5
});

const apartmentsArr = [apartment1, apartment2, apartment3]
insertToDB("apartmentsCollection", "apartments", apartmentsArr);

const sublet1 = new SubletModel({_id : new ObjectID, subletName: "Best sublet", startDate: Date("10/09/2020"),
    endDate: Date("10/10/2020"), price: 6000, apartment: apartment1._id });
const sublet2 = new SubletModel({_id : new ObjectID, subletName: "Amazing sublet", startDate: Date("1/09/2020"),
    endDate: Date("1/10/2020"), price: 6500, apartment: apartment2._id});
const sublet3 = new SubletModel({_id : new ObjectID, subletName: "Best sublet", startDate: Date("1/12/2020"),
    endDate: Date("25/12/2020"), price: 5000, apartment: apartment3._id });

const subletsArr = [sublet1, sublet2, sublet3]
insertToDB("subletimCollection", "subletim", subletsArr);

Console.log("Done!")