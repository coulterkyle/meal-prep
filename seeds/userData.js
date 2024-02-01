const { User } = require('../models');

const userData = [
    {
        name: "Jimmy Clausen",
        email: "jimmy@clausen.net",
        password: "12345678"
    },
    {
        name: "Jake Delhomme",
        email: "jake@gmail.com",
        password: "12345678"
    },
    {
        name: "Dave Tepper",
        email: "dave@gmail.com",
        password: "1245678"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;