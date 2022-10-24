const { Router } = require("express");
const { hasProfile } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, purchaseManage, getPurchaseDetail, updatePurchase } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);
router.get('/', purchaseManage)
router.get('/:compraId', getPurchaseDetail);
router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);

exports.purchaseRoutes = router;