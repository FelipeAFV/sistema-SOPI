
const { addComment } = require("../domain/comment-repository");
const { getTicketFromId } = require("../domain/ticket-repository");


const createComment = async (commentData, id) => {
    try {
        //Retrieve ticket
        //Validate user
        //Create comment
        //Change ticket status? owner?
        const ticket = await getTicketFromId(commentData.ticketId);
        if(!ticket) throw new Error('No existe ticket con id'+ commentData.ticketId);
        const {userId} = ticket;

        const validation = userId === id ? true : null;
        
        const comment = validation ? await addComment(commentData): null;
        if(comment === null) throw new Error('No es válido');

        return comment;
    } catch (error) {
        throw new Error(error.message)
    }
};

exports.createComment = createComment;