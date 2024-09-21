import {Cart} from'../models/Cart';
import { setResponse } from '../common';
import {logger} from '../utils/logger';
import {Request,Response} from 'express';

const createCart = async (req:any, res:any) => {
  try {
    const CartData =await Cart.create({ ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date() })
      logger.info(`${req.body.description} - CartData is created successfully`)
      setResponse(res,200,'S','Successfully created',{CartData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}

const findCartByUserid = async (req:any, res:any) => {
  try {
      const data = await Cart.findAll({ 
        where: { userid: req.params.id }
      })
      if (!data) {
          return setResponse(res,404,'E','No Data Available.',{})
      }
      setResponse(res,200,'S',"Cart details get from given user id..",{data})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}


// GET /Carts?limit=10&skip=20`
// GET /Carts?sortBy=createdAt:desc
const cartWithPagination = async (req:any, res:any) => {
    let parts:any 

    if (req.query.sortBy) {
        parts = (<string>req.query.sortBy).split(':')
    }

    try {
            let result = await Cart.findAll({ 
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

const cartById = async (req:any, res:any) => {
  const id = req.params.id

  try {
      const CartData = await Cart.findOne({ where: { id: id } })

      if (!CartData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }

      logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,200,'S','get detail by Id',{CartData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

const updateCart = async (req:any, res:any) => {
  try {
    const CartData = await Cart.findOne({ where: { id: req.params.id } })

      if (!CartData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          //return res.status(404).send()
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Cart.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { id: req.params.id } });

      logger.info(`${req.params.id} - CartData is updated`)
      setResponse(res,200,'S','Successfully update',{CartData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}

const deleteCart = async (req:any, res:any) => {
  try {
      const CartData = await Cart.findOne({ where: { id: req.params.id } })

      if (!CartData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Cart.destroy({ where: { id: req.params.id } });

      logger.info(`${req.params.id} - Deleted successfully`)
      setResponse(res,200,'S','Successfully delete',{CartData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

module.exports = { createCart, 
  findCartByUserid,
  cartWithPagination,
  cartById,
  updateCart, 
  deleteCart 
}