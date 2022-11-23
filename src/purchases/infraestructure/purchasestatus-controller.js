const { sendHttpResponse } = require("../../share/utils/response-parser")
const { findAllStatuses } = require("../domain/purchasestatus-repository")

const getAllStatuses = async  (req, res) => {
    try {
        sendHttpResponse(res, await findAllStatuses(), 200 )
    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500 )
    }
}

exports.getAllStatuses = getAllStatuses;