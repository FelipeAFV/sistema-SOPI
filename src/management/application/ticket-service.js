const { userRepository } = require('../../auth/domain/user-repository')
const { findOneManager } = require('../domain/manager-repository')
const {addTicket} = require('../domain/ticket-repository')


const createTicket = async (ticketData) => {
    try {
        const manager = await findOneManager(ticketData.managerId)
        if(!manager) {
            throw new Error('manager no existe')
        } else {
            const user = await userRepository.findUserById(ticketData.userId)
            if(!user) {
                throw new Error('usuario no existe')
            } else {
                if(!ticketData.title || !ticketData.content || !ticketData.date){
                    throw new Error('ticket con campos faltantes')
                }else {
                    const ticket = await addTicket(ticketData)
                    return ticket
                }
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


exports.createTicket = createTicket;