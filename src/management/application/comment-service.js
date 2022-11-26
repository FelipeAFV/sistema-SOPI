
const { addComment } = require("../domain/comment-repository");
const { findManagersWithConditions, findManager } = require("../domain/manager-repository");
const { getTicketFromId } = require("../domain/ticket-repository");


const createComment = async (commentData, idUser) => {
    try {
        //Retrieve ticket
        //Validate user
        //Create comment
        //Change ticket status? owner?
        const ticket = await getTicketFromId(commentData.ticketId);
        if(!ticket) throw new Error('No existe ticket con id: '+ commentData.ticketId);
        const {userId, managerId, purchaseId} = ticket;

        //Validación del asignado
        const validation = userId === idUser ? true : null;

        //Validdación del manager
        const existingManager = await findManager({managerId:idUser, purchaseId:purchaseId});
        let ownerValidation = true;
        if (existingManager) {

            const {id} = existingManager;
            ownerValidation = managerId === id ? true : null;
        }
        
        const comment = (validation || ownerValidation) ? await addComment(commentData): null;
        if(comment === null) throw new Error('No es válido');

        return comment;
    } catch (error) {
        throw new Error(error.message)
    }
};

exports.createComment = createComment;