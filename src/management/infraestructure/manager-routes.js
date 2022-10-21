const { Router } = require("express");
const { getManagerPurchase } = require("../application/managment-service");
const { createManager } = require("../application/managment-service");

const router = Router()

router.post('/getPurchases', getManagerPurchase);
router.post('/', createManager)


exports.managerRoutes = router;