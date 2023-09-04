const mongoose = require("mongoose");
const { localdbUri, dbUri } = require("./config");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUri);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;

// run();

// async function run() {
//     try {
//         const user = await User.find({ name: "sammmy" });
//         console.log(user);

// const user = await User.create({
//     name: "sammy",
//     age: 30,
//     email: 8,
//     hobbies: ["running", "meditating"],
//     address: {
//         street: "Main st",
//     },
// });
// user.createdAt = 3;
// await user.save();

// const user = new User({ name: "sammy", age: 30 });
// await user.save();
// console.log(user);

// console.log(user);
//     } catch (e) {
//         console.log(e.message);
//     }
// }
