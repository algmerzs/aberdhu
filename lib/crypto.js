const bcrypt = require("bcryptjs");

const crypto = {};

crypto.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

crypto.matchPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
}

module.exports = crypto;