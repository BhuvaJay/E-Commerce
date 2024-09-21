import express, { Request, Response, Application } from 'express';
const validateProducts = require('../validators/Products')
import { auth } from '../middleware/auth';
import { setResponse } from '../common';
import { checkAccess } from '../middleware/uservalidate';
const ProductsController = require('../controller/Products');
const router: Application = express();

router.post('/Productss', [validateProducts.validateProductsData], ProductsController.createProducts)


router.get('/Products-Categorys/:id', [auth], ProductsController.findProductsByCategoryId)


router.get('/Products-Categorys-Search/:id', [auth], ProductsController.productsWithPagination)

router.get('/Productss/:id', [validateProducts.getValidateData, auth], ProductsController.productsById)

router.patch('/Productss/:id', [validateProducts.updateValidateData], ProductsController.updateProducts)

router.delete('/Productss/:id', [validateProducts.getValidateData, auth], ProductsController.deleteProducts)

// router.all( '*',async function(req, res){
//   setResponse(res,400,'E','Bad request')
// })

module.exports = router