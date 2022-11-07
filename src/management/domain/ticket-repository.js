const { Manager } = require("./models")
const { User } = require("../../auth/domain/models");
const {Ticket} = require('./models')


const addTicket = async ({managerId, userId, title, content, date}) => {
    const newTicket = await Ticket.create({title:title, content:content, state:null,expirationDate:date,managerId:managerId, userId:userId});
    return newTicket
}


exports.addTicket = addTicket