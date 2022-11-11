const { Router } = require("express");
const { hasProfile } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, purchaseManage, getPurchaseDetail, updatePurchase, getAllPurchases } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);
router.get('/', getAllPurchases)
router.get('/:compraId', getPurchaseDetail);
router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);

exports.purchaseRoutes = router;