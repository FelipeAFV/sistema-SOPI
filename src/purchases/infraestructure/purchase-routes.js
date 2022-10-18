const { Router } = require("express");
const { createPurchase } = require("./purchase-controller");

const router = Router()

router.post('/', createPurchase);


exports.purchaseRoutes = router;