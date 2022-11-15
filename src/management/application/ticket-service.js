const { userRepository } = require('../../auth/domain/user-repository');
const {pagination} = require('../../share/utils/api-feature');
const {Op} = require("sequelize");
const { findOneManager, findAllManagers } = require('../domain/manager-repository');
const {addTicket, getTicketFromManagerId, getTicketsFromManagerId, getTicketFromId, getAllTickets} = require('../domain/ticket-repository')


const createTicket = async (ticketData) => {
    try {
        const manager = await findOneManager(ticketData.managerId)
        if(!manager) {
            throw new Error('manager no existe')
        } else {
            const user = await userRepository.findUserById(ticketData.userId)
            
            if(!user) {
                throw new Error('usuario no existe')
            } else {
                if(!ticketData.title || !ticketData.content || !ticketData.date){
                    throw new Error('ticket con campos faltantes')
                }else {
                    const ticket = await addTicket(ticketData)
                    return ticket
                }
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
};
 
const getTicketsFromPurchaseId = async(query) => {
    
    const where = {};
    const {compraId} = query;
    const page = query.page ? parseInt(query.page) : 1;
    const perPage = query.per_page ? parseInt(query.per_page) : 1;

    //Filtros
    if(compraId) where.purchaseId = {[Op.eq]:`%${compraId}`}
    //if... or switch
    const {count, rows} = await getAllTickets(where, page, perPage); 
    if(count <= 0) {
        throw new Error('No hay tickets con id:'+ compraId)
    }

    const ticketsFiltered = pagination({
        data: rows,
        count,
        page,
        perPage
    })

    return ticketsFiltered;


}


const findTicketFromTicketId = async(ticketId) => {
    

    try {
        
        const ticket = await getTicketFromId(ticketId)
        return ticket; 

    } catch (error) {
        throw new Error("Error en ticket service",error.message);
    }
}

exports.findTicketFromTicketId = findTicketFromTicketId;
exports.createTicket = createTicket;
exports.getTicketsFromPurchaseId = getTicketsFromPurchaseId;