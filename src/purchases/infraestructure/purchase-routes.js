const { Router } = require("express");
const { hasProfile } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, getPurchaseDetail, updatePurchase, getAllPurchases } = require("./purchase-controller");
const { purchaseDetailPermission } = require("./purchase-middleware");

const router = Router()

router.post('/', createPurchase);
router.get('/', getAllPurchases)
router.get('/:compraId', purchaseDetailPermission(),getPurchaseDetail);
router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);

exports.purchaseRoutes = router;