const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
.then(async () => {
    console.log("connected to DB");
    await initDB();
    mongoose.connection.close();
})
.catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a2fbc8fee0f8a8d19f94c78",
    }));

    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
};