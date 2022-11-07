const { sendHttpResponse } = require("../../share/utils/response-parser");
const { createTicket } = require("../application/ticket-service");



const ticketCreation = async (req,res) => {
    try {
        const ticketData = req.body;
        if(!ticketData){
            throw new Error('body vacio')
        }else {
            const ticket = await createTicket(ticketData)
            sendHttpResponse(res,ticket,200)
        }
    } catch (error) {
        sendHttpResponse(res,error.message, 500)
    }
}


exports.ticketCreation = ticketCreation