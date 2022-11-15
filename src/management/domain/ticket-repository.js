const { Manager } = require("./models")
const { User } = require("../../auth/domain/models");
const {Ticket} = require('./models');
const { Purchase } = require("../../purchases/domain/models");


const addTicket = async ({managerId, userId, title, content, date, purchaseId}) => {
    const newTicket = await Ticket.create({title:title, content:content, state:null,expirationDate:date,managerId:managerId, userId:userId, purchaseId:purchaseId});
    return newTicket
};

const getTicketsFromManagerId = async(id) => {
    const ticket = await Ticket.findAll({ where: {managerId: id}});

    return ticket;
}
const getTicketsFromUserId = async(id) => {
    const ticket = await Ticket.findAll({ where: {userId:id}, include: [Purchase]});

    return ticket;
}

const getTicketFromId = async (id) => {
    const ticket = await Ticket.findOne({ where: {id:id}})

    return ticket;
};

const getAllTickets = async(condition, page ,perPage) => {
    const tickets = await Ticket.findAndCountAll({condition, offset: (page-1)*page, limit:perPage, distinct:true});

    return tickets;
}

exports.getTicketFromId = getTicketFromId;
exports.addTicket = addTicket;
exports.getTicketsFromManagerId = getTicketsFromManagerId;
exports.getTicketsFromUserId = getTicketsFromUserId;
exports.getAllTickets = getAllTickets;