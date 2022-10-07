const { sequelize } = require("../../database/db-init");


const Employee = sequelize.define('employee',{
    
}, {
    tableName: 'empleados'
});

const Department = sequelize.define('department',{
    
}, {
    tableName: 'area'
});
const Job = sequelize.define('job',{
    
}, {
    tableName: 'cargo'
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