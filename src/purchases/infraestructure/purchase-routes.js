const { Router } = require("express");
const { hasProfile, hasPermission } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, getPurchaseDetail, updatePurchase, getAllPurchases } = require("./purchase-controller");
const { purchaseDetailPermission } = require("./purchase-middleware");
<<<<<<< HEAD
const { getPurchaseTypes, createPurchaseType, updateTypePurchase, deleteTypePurchase } = require("./purchasetype-controller");
=======
const purchaseTypeController = require("./purchasetype-controller");
>>>>>>> 721b123fcf52dcbd5bbe61f950b4042470e34443
const { SupplierController } = require("./Supplier-controller");



const router = Router()

router.post('/', createPurchase);
router.get('/', getAllPurchases);

//Proveedores
router.post('/proveedor', SupplierController.createSupplier);
router.get('/proveedor', SupplierController.getSuppliers);
router.put('/proveedor', SupplierController.updateSupplier);
router.delete('/proveedor', SupplierController.deleteSupplier);

router.get('/tipos', getPurchaseTypes);
router.post('/tipos', createPurchaseType);
router.put('/tipos', updateTypePurchase);
router.delete('/tipos', deleteTypePurchase)

router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);
router.get('/:compraId', purchaseDetailPermission(), getPurchaseDetail);


exports.purchaseRoutes = router;