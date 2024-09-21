import express, {Request,Response,Application} from 'express';
const validateCategory = require('../validators/Category')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const CategoryController  = require('../controller/Category');
const router:Application = express();

router.post('/Categorys',[validateCategory.validateCategoryData, auth],CategoryController.createCategory )



router.get('/Categorys', [auth],CategoryController.categoryWithPagination )

router.get('/Categorys/:id', [validateCategory.getValidateData,auth],CategoryController.categoryById )

router.patch('/Categorys/:id',[validateCategory.updateValidateData, auth], CategoryController.updateCategory)

router.delete('/Categorys/:id', [validateCategory.getValidateData, auth], CategoryController.deleteCategory)

// router.all( '*',async function(req, res){
//   setResponse(res,400,'E','Bad request')
// })

module.exports = router