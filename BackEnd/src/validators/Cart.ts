const Joi = require("joi");
const schema = Joi.object({
  id: Joi.number(),

  productId: Joi.number(),

  name: Joi.string(),

  categoryId: Joi.number(),

  price: Joi.number(),

  image: Joi.string(),

  rating: Joi.number(),

  discount: Joi.number(),

  quantity: Joi.number(),

  userid: Joi.number(),
});

export const validateCartData = async (req: any, res: any, next: any) => {
  try {
    const reqData = req.body;
    const value = await schema.validateAsync(reqData);
    next();
  } catch (err) {
    console.log('err---->Validator', err)
    res.status(400).send(err);
  }
};
const getDataSchema = Joi.object({
  id: Joi.string(),
});
export const getValidateData = async (req: any, res: any, next: any) => {
  try {
    const value = await getDataSchema.validateAsync({ id: req.params.id });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateDataSchema = Joi.object({
  id: Joi.string(),
  reqBody: Joi.object({
    id: Joi.number(),

    productId: Joi.number(),

    name: Joi.string(),

    categoryId: Joi.number(),

    price: Joi.number(),

    image: Joi.string(),

    rating: Joi.number(),

    discount: Joi.number(),

    quantity: Joi.number(),

    userid: Joi.number(),
  }),
});

export const updateValidateData = async (req: any, res: any, next: any) => {
  try {
    const validateData = { id: req.params.id, reqBody: req.body };
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
