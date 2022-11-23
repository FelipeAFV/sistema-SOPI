const { sendHttpResponse } = require("../../share/utils/response-parser");
const { createComment } = require("../application/comment-service");

const addComment = async (req, res) => {
  try {
    const { ticketId, response } = req.body;

    if (!ticketId) throw new Error("Falta el id del ticket");
    if (!response) throw new Error("Campo vacío, vuelva a intentarlo");

    const commentData = {
        ticketId,
        response,
        /* creator: req.user.id,
        profileId: req.user.profileId */
    }
    const comment = await createComment(commentData, req.user.id);
    //if(comment == null) sendHttpResponse(res, "No estas asignado al ticket", 403);
    sendHttpResponse(res, comment, 200);

  } catch (error) {
    sendHttpResponse(res, error.message, 500);
  }
};

exports.addComment = addComment;
