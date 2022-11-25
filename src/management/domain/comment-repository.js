const { User } = require("../../auth/domain/models");
const {Comment} = require("./models");

const addComment = async(data) => {
    return await Comment.create({response:data.response, ticketId: data.ticketId, creatorId: data.creator}); 
};
const getCommentFromTicketId = async(ticketId) => {
    return await Comment.findAndCountAll({where: {ticketId:ticketId}, include: [User]})
}
exports.addComment = addComment;
exports.getCommentFromTicketId = getCommentFromTicketId;