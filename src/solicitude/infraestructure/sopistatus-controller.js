const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllStatus } = require("../domain/sopistatus-repository");

const getStatuses = async (req, res) => {
    try {
        const statuses = await findAllStatus();
        sendHttpResponse(res, statuses, 200);
        return
    } catch (e) {
        sendHttpResponse(res, 'Error', 500);
        return;
    }
}

exports.getStatuses = getStatuses;