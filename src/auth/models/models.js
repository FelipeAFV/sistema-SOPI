const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");



const Usuario = sequelize.define('usuario', {
    usuario: {
        type: DataTypes.STRING
    },
    contrasena: {
        type: DataTypes.STRING
    },
    fecha_expiracion: {
        type: DataTypes.DATE
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
},
    { tableName: 'usuarios' });


const Perfil = sequelize.define('perfil', {
    tipo: {
        type: DataTypes.STRING
    },
},
    {
        tableName: 'perfiles'
    })

const Acceso = sequelize.define('acceso', {

},
    {
        tableName: 'accesos'
    })

const Permiso = sequelize.define('permiso', {
    nombre: DataTypes.STRING,
    codigo: DataTypes.INTEGER
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

