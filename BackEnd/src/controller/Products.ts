import { Products } from "../models/Products";
import { setResponse } from "../common";
import { logger } from "../utils/logger";
import { Request, Response } from "express";
import { Op } from "sequelize";

const createProducts = async (req: any, res: any) => {
  try {
    console.log("create products");
    const ProductsData = await Products.create({
      ...req.body,
      CREATED_ON: new Date(),
      MODIFIED_ON: new Date(),
    });

    logger.info(
      `${req.body.description} - ProductsData is created successfully`
    );
    setResponse(res, 200, "S", "Successfully created", { ProductsData });
  } catch (e) {
    console.log("err hello", e);
    logger.error(
      `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 400, "E", "error", { e });
  }
};

const findProductsByCategoryId = async (req: any, res: any) => {
  let parts: any;
  const categoryIds = JSON.parse(req.params.id);
  if (req.query.sortBy) {
    parts = (<string>req.query.sortBy).split(":");
  }
  try {
    const result = await Products.findAll({
      where: { categoryId: { [Op.in]: categoryIds } },
      order: [[parts[0], parts[1].toUpperCase()]],
      offset: parseInt(<any>req.query.skip),
      limit: parseInt(<any>req.query.limit),
    });
    if (!result) {
      return setResponse(res, 404, "E", "No Data Available.", {});
    }
    setResponse(
      res,
      200,
      "S",
      "Products details get from given Category id..",
      { result, count: result.length }
    );
  } catch (e) {
    logger.error(
      `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 400, "E", "error", { e });
  }
};

// GET /Productss?limit=10&skip=20`
// GET /Productss?sortBy=createdAt:desc
// const productsWithPagination = async (req: any, res: any) => {
//   let parts: any;

//   if (req.query.sortBy) {
//     parts = (<string>req.query.sortBy).split(":");
//   }

//   try {
//     let result = await Products.findAll({
//       order: [[parts[0], parts[1].toUpperCase()]],
//       offset: parseInt(<any>req.query.skip),
//       limit: parseInt(<any>req.query.limit),
//     });

//     setResponse(res, 200, "S", "Successfully get data", { result });
//   } catch (e) {
//     logger.error(
//       `500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
//     );
//     setResponse(res, 500, "E", "error", { e });
//   }
// };

const productsWithPagination = async (req: any, res: any) => {
  let parts: any;
  const categoryIds = JSON.parse(req.params.id);
  console.log("typeof categoryIds", typeof categoryIds);

  if (req.query.sortBy) {
    parts = (<string>req.query.sortBy).split(":");
  }
  const search = req.query.search;

  try {
    console.log("Try");
    if (search) {
      console.log("Inside Search");
      let result = await Products.findAll({
        where: {
          name: { [Op.iLike]: `%${search}%` },
          categoryId: { [Op.in]: categoryIds },
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit),
      });
      console.log("result from if", result);
      let count = await Products.findAll({
        where: {
          name: { [Op.iLike]: `%${search}%` },
          categoryId: { [Op.in]: categoryIds },
        },
      });
      console.log("count from if", count);
      setResponse(res, 200, "S", "Successfully get data", {
        result: result,
        count: count.length,
      });
    } else {
      let result = await Products.findAll({
        where: {
          categoryId: { [Op.in]: categoryIds },
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit),
      });
      console.log("result from else", result);

      let count = await Products.findAll({
        where: {
          categoryId: { [Op.in]: categoryIds },
        },
      });

      console.log("count from else", count);

      setResponse(res, 200, "S", "Successfully get data", {
        result: result,
        count: count.length,
      });
    }
  } catch (e) {
    logger.error(
      `500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 500, "E", "error", { e });
  }
};

const productsById = async (req: any, res: any) => {
  const productId = req.params.productId;

  try {
    const ProductsData = await Products.findOne({
      where: { productId: productId },
    });

    if (!ProductsData) {
      logger.info(
        `404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      return setResponse(res, 404, "E", "No Data Available.", {});
    }

    logger.info(
      `201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 200, "S", "get detail by Id", { ProductsData });
  } catch (e) {
    logger.error(
      `500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 500, "E", "error", { e });
  }
};

const updateProducts = async (req: any, res: any) => {
  try {
    const ProductsData = await Products.findOne({
      where: { productId: req.params.productId },
    });

    if (!ProductsData) {
      logger.info(
        `404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      //return res.status(404).send()
      return setResponse(res, 404, "E", "No Data Available.", {});
    }
    await Products.update(
      { ...req.body, MODIFIED_ON: new Date() },
      { where: { productId: req.params.productId } }
    );

    logger.info(`${req.params.productId} - ProductsData is updated`);
    setResponse(res, 200, "S", "Successfully update", { ProductsData });
  } catch (e) {
    logger.error(
      `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 400, "E", "error", { e });
  }
};

const deleteProducts = async (req: any, res: any) => {
  try {
    const ProductsData = await Products.findOne({
      where: { productId: req.params.productId },
    });

    if (!ProductsData) {
      logger.info(
        `404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      return setResponse(res, 404, "E", "No Data Available.", {});
    }
    await Products.destroy({ where: { productId: req.params.productId } });

    logger.info(`${req.params.productId} - Deleted successfully`);
    setResponse(res, 200, "S", "Successfully delete", { ProductsData });
  } catch (e) {
    logger.error(
      `500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 500, "E", "error", { e });
  }
};

module.exports = {
  createProducts,
  findProductsByCategoryId,
  productsWithPagination,
  productsById,
  updateProducts,
  deleteProducts,
};
