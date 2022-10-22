const { Router } = require("express");
const { createPurchase, purchaseManage, getPurchaseDetail } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);
router.get('/asignadas', purchaseManage)
router.get('/:compraId', getPurchaseDetail);

exports.purchaseRoutes = router;