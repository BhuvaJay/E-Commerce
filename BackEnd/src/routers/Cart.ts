import express, {Request,Response,Application} from 'express';
const validateCart = require('../validators/Cart')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const CartController  = require('../controller/Cart');
const router:Application = express();

router.post('/Carts',[validateCart.validateCartData],CartController.createCart )

// router.post('/BulkCarts',[],CartController.createBulkCart )


router.get('/Cart-users/:id', [auth],CartController.findCartByUserid )


router.get('/Carts', [auth],CartController.cartWithPagination )

router.get('/Carts/:id', [validateCart.getValidateData,auth],CartController.cartById )

router.patch('/Carts/:id',[validateCart.updateValidateData], CartController.updateCart)

router.delete('/Carts/:id', [validateCart.getValidateData, auth], CartController.deleteCart)

// router.all( '*',async function(req, res){
//   setResponse(res,400,'E','Bad request')
// })

module.exports = router