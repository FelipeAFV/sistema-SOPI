const { userRepository } = require('../../auth/domain/user-repository');
const {pagination} = require('../../share/utils/api-feature');
const {Op} = require("sequelize");
const { findOneManager, findAllManagers, findManager, findOneManagerForPurchase, findManagerPurchase } = require('../domain/manager-repository');
const {addTicket, getTicketFromManagerId, getTicketsFromManagerId, getTicketFromId, getAllTickets} = require('../domain/ticket-repository');
const { findAllPermissionsFromUserAndProfile } = require('../../auth/domain/permission-repository');


const createTicket = async (ticketData) => {
    try {


        const manager = await findOneManagerForPurchase({creatorId:ticketData.creator, purchaseId:ticketData.purchaseId})
        if(!manager) {
            throw new Error('manager no asignado a proceso de compra seleccionado')
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
 
const getTicketsFromPurchaseId = async(query, userId, profileId) => {
    
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
    //console.log(userId, profileId);
    const permissions = await findAllPermissionsFromUserAndProfile(userId,profileId)
    //console.log(permissions);
    const auth = permissions.find(a => a.name == 'TICKET_VER')
    //console.log(userId);
    const test = await findManagerPurchase(userId)
    const managerIds = [];
    if(test) {
        test.forEach(e => {
            managerIds.push(e.id)
        })
    }
    console.log(count);
    
    if(auth){
        const ticketsFiltered = pagination({
            data: rows,
            count,
            page,
            perPage
        })
    
        return ticketsFiltered;
    }else{
        //console.log('adsdasds');
        const newRows = rows.filter(a => {
            if(a.userId == userId || managerIds.find(i => i == a.managerId)){
                return true;
            }
            return false;
        })
        const ticketsFiltered = pagination({
            data: newRows,
            count: newRows.length,
            page,
            perPage
        })

        return ticketsFiltered
    }

    


    


}


const findTicketFromTicketId = async(ticketId) => {
    

    try {
        
        const ticket = await getTicketFromId(ticketId)
        return ticket; 

    } catch (error) {
        throw new Error("Error en ticket service",error.message);
    }
}

const updateTicketFromId = async (ticket, content) => {
    
    const plastic = {title:content.title}
    ticket.update(plastic)
    return ticket;
}


exports.updateTicketFromId = updateTicketFromId;
exports.findTicketFromTicketId = findTicketFromTicketId;
exports.createTicket = createTicket;
exports.getTicketsFromPurchaseId = getTicketsFromPurchaseId;