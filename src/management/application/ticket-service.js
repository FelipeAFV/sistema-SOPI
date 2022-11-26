const { userRepository } = require("../../auth/domain/user-repository");
const { pagination } = require("../../share/utils/api-feature");
const { Op } = require("sequelize");
const {
  findOneManager,
  findManager,
  findOneManagerForPurchase,
  findManagerPurchase,
  findManagersWithConditions,
  saveManager,
  findOneManagerByUserId,
} = require("../domain/manager-repository");
const {
  addTicket,
  getTicketFromId,
  getAllTickets,
  updateFromIdTicket,
  getTicketFromPurchase,
} = require("../domain/ticket-repository");
const {
  findAllPermissionsFromUserAndProfile,
} = require("../../auth/domain/permission-repository");

const createTicket = async (ticketData, idUser, idProfile) => {
  try {
    //Verificar usuario
    const user = await userRepository.findUserById(ticketData.userId);
    if (!user) throw new Error("usuario no existe");

    //Verificar datos
    if (
      !ticketData.title ||
      !ticketData.content ||
      !ticketData.date ||
      !ticketData.purchaseId
    )
      throw new Error("ticket con campos faltantes");

    //Verificar permisos
    const permissions = await findAllPermissionsFromUserAndProfile(
      idUser,
      idProfile
    );
    const auth = permissions.find((a) => a.name == "TICKET_CREAR");

    //Verificar si el usuario es gestor de la compra
    const existingManager = await findManager({
      managerId: idUser,
      purchaseId: ticketData.purchaseId,
    });
    if (auth && !existingManager) {
      //Se crea manager en caso de no ser gestor y tener el permiso
      const newManager = await saveManager({
        userId: idUser,
        purchaseId: ticketData.purchaseId,
      });
      console.log(newManager);
      const { id } = newManager;
      ticketData.managerId = id;
      const ticket = await addTicket(ticketData);
      return ticket;
    } else if (auth && existingManager) {
      ticketData.managerId = existingManager.id;
      const ticket = await addTicket(ticketData);
      return ticket;
    } else {
      throw new Error("No tienes los permisos");
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

const getTicketsFromPurchaseId = async (query, userId, profileId) => {
  const where = {};
  const { compraId } = query;
  const page = query.page ? parseInt(query.page) : 1;
  const perPage = query.per_page ? parseInt(query.per_page) : 20;

  //Filtros
  if (compraId) where.purchaseId = { [Op.eq]: `%${compraId}` };
  //if... or switch
  const { count, rows } = await getAllTickets(where, page, perPage);
  if (count <= 0) {
    return [];
  }
  const permissions = await findAllPermissionsFromUserAndProfile(
    userId,
    profileId
  );
  const ticketsFiltered = pagination({
    data: rows,
    count,
    page,
    perPage,
  });
  //Ver con permiso
  const auth = permissions.find((a) => a.name == "TICKET_VER");

  if (auth) {
    return ticketsFiltered;
  }

  //Ver si es asignado y es owner
  const existingManager = await findOneManagerByUserId({ userId: userId });
  let assignedValidation = rows.filter(
    (assignedValidation) => assignedValidation.userId == userId
  );

  if (existingManager != null) {
    const { id } = existingManager;
    let ownerValidation = rows.filter((owner) => owner.managerId == id);

    const val = ownerValidation && assignedValidation ? true : null;

    if (val) {
      ownerValidation = ownerValidation.concat(assignedValidation);
      const ticketsFilteredByBoth = pagination({
        data: ownerValidation,
        count: ownerValidation.length,
        page,
        perPage,
      });
      return ticketsFilteredByBoth;
    } else {
      const ticketsFilteredByOwner = pagination({
        data: ownerValidation,
        count: ownerValidation.length,
        page,
        perPage,
      });
      return ticketsFilteredByOwner;
    }
  } else {
    const ticketsFilteredByassigned = pagination({
      data: assignedValidation,
      count: assignedValidation.length,
      page,
      perPage,
    });
    return ticketsFilteredByassigned;
  }

  //Ver asignado

  //Ver si es solo owner
  //Ver si es owner y asignados

  /*     const test = await findManagerPurchase(userId)
    const managerIds = [];
    if(test) {
        test.forEach(e => {
            managerIds.push(e.id)
        })
    } */

  /* if(auth){
        const ticketsFiltered = pagination({
            data: rows,
            count,
            page,
            perPage
        })

        return ticketsFiltered;
    }else{
<<<<<<< HEAD

=======
        //console.log('adsdasds');
>>>>>>> abb8dbe0bb0eeeb177aa99f7062d3029cd3e999b
        const newRows = rows.filter(a => {
            // console.log('Ticket filtrado',a.title)
            if(a.userId == userId || managerIds.find(i => i == a.managerId)){
                return true;
            }
            return false;
        })
        const ticketsFiltered = pagination({
            data: newRows,
            count: newRows.length,
            page,
            perPage
        })

        return ticketsFiltered
    } */
};

const findTicketFromTicketId = async (ticketId) => {
  try {
    const ticket = await getTicketFromId(ticketId);
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Error en ticket service", error.message);
  }
};

const updateTicketFromId = async (ticket, content) => {
  try {
    const newTicket = await updateFromIdTicket(ticket.id, content);
    //ticket.update(content)
    return newTicket;
  } catch (error) {
    throw new Error("Error al actualizar ticket", error.message);
  }
};

exports.updateTicketFromId = updateTicketFromId;
exports.findTicketFromTicketId = findTicketFromTicketId;
exports.createTicket = createTicket;
exports.getTicketsFromPurchaseId = getTicketsFromPurchaseId;
