const dotenv = require("dotenv");
dotenv.config();

// console.log({
//     status: process.env.STATUS,
//     port: process.env.PORT || 3001,
//     dbUri: process.env.URI,
//     localdbUri: process.env.LOCAL_URI,
// });

module.exports = {
    status: process.env.STATUS,
    // port:
    //     process.env.STATUS === "production"
    //         ? (PORT = process.env.PROD_PORT)
    //         : (PORT = process.env.DEV_PORT),
    port: process.env.PORT || 3001,
    dbUri: process.env.URI,
    localdbUri: process.env.LOCAL_URI,
};
