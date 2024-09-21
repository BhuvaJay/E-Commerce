import {Category} from'../models/Category';
import { setResponse } from '../common';
import {logger} from '../utils/logger';
import {Request,Response} from 'express';

const createCategory = async (req:any, res:any) => {
  try {
    const CategoryData =await Category.create({ ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date() })

      logger.info(`${req.body.description} - CategoryData is created successfully`)
      setResponse(res,200,'S','Successfully created',{CategoryData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}



// GET /Categorys?limit=10&skip=20`
// GET /Categorys?sortBy=createdAt:desc
const categoryWithPagination = async (req:any, res:any) => {
    let parts:any 

    if (req.query.sortBy) {
        parts = (<string>req.query.sortBy).split(':')
    }

    try {
      console.log('parts[0]', parts[0])
      console.log('parts[1]', parts[1])
            let result = await Category.findAll({ 
              order: [[parts[0], parts[1].toUpperCase()]],
              offset: parseInt(<any>req.query.skip),
              limit: parseInt(<any>req.query.limit)
            });
            
            setResponse(res,200,'S','Successfully get data',{result})
    } catch (e) {
        logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        setResponse(res,500,'E','error',{e})
    }
}

const categoryById = async (req:any, res:any) => {
  const id = req.params.id

  try {
      const CategoryData = await Category.findOne({ where: { categoryid: id } })

      if (!CategoryData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }

      logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,200,'S','get detail by Id',{CategoryData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

const updateCategory = async (req:any, res:any) => {
  try {
    const CategoryData = await Category.findOne({ where: { categoryid: req.params.id } })

      if (!CategoryData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          //return res.status(404).send()
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Category.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { categoryid: req.params.id } });

      logger.info(`${req.params.id} - CategoryData is updated`)
      setResponse(res,200,'S','Successfully update',{CategoryData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}

const deleteCategory = async (req:any, res:any) => {
  try {
      const CategoryData = await Category.findOne({ where: { categoryid: req.params.id } })

      if (!CategoryData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Category.destroy({ where: { categoryid: req.params.id } });

      logger.info(`${req.params.id} - Deleted successfully`)
      setResponse(res,200,'S','Successfully delete',{CategoryData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

module.exports = { createCategory, 
  categoryWithPagination,
  categoryById,
  updateCategory, 
  deleteCategory 
}