const { Usuario } = require("../models/models")

const findUserByUsernameSequelMySQL = async (username) => {
    const user = await Usuario.findOne({
        where: {
            usuario: username
        }
    })
    /**Retorna nulo si no existe */
    return user;
}

module.exports = {
    findUserByUsername: findUserByUsernameSequelMySQL,
}