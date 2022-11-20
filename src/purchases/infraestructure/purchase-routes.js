const { Router } = require("express");
const { hasProfile, hasPermission } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, getPurchaseDetail, updatePurchase, getAllPurchases } = require("./purchase-controller");
const { purchaseDetailPermission } = require("./purchase-middleware");
const purchaseTypeController = require("./purchasetype-controller");
const { SupplierController } = require("./Supplier-controller");



const router = Router()

router.post('/', createPurchase);
router.get('/', getAllPurchases);

//Proveedores
router.post('/proveedor', SupplierController.createSupplier);
router.get('/proveedor', SupplierController.getSuppliers);

router.put('/',updatePurchase);
router.get('/tipo', purchaseTypeController.getAll)
router.get('/:compraId', purchaseDetailPermission(),getPurchaseDetail);


exports.purchaseRoutes = router;