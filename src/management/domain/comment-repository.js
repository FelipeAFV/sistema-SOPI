const {Comment} = require("./models");

const addComment = async(data) => {
    return await Comment.create({response:data.response, ticketId: data.ticketId, creatorId: data.creator}); 
};

exports.addComment = addComment;