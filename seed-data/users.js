const bcrypt = require('bcrypt');
require('dotenv').config();

const users = [
    {
        id: 1,
        name: "Nester Brookfield",
        email: "nbrookfield0@feedburner.com",
        password: "password"
    },
    {
        id: 2,
        name: "Esme Ayscough",
        email: "eayscough1@pagesperso-orange.fr",
        password: "password"
    },
    {
        id: 3,
        name: "Danni McOnie",
        email: "dmconie2@netscape.com",
        password: "password"
    },
    {
        id: 4,
        name: "Horatia Dalyiel",
        email: "hdalyiel3@fc2.com",
        password: "password"
    },
    {
        id: 5,
        name: "Mohandis Nibley",
        email: "mnibley4@marketwatch.com",
        password: "password"
    },
];

module.exports = users.map((user) => {
    return {
        ...user,
        password: bcrypt.hashSync(user.password, Number(process.env.SALT_ROUNDS))
    }
})