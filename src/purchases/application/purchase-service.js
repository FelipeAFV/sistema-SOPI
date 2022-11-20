const { sequelize } = require("../../database/db-init");
const { findSopi } = require("../../solicitude/domain/sopi-repository");
const { savePurchase, updatePurchaseById, getAllPurchases, getPurchaseById, getPurchaseFromManagerId, getAllPurchasesWithManager } = require("../domain/purchase-repository");
const {
  saveAllPurchaseDatails,
  getPurchaseDetailById,
} = require("../domain/purchasedetail-repository");
const { savePurchaseSopi } = require("../domain/purchasesopi-repository");
const { findStatusByName } = require("../domain/purchasestatus-repository");
const {
  findManagerPurchase,
  findAllManager,
} = require("../../management/domain/manager-repository");
const { addlogByStatusId } = require("../domain/purchaselog-repository");
const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { getTicketsFromUserId } = require("../../management/domain/ticket-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");

const createPurchaseFromCompleteSopi = async ({ sopiId }) => {
  try {
    const response = await sequelize.transaction(async () => {
      // STEP 1: Find sopi with items
      const sopi = await findSopi({ id: sopiId });

      if (!sopi) {
        throw new Error(`Sopi con id ${sopiId} no existe`);
      }

      // Sopi details availeble through sopiDetails list atribute
      console.log("sopi details" + sopi.sopiDetails[0].features);

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


const findPurchasesFilteredByPermissions = async (profileId, userId) => {
  // let purchases = [];

  const permissions = await findAllPermisionFromProfileId(profileId);

  
  const purchasesPermissions = permissions.filter(permission => permission.name.includes('COMPRA'))
  

  const viewAll = purchasesPermissions.find((permission) => permission == 'COMPRA_VER');
  if (viewAll) {
    return await getAllPurchases();
  }

  

  // const managerPermission = await purchasesPermissions.find(p => p.name.includes('VER_GESTOR'));
  // const ticketPermission = await purchasesPermissions.find(p => p.name.includes('VER_TICKET'));
  
  // if (managerPermission && !ticketPermission) {
  // } else if (ticketPermission && !managerPermission) {
  // } else {
  //   purchases = await getAllPurchases();
  // }
  const purchasesManager = await findPurchasesAsignedToManager(userId);
  const purchasesTicket = await findPurchasesWithTicketFromUser(userId);

  const finalPurchases = [...purchasesManager, purchasesTicket]

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
  return finalPurchases;

}

const findPurchasesAsignedToManager = async (userId) => {
  try {
    const result = await findManagerPurchase(userId);

    return result;
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
