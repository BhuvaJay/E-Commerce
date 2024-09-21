const Joi = require("joi");
const schema = Joi.object({
  productId: Joi.number(),

  name: Joi.string(),

  categoryId: Joi.number(),

  price: Joi.number(),

  image: Joi.string(),

  rating: Joi.number(),

  discount: Joi.number(),

  quantity: Joi.number(),
});

export const validateProductsData = async (req: any, res: any, next: any) => {
  try {
    const reqData = req.body;
    const value = await schema.validateAsync(reqData);
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
const getDataSchema = Joi.object({
  productId: Joi.string(),
});
export const getValidateData = async (req: any, res: any, next: any) => {
  try {
    const value = await getDataSchema.validateAsync({ productId: req.params.productId });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateDataSchema = Joi.object({
  productId: Joi.string(),
  reqBody: Joi.object({
    productId: Joi.number(),

    name: Joi.string(),

    categoryId: Joi.number(),

    price: Joi.number(),

    image: Joi.string(),

    rating: Joi.number(),

    discount: Joi.number(),

    quantity: Joi.number(),
  }),
});

export const updateValidateData = async (req: any, res: any, next: any) => {
  try {
    const validateData = { productId: req.params.productId, reqBody: req.body };
    const value = await updateDataSchema.validateAsync(validateData);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

const paginationSchema = Joi.object({
  sortBy: Joi.string(),
  limit: Joi.number(),
  skip: Joi.string(),
});

export const paginationValidateData = async (req: any, res: any, next: any) => {
  try {
    const value = await paginationSchema.validateAsync(req.query);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
