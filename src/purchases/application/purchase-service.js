const { sequelize } = require("../../database/db-init");
const { findSopi } = require("../../solicitude/domain/sopi-repository");
const { savePurchase, updatePurchaseById, getAllPurchases, getPurchaseById, getPurchaseFromManagerId, getAllPurchasesWithManager, getAllPurchasesWithManagerByConditions, getAllPurchasesByConditions, getAllPurchasesAssignedByConditions } = require("../domain/purchase-repository");
const {
  saveAllPurchaseDatails,
  getPurchaseDetailById,
} = require("../domain/purchasedetail-repository");
const { savePurchaseSopi } = require("../domain/purchasesopi-repository");
const { findStatusByName } = require("../domain/purchasestatus-repository");
const {
  findManagerPurchase,
  findAllManager,
  findOneManagerByUserId,
} = require("../../management/domain/manager-repository");
const { addlogByStatusId } = require("../domain/purchaselog-repository");
const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { getTicketsFromUserId } = require("../../management/domain/ticket-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { pagination } = require("../../share/utils/api-feature");
const { Op } = require("sequelize");
const { borrarRepetidos, borrarRepetidos2 } = require("../../share/utils/deleteDuplicates");

const createPurchaseFromCompleteSopi = async ({ sopiId }) => {
  try {
    const response = await sequelize.transaction(async () => {
      // STEP 1: Find sopi with items
      const sopi = await findSopi({ id: sopiId });

      if (!sopi) {
        throw new Error(`Sopi con id ${sopiId} no existe`);
      }

      // Sopi details availeble through sopiDetails list atribute


      const purchaseFirstStatus = await findStatusByName("PREPARANDO");
      //STEP 2: Create purchase
      const purchaseSaved = await savePurchase({
        statusId: purchaseFirstStatus.id,
      });

      //STEP3: Add purchase details
      const items = sopi.sopiDetails;
      const purchaseDetails = items.map((item) => {
        return {
          sopiDetailId: item.id,
          quantity: item.quantity,
          price: item.price,
          purchaseId: purchaseSaved.id,
        };
      });
      const purchaseDetailsCreated = await saveAllPurchaseDatails(
        purchaseDetails
      );
      const jsonPurchaseDetail = purchaseDetailsCreated.map((item) => {
        return item.toJSON();
      });
      const jsonPurchase = purchaseSaved.toJSON();
      jsonPurchase.items = jsonPurchaseDetail;

      // STEP 4: Link SOPI to Purchase
      await savePurchaseSopi({ sopiId: sopi.id, purchaseId: purchaseSaved.id });
      return jsonPurchase;
    });

    // Response from inside transaction
    return response;
  } catch (e) {
    console.log(e);
    throw new Error("Error en servicio-compras");
  }
};

const findPurchaseDetailByPurchaseId = async (id) => {

      const purchase = await getPurchaseById(id);
      const status = await purchase.getPurchaseLogStatus();
      purchase.status = status.map((status)=>status.name);
      
      return purchase;
};

const updatePurchaseStatus = async ({ purchaseId, statusId, userId }) => {
  try {
    const purchaseUpdated = await updatePurchaseById(purchaseId, { statusId: statusId});

    await addlogByStatusId(purchaseId, statusId, userId);

    return purchaseUpdated;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}


const findPurchasesFilteredByPermissions = async (query,profileId, userId) => {
  // let purchases = [];
  let where = {}
  const page = query.page ? Number.parseInt(query.page) : 1;
  const perPage = query.per_page ? Number.parseInt(query.per_page) : 20;
  const permissions = await findAllPermisionFromProfileId(profileId);
  const purchasesPermissions = permissions.filter(permission => permission.name.includes('COMPRA'))

  const viewAll = purchasesPermissions.find((permission) => permission.name == 'COMPRA_VER');
  if (viewAll) {
    const purchases= await getAllPurchases(page,perPage);
    return pagination({
      data:purchases,
      count: purchases.length,
      page,
      perPage
    })
  }
  // const managerPermission = await purchasesPermissions.find(p => p.name.includes('VER_GESTOR'));
  // const ticketPermission = await purchasesPermissions.find(p => p.name.includes('VER_TICKET'));
  
  // if (managerPermission && !ticketPermission) {
  // } else if (ticketPermission && !managerPermission) {
  // } else {
  //   purchases = await getAllPurchases();
  // }
  //Ven compras manager y ticket asociado a compra
  const existingManager = await findOneManagerByUserId({userId: userId});
  if(existingManager != null) {
    const {id} = existingManager;
    where = {
      [Op.or]: [{ userId: `${userId}` }]
    };
    const purchasesM = await getAllPurchasesByConditions(where, page, perPage);
    console.log("COMPRAS");
    return pagination({
      data:purchasesM,
      count: purchasesM.length,
      page,
      perPage
    })
  } else {

    //Obtener ids de compras por medio de los tickets
    const purchasesWithTickets = await getTicketsFromUserId(userId);
    //Se rescatan ids de compras que tienes asociados los tickets
    const result = purchasesWithTickets.reduce((acc,item)=>{
      if(!acc.includes(item.purchaseId)){
        acc.push(item.purchaseId);
      }
      return acc;
    },[]);
    //Obtener las compras por medio de un array
    where = {
      id: {
        [Op.in]: result
      }
    };

    const purchaseWithTickets = await getAllPurchasesAssignedByConditions(where, page, perPage);
    return pagination({
      data: purchaseWithTickets,
      count: purchaseWithTickets.length,
      page,
      perPage
    });
    /* throw new Error('No tienes accesos o no eres gestor'); */
  }


  //const purchasesManager = await findPurchasesAsignedToManager(userId, page, perPage);

  //const purchasesTicket = await findPurchasesWithTicketFromUser(userId, page, perPage);

  //const finalPurchases = [...purchasesManager, ...purchasesTicket];


  // Status filter
  // const filteredPurchasesByStatus = purchases.filter(purchase => {
  //   let permitted = false;
  //   for (let access of purchasesPermissions) {
  //     if (access.name.includes(purchase.status.name)) {
  //       permitted = true;
  //       break;
  //     }

  //   }
  //   return permitted;
  // });
  //return finalPurchases;

}

const findPurchasesAsignedToManager = async (userId, page, perPage) => {
  try {
    const result = await findManagerPurchase(userId, page, perPage);
    const purchases = result.map((manager) => manager.purchase);

    return purchases;
  } catch (error) {
    throw new Error(error.message);
  }
};


const findPurchasesWithTicketFromUser = async (userId)  => {
  const ticketFromUser = await  getTicketsFromUserId(userId);
  const purchases = ticketFromUser.map(ticket => ticket.purchase)

  return purchases;
}

exports.createPurchaseFromCompleteSopi = createPurchaseFromCompleteSopi;
exports.findPurchaseDetailByPurchaseId = findPurchaseDetailByPurchaseId;
exports.updatePurchaseStatus = updatePurchaseStatus;
exports.findPurchasesFilteredByPermissions = findPurchasesFilteredByPermissions;
