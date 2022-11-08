const { userRepository } = require('../../auth/domain/user-repository');
const { findOneManager, findAllManagers } = require('../domain/manager-repository')
const {addTicket, getTicketFromManagerId, getTicketsFromManagerId} = require('../domain/ticket-repository')


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
 
const getTicketsFromPurchaseId = async(compraId) => {
    let ids = [];
    let m;
    var allTickets = [];

    try {
        const managers = await findAllManagers(compraId);
        m = JSON.parse(JSON.stringify(managers));
        m.map((e)=> {
            ids.push(e.id);
        });
        //Get tickets asociate to a purchase by manager id
        for (let i of ids) {
            var ticket = await getTicketsFromManagerId(i);
            if(ticket.length !== 0) {
                allTickets.push(ticket);
            } 
            
        }

        console.log(JSON.stringify(allTickets))
        
        return allTickets; 

    } catch (error) {
        throw new Error("Error en ticket service",error.message);
    }
}


exports.createTicket = createTicket;
exports.getTicketsFromPurchaseId = getTicketsFromPurchaseId;