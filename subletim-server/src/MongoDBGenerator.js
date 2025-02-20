const mongoose = require("mongoose");
ObjectID = require('mongodb').ObjectID;


const user = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    phoneNumber: String,
    password: String,
    isAdmin:  {
        type: Boolean,
        default: false
    }
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
        if (err) throw err;
        console.log("Number of " + objectType + " documents inserted: " + res.insertedCount);
        db.close()
    });
}

const user1 = new UserModel({ _id : new ObjectID, firstName: "Shaked", lastName: "Rozenfarb", email: "shaked@gmail.com",
    userName: "shakroz", phoneNumber: "0502870099", password: "123456", isAdmin: true
});
const user2 = new UserModel({ _id : new ObjectID, firstName: "Michal", lastName: "Katzir", email: "michal@gmail.com",
    userName: "michalkat", phoneNumber: "0501122334", password: "123456", isAdmin: true
});
const user3 = new UserModel({ _id : new ObjectID, firstName: "Noam", lastName: "Kedar", email: "noam@gmail.com",
    userName: "noamked", phoneNumber: "0501234567", password: "123456", isAdmin: true
});
const user4 = new UserModel({ _id : new ObjectID, firstName: "testFirst", lastName: "testLast", email: "test1@gmail.com",
    userName: "testUN", phoneNumber: "0546372283", password: "123456", isAdmin: false
});
const user5 = new UserModel({ _id : new ObjectID, firstName: "testUser", lastName: "testUserLast", email: "test2@gmail.com",
    userName: "testUN2", phoneNumber: "0523465730", password: "123456", isAdmin: false
});
const Booking_user = new UserModel({ _id : ObjectID('5f18915a8b695c03f035bbbb'), firstName: "booking", lastName: "user", email: "booking@booking.com",
    userName: "booking", phoneNumber: "9723453499", password: "123456", isAdmin: true
});

const usersArr = [user1, user2, user3, user4, user5,Booking_user]
insertToDB("usersCollection", "users", usersArr);

const apartment1 = new ApartmentModel({_id : new ObjectID, apartmentName: "Great Apartment", city:"Tel Aviv", address: "Rotschild 1",
    owner: user1._id, roomNumber: 3
});
const apartment2 = new ApartmentModel({_id : new ObjectID, apartmentName: "Cool Apartment", city:"Eilat", address: "Rotschild 2",
    owner: user2._id, roomNumber: 4
});
const apartment3 = new ApartmentModel({_id : new ObjectID, apartmentName: "Beautiful Apartment", city:"Tel Aviv", address: "Rotschild 3",
    owner: user4._id, roomNumber: 5
});
const apartment4 = new ApartmentModel({_id : new ObjectID, apartmentName: "Amazing Apartment", city:"Jerusalem", address: "Rotschild 4",
    owner: user4._id, roomNumber: 3
});
const apartment5 = new ApartmentModel({_id : new ObjectID, apartmentName: "Cute Apartment", city:"Jerusalem", address: "Rotschild 5",
    owner: user4._id, roomNumber: 6
});


const apartmentsArr = [apartment1, apartment2, apartment3, apartment4, apartment5];
insertToDB("apartmentsCollection", "apartments", apartmentsArr);

const sublet1 = new SubletModel({_id : new ObjectID, subletName: "Best sublet", startDate: new Date("2020-08-02"),
    endDate: new Date("2020-08-07"), price: 6000, apartment: apartment1._id });
const sublet2 = new SubletModel({_id : new ObjectID, subletName: "Amazing sublet", startDate: new Date("2020-09-15"),
    endDate: new Date("2020-09-30"), price: 6500, apartment: apartment2._id});
const sublet3 = new SubletModel({_id : new ObjectID, subletName: "Best sublet", startDate: new Date("2020-10-01"),
    endDate: new Date("2020-10-10"), price: 5000, apartment: apartment3._id });
const sublet4 = new SubletModel({_id : new ObjectID, subletName: "Good sublet", startDate: new Date("2020-11-01"),
    endDate: new Date("2020-12-10"), price: 7000, apartment: apartment4._id });
const sublet5 = new SubletModel({_id : new ObjectID, subletName: "Very good sublet", startDate: new Date("2020-12-12"),
    endDate: new Date("2020-12-20"), price: 4000, apartment: apartment4._id });

const subletsArr = [sublet1, sublet2, sublet3, sublet4, sublet5]
insertToDB("subletimCollection", "subletim", subletsArr);
