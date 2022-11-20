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

<<<<<<< HEAD
router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);
router.get('/:compraId', purchaseDetailPermission(), getPurchaseDetail);
=======
router.put('/',updatePurchase);
router.get('/tipo', purchaseTypeController.getAll)
router.get('/:compraId', purchaseDetailPermission(),getPurchaseDetail);
>>>>>>> b1d3140a70df8b525fe22a7ee1ca9f7527580a64


exports.purchaseRoutes = router;