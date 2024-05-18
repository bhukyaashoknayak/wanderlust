const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(() =>{
    console.log("connection to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"66403c4ae4b41068fdc913dd"}));
    await Listing.insertMany(initData.data);
    console.log("data saved in Database");
};

initDB();