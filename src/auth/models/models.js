const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");



const Usuario = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        field: 'usuario'
    },
    password: {
        type: DataTypes.STRING(500),
        field: 'contrasena'
    },
    expirationDate: {
        type: DataTypes.DATE,
        field: 'fecha_expiracion'
    },
    firstname: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    lastname: {
        type: DataTypes.STRING,
        field: 'apellido'
    },
    mail: {
        type: DataTypes.STRING,
        field: 'mail'
    },
},
    { tableName: 'usuarios' });


const Perfil = sequelize.define('profile', {
    type: {
        type: DataTypes.STRING,
        field: 'tipo'
    },
},
    {
        tableName: 'perfiles'
    })

const Acceso = sequelize.define('access', {

},
    {
        tableName: 'accesos'
    })

const Permiso = sequelize.define('permission', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    code: {
        type: DataTypes.INTEGER,
        field: 'codigo'
    }
},
    {
        tableName: 'permisos'
    })

Permiso.loadAssociations = () => {
    Permiso.belongsToMany(Perfil, {through: Acceso})
}

Acceso.loadAssociations = () => {
    
}

Usuario.loadAssociations = () => {

    Usuario.belongsTo(Perfil);
}

Perfil.loadAssociations = () => {
    Perfil.hasMany(Usuario);
    Perfil.belongsToMany(Permiso, { through: Acceso});
}



exports.Usuario = Usuario;
exports.Perfil = Perfil;
exports.Acceso = Acceso;
exports.Permiso = Permiso;

