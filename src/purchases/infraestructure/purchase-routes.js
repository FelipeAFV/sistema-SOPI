const { Router } = require("express");
const { hasProfile, hasPermission, hasAnyPermission } = require("../../auth/infraestructure/check-auth-middleware");
const { createPurchase, getPurchaseDetail, updatePurchase, getAllPurchases } = require("./purchase-controller");
const { purchaseDetailPermission } = require("./purchase-middleware");
const { getAllStatuses } = require("./purchasestatus-controller");
const { getPurchaseTypes, createPurchaseType, updateTypePurchase, deleteTypePurchase } = require("./purchasetype-controller");
const purchaseTypeController = require("./purchasetype-controller");
const { SupplierController } = require("./Supplier-controller");



const router = Router()

router.post('/', createPurchase);
router.get('/', hasAnyPermission(['COMPRA_VER', 'COMPRA_VER_RELACIONADO']), getAllPurchases);
router.put('/',  hasProfile(['jefe_compra', 'director']),  updatePurchase);
router.get('/:compraId', purchaseDetailPermission(), getPurchaseDetail);
//Proveedores
router.post('/proveedor', SupplierController.createSupplier);
router.get('/proveedor', SupplierController.getSuppliers);
router.get('/estados', getAllStatuses);
router.put('/proveedor', SupplierController.updateSupplier);
router.delete('/proveedor', SupplierController.deleteSupplier);
//Tipos de compra
router.get('/tipos', getPurchaseTypes);
router.post('/tipos', createPurchaseType);
router.put('/tipos', updateTypePurchase);
router.delete('/tipos', deleteTypePurchase)




exports.purchaseRoutes = router;