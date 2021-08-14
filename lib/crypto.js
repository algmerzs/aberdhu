// Inicialización módulo
const bcrypt = require("bcryptjs");

// objeto para exportar
const crypto = {};

// encriptar contraseña
crypto.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

// comparar contraseña
crypto.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
}

module.exports = crypto;