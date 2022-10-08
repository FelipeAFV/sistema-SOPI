const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Employee = sequelize.define('employee',{
    employeeFirstName: {
        type: DataTypes.STRING,
        field: 'nombre_empleado'
    },
    employeeLastName: {
        type: DataTypes.STRING,
        field: 'apellido_empleado'
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
    }

}, {
    tableName: 'empleados'
});

const Department = sequelize.define('department',{
    departmentName: {
        type: DataTypes.STRING,
        field: 'nombre_departamento'
    },
    manager: {
        type: DataTypes.STRING,
        field: 'jefe_departamento'
    }

}, {
    tableName: 'areas'
});
const Job = sequelize.define('job',{
    jobName: {
        type: DataTypes.STRING,
        field: 'nombre_trabajo'
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