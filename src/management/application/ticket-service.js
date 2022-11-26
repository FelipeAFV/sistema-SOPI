const { userRepository } = require('../../auth/domain/user-repository');
const {pagination} = require('../../share/utils/api-feature');
const {Op} = require("sequelize");
const { findOneManager, findAllManagers, findManager, findOneManagerForPurchase, findManagerPurchase, findManagersWithConditions, saveManager } = require('../domain/manager-repository');
const {addTicket, getTicketFromManagerId, getTicketsFromManagerId, getTicketFromId, getAllTickets, updateFromIdTicket} = require('../domain/ticket-repository');
const { findAllPermissionsFromUserAndProfile } = require('../../auth/domain/permission-repository');


const createTicket = async (ticketData, idUser, idProfile) => {
    try {

        //Verificar usuario
        const user = await userRepository.findUserById(ticketData.userId);
        if(!user) throw new Error('usuario no existe');

        //Verificar datos
        if(!ticketData.title || !ticketData.content || !ticketData.date || !ticketData.purchaseId) throw new Error('ticket con campos faltantes');

        //Verificar permisos
        const permissions = await findAllPermissionsFromUserAndProfile(idUser,idProfile);
        const auth = permissions.find(a => a.name == 'TICKET_CREAR');

        //Verificar si el usuario es gestor de la compra
        const existingManager = await findManager({managerId:idUser, purchaseId:ticketData.purchaseId});
        if(auth && !existingManager) {
            //Se crea manager en caso de no ser gestor y tener el permiso
            const newManager = await saveManager({userId: idUser, purchaseId: ticketData.purchaseId});
            console.log(newManager);
            const {id} = newManager;
            ticketData.managerId = id;
            const ticket = await addTicket(ticketData);
            return ticket
            
        } else if(auth && existingManager) {
            ticketData.managerId = existingManager.id;
            const ticket = await addTicket(ticketData);
            return ticket;
        } else {
            throw new Error('No tienes los permisos')
        }




        /* if(auth) {
            const user = await userRepository.findUserById(ticketData.userId);
            
            
            
            if(!user) {
                throw new Error('usuario no existe');
            } else {
                if(!ticketData.title || !ticketData.content || !ticketData.date || !ticketData.purchaseId){
                    throw new Error('ticket con campos faltantes')
                }else {
                    const ticket = await addTicket(ticketData)
                    return ticket
                }
            }

        }else {

            const manager = await findOneManagerForPurchase({creatorId:ticketData.creator, purchaseId:ticketData.purchaseId})
            if(!manager) {
                throw new Error('manager no asignado a proceso de compra seleccionado')
            } else {
                const user = await userRepository.findUserById(ticketData.userId)
            
                if(!user) {
                    throw new Error('usuario no existe')
                } else {
                    if(!ticketData.title || !ticketData.content || !ticketData.date || !ticketData.purchaseId){
                        throw new Error('ticket con campos faltantes')
                    }else {
                        const ticket = await addTicket(ticketData)
                        return ticket
                }
            }
        }
        } */
        
    } catch (error) {
        throw new Error(error.message)
    }
};
 
const getTicketsFromPurchaseId = async(query, userId, profileId) => {
    
    const where = {};
    console.log('Query perpage', query.per_page)
    const {compraId} = query;
    const page = query.page ? parseInt(query.page) : 1;
    const perPage = query.per_page ? parseInt(query.per_page) : 20;

    //Filtros
    if(compraId) where.purchaseId = {[Op.eq]:`%${compraId}`}
    //if... or switch
    const {count, rows} = await getAllTickets(where, page, perPage); 
    console.log(rows)
    if(count <= 0) {
        return [];
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
        console.log(rows)
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
        console.log(error)
        throw new Error("Error en ticket service",error.message);
    }
}

const updateTicketFromId = async (ticket, content) => {
    
    try {
        const newTicket = await updateFromIdTicket(ticket.id, content)
        //ticket.update(content)
        return newTicket;
    } catch (error) {
        throw new Error("Error al actualizar ticket",error.message);
    }
    
}


exports.updateTicketFromId = updateTicketFromId;
exports.findTicketFromTicketId = findTicketFromTicketId;
exports.createTicket = createTicket;
exports.getTicketsFromPurchaseId = getTicketsFromPurchaseId;