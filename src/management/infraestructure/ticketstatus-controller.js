const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllStatus } = require("../domain/ticketstatus-repository");

const getTicketStatuses = async (req, res) => {
    try {
        const statuses = await findAllStatus();
        sendHttpResponse(res, statuses, 200);
        return;
    } catch (error) {
        sendHttpResponse(res, 'Error', 500, 'Error al obtener estados, controlador');
        return;
    }
};

exports.getTicketStatuses = getTicketStatuses;