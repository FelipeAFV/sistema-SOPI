const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");



const User = sequelize.define('user', {
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


const Profile = sequelize.define('profile', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
},
    {
        tableName: 'perfiles',
        timestamps: false
    })

const Access = sequelize.define('access', {

},
    {
        tableName: 'accesos'
    })

const Permission = sequelize.define('permission', {
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

Permission.loadAssociations = () => {
    Permission.belongsToMany(Profile, {through: Access})
}

Access.loadAssociations = () => {
    
}

User.loadAssociations = () => {

    User.belongsTo(Profile);
}

Profile.loadAssociations = () => {
    Profile.hasMany(User);
    Profile.belongsToMany(Permission, { through: Access});
}



exports.User = User;
exports.Profile = Profile;
exports.Access = Access;
exports.Permission = Permission;

