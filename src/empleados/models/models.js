const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Employee = sequelize.define('employee',{
    firstName: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'apellido'
    },
    phone: {
        type: DataTypes.STRING,
        field: 'telefono'
    },
    address: {
        type: DataTypes.STRING,
        field: 'dirección'
    },
    sex: {
        type: DataTypes.CHAR,
        field: 'sexo'
    },
    salary: {
        type: DataTypes.INTEGER,
        field: 'salario'
    },
    rut: {
        type: DataTypes.STRING,
        field: 'rut'
    }

}, {
    tableName: 'empleados'
});

const Department = sequelize.define('department',{
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    manager: {
        type: DataTypes.STRING,
        field: 'jefe_departamento'
    }

}, {
    tableName: 'areas'
});
const Job = sequelize.define('job',{
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
}, {
    tableName: 'cargos'
});

Employee.loadAssociations = () => {
    Employee.belongsTo(Department);
    Employee.belongsTo(Job);

    const { Ticket, Manager } = require("../../gestion/models/models");
    Employee.hasMany(Ticket);
    Employee.hasMany(Manager);

    const { Sopi } = require("../../solicitudes/models/models");
    Employee.hasMany(Sopi)
}

Job.loadAssociations = () => {
    Job.hasMany(Employee);
}

Department.loadAssociations = () => {
    Department.hasMany(Employee);
 
}

exports.Employee = Employee;
exports.Department = Department;
exports.Job = Job;