const { sendHttpResponse } = require("../../share/utils/response-parser");
const { createTicket, getTicketsFromPurchaseId } = require("../application/ticket-service");



const ticketCreation = async (req,res) => {
    try {
        const ticketData = req.body;
        const purchaseId = req.query.compraId;
        if(!ticketData || !purchaseId){
            throw new Error('campos faltantes')
        }else {
            ticketData.purchaseId = purchaseId;
            console.log(ticketData.purchaseId);
            const ticket = await createTicket(ticketData)
            sendHttpResponse(res,ticket,200)
        }
    } catch (error) {
        sendHttpResponse(res,error.message, 500)
    }
};

const getAllTickets = async (req,res) => {
    const {compraId} = req.params;

    try {
        
        const tickets = await getTicketsFromPurchaseId(compraId);

        if(tickets.length !== 0) {
            sendHttpResponse(res, tickets, 200);
        } else {
            sendHttpResponse(res, 'Error', 500, 'No existen tickets asociados a la compra con id: '+ compraId);
        }
        
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al obtener tickets');
    }
}


exports.ticketCreation = ticketCreation;
exports.getAllTickets = getAllTickets;