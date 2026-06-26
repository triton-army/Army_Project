const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

function getUsers() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }

    return JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );
}

function saveUsers(users) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 4)
    );
}

module.exports = {
    getUsers,
    saveUsers
};