const { Router } = require("express");
const { createPurchase, findPurchasesFromManager, findAllPurchases } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);
router.get('/asignadas/:userId',findPurchasesFromManager)
router.get('/asignadas',findAllPurchases)


exports.purchaseRoutes = router;