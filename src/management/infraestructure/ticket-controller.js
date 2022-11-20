const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { createTicket, getTicketsFromPurchaseId, findTicketFromTicketId, updateTicketFromId } = require("../application/ticket-service");
const { findManagerPurchase } = require("../domain/manager-repository");
const { getTicketFromId } = require("../domain/ticket-repository");



const ticketCreation = async (req,res) => {
    try {
        const ticketData = req.body;
        const purchaseId = req.query.compraId;
        if(!ticketData || !purchaseId){
            throw new Error('campos faltantes')
        }else {
            ticketData.purchaseId = purchaseId;
            ticketData.creator = req.user.id;
            console.log(ticketData.purchaseId);
            const ticket = await createTicket(ticketData)
            sendHttpResponse(res,ticket,200)
        }
    } catch (error) {
        sendHttpResponse(res,error.message, 500)
    }
};

const getTickets = async (req,res) => {
    try {
        const tickets = await getTicketsFromPurchaseId(req.query, req.user.id, req.user.profileId);

        if(tickets.length !== 0) {
            sendHttpResponse(res, tickets, 200);
        } else {
            sendHttpResponse(res, 'Error', 500, 'No existen tickets asociados a la compra con id: '+ compraId);
        }
        
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al obtener tickets, controlador');
    }
}

const getTicket = async (req,res) => {
    const {ticketId} = req.params;


    try {
        
        const ticket = await findTicketFromTicketId(ticketId);

        

        if(!ticket) {
            sendHttpResponse(res, 'Error', 500, 'Ticket no existe');
            
        } else {
            const permissions = await findAllPermissionsFromUserAndProfile(req.user.id,req.user.profileId)
            const auth = permissions.find(a => a.name == 'TICKET_VER')
            if(auth){
                sendHttpResponse(res, ticket, 200);
            }else {
                const test = await findManagerPurchase(req.user.id)
                const managerIds = [];
                if(test) {
                    test.forEach(e => {
                    managerIds.push(e.id)
                    })
                }

                if(ticket.userId == req.user.id || managerIds.find(i => i == ticket.managerId)){
                    sendHttpResponse(res, ticket, 200);
                }else {
                    sendHttpResponse(res,'usuario no tiene permisos o ticket asiganado con id especificado', 400)
                }
            }
            
        }
        
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al obtener tickets');
    }
}

const updateTicket = async (req,res) => {
    const {ticketId, ...data} = req.body;
    if(!ticketId || !data){
        sendHttpResponse(res,'datos faltantes en body', 400)
    }else {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id,req.user.profileId)
        const auth = permissions.find(a => a.name == 'TICKET_EDITAR')
        if(auth){
            const ticket = await getTicketFromId(ticketId)
            const newTicket = await updateTicketFromId(ticket, data)
            sendHttpResponse(res,newTicket, 200)
        }else {
            const ticket = await getTicketFromId(ticketId)
            const test = await findManagerPurchase(req.user.id)
            const managerIds = [];
            if(test) {
                test.forEach(e => {
                managerIds.push(e.id)
                })
            }

            if(ticket.userId == req.user.id || managerIds.find(i => i == ticket.managerId)){
                const newTicket = await updateTicketFromId(ticket, data)
                sendHttpResponse(res,newTicket, 200)
            }else {
                sendHttpResponse(res,'usuario no tiene permisos o ticket asiganado con id especificado', 400)
            }
        }
        
    }
    
}

exports.updateTicket = updateTicket;
exports.getTicket = getTicket;
exports.ticketCreation = ticketCreation;
exports.getTickets = getTickets;