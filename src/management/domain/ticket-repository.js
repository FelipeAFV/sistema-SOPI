const { Manager } = require("./models")
const { User } = require("../../auth/domain/models");
const {Ticket} = require('./models');
const { Purchase } = require("../../purchases/domain/models");


const addTicket = async ({managerId, userId, title, content, date, purchaseId}) => {
    const newTicket = await Ticket.create({title:title, content:content,expirationDate:date,managerId:managerId, ticketStatusId:1,userId:userId, purchaseId:purchaseId});
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

const updateFromIdTicket = async (id, updateValues) => {
    try {
        const ticket = await getTicketFromId(id)
        await ticket.update(updateValues)
        return ticket
        
    } catch (error) {
        console.log(error)
        throw new Error('error al actualizar Ticket')
    }
    
}

const getAllTickets = async(condition, page ,perPage) => {
    const tickets = await Ticket.findAndCountAll({condition, offset: (page-1)*page, limit:perPage, distinct:true});

    return tickets;
}

const getTicketFromPurchase = async (purchaseId) => {
    return await Ticket.findAll({ where: { purchaseId }});
}

exports.updateFromIdTicket = updateFromIdTicket;
exports.getTicketFromId = getTicketFromId;
exports.addTicket = addTicket;
exports.getTicketsFromManagerId = getTicketsFromManagerId;
exports.getTicketsFromUserId = getTicketsFromUserId;
exports.getAllTickets = getAllTickets;
exports.getTicketFromPurchase = getTicketFromPurchase;