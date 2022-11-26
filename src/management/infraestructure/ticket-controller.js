const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { createTicket, getTicketsFromPurchaseId, findTicketFromTicketId, updateTicketFromId } = require("../application/ticket-service");
const { getCommentFromTicketId } = require("../domain/comment-repository");
const { findManagerPurchase } = require("../domain/manager-repository");
const { getTicketFromId } = require("../domain/ticket-repository");



const ticketCreation = async (req, res) => {
    try {
        const ticketData = req.body;

        if (!ticketData) {
            throw new Error('campos faltantes')
        } else {
            ticketData.creator = req.user.id;
            const ticket = await createTicket(ticketData, req.user.id, req.user.profileId)
            sendHttpResponse(res, ticket, 200)
        }
    } catch (error) {
        sendHttpResponse(res, error.message, 500)
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await getTicketsFromPurchaseId(req.query, req.user.id, req.user.profileId);
        console.log(tickets, 'Tickets ')
        // if(tickets.length !== 0) {
        sendHttpResponse(res, tickets, 200);
        // } else {
        //     sendHttpResponse(res, 'Error', 500, 'No existen tickets asociados a la compra con id: '+ compraId);
        // }

    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al obtener tickets, controlador');
    }
}

const getTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {

        var ticket = await findTicketFromTicketId(ticketId);
        const {rows} = await getCommentFromTicketId(ticketId);
        // const comments = await getCommentFromTicketId(ticketId);
        // console.log(comments)



        if (!ticket) {
            sendHttpResponse(res, 'Error', 500, 'Ticket no existe');

        } else {
            const currentDate = new Date()
            let auxDate = currentDate.toISOString().split('T')[0]
            auxDate = auxDate.split('-')
            let auxTicketExpiration = ticket.expirationDate.split('-')
            console.log(auxDate);
            console.log(auxTicketExpiration);
            for (let i = 0; i < auxDate.length; i++) {
                if (((auxTicketExpiration[i] - auxDate[i]) > 0) && i > 0) {
                    break;
                } else if (i == 0) {
                    continue;
                } else {
                    ticket = await updateTicketFromId(ticket, { ticketStatusId: 4 })
                }

            }
            const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId)
            const auth = permissions.find(a => a.name == 'TICKET_VER');
            const data = {
                ticket,
                comments:rows
            }
            // console.log(data)
            if (auth) {
                sendHttpResponse(res, data, 200);
            } else {
                const test = await findManagerPurchase(req.user.id)
                const managerIds = [];
                if (test) {
                    test.forEach(e => {
                        console.log(e)
                        managerIds.push(e.id)
                    })
                }

                if (ticket.userId == req.user.id || managerIds.find(i => i == ticket.managerId)) {
                    sendHttpResponse(res, data, 200);
                } else {
                    sendHttpResponse(res, 'usuario no tiene permisos o ticket asiganado con id especificado', 400)
                }
            }

        }

    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al obtener tickets');
    }
}

const updateTicket = async (req, res) => {
    const { ticketId, ...data } = req.body;
    if (!ticketId || !data) {
        sendHttpResponse(res, 'datos faltantes en body', 400)
    } else {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId)
        const auth = permissions.find(a => a.name == 'TICKET_EDITAR')
        if (auth) {
            const ticket = await getTicketFromId(ticketId)
            const newTicket = await updateTicketFromId(ticket, data)
            sendHttpResponse(res, newTicket, 200)
        } else {
            const ticket = await getTicketFromId(ticketId)
            const test = await findManagerPurchase(req.user.id)
            const managerIds = [];
            if (test) {
                test.forEach(e => {
                    managerIds.push(e.id)
                })
            }

            if ( managerIds.find(i => i == ticket.managerId)) {
                const newTicket = await updateTicketFromId(ticket, data)
                sendHttpResponse(res, newTicket, 200)
            } else {
                sendHttpResponse(res, 'usuario no tiene permisos o ticket asiganado con id especificado', 403)
            }
        }

    }

}

exports.updateTicket = updateTicket;
exports.getTicket = getTicket;
exports.ticketCreation = ticketCreation;
exports.getTickets = getTickets;