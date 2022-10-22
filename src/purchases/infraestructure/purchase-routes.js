const { Router } = require("express");
const { createPurchase, purchaseManage } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);
router.get('/asignadas', purchaseManage)


exports.purchaseRoutes = router;