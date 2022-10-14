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
    { tableName: 'usuarios' , updatedAt: 'ultima_actualizacion', createdAt: 'creacion'});


const Profile = sequelize.define('profile', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
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
        tableName: 'accesos',
        timestamps: false
    })

const Permission = sequelize.define('permission', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
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
        tableName: 'permisos',
        timestamps: false
    })

Permission.loadAssociations = () => {
    Permission.belongsToMany(Profile, {through: Access, foreignKey: {field: 'permiso_id', name: 'permissionId'}})
}

Access.loadAssociations = () => {
    
}

User.loadAssociations = () => {

    User.belongsTo(Profile, { foreignKey: { field: 'perfil_id'}});

    const { Ticket, Manager } = require("../../management/domain/models");
    User.hasMany(Ticket, { foreignKey: {field: 'responsable_id'}});
    User.hasMany(Manager, { foreignKey: {field: 'usuario_id'}});

    const { Sopi, SopiLog } = require("../../solicitude/domain/models");
    User.hasMany(Sopi, { foreignKey: { field: 'usuario_id'}});
    User.hasMany(SopiLog, { foreignKey: {allowNull: false, field: 'usuario_id'}});
}

Profile.loadAssociations = () => {
    Profile.hasMany(User, { foreignKey: { field: 'perfil_id'}});
    Profile.belongsToMany(Permission, { through: Access, foreignKey: {field: 'perfil_id', name: 'profileId'}});
}



exports.User = User;
exports.Profile = Profile;
exports.Access = Access;
exports.Permission = Permission;

