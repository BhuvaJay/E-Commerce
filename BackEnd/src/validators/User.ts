import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNumber: Joi.number(),
  gender: Joi.string(),
  age: Joi.number(),
});


export const validateUserData = async (req: any, res: any, next: any) => {
  try {
    const reqData = req.body;
    const value = await schema.validateAsync(reqData);
    console.log('value', value)
    next();
  } catch (err) {
    console.log(err,"error from validation")
    res.status(400).send(err);
  }
};

const getDataSchema = Joi.object({
  userId: Joi.string(),
});


export const getValidateData = async (req: any, res: any, next: any) => {
  try {
    const value = await getDataSchema.validateAsync({ userId: req.params.userId });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateDataSchema = Joi.object({
  userId: Joi.string(),
  reqBody: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phoneNumber: Joi.number(),
    gender: Joi.string(),
    age: Joi.number(),
  }),
});


export const updateValidateData = async (req: any, res: any, next: any) => {
  try {
    const validateData = { userId: req.params.userId, reqBody: req.body };
    const value = await updateDataSchema.validateAsync(validateData);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};


const loginSchema = Joi.object({
  password: Joi.string(),
  // username: Joi.string(),
  email: Joi.string().email(),

});
export const loginValidationData = async (req:any, res:any, next:any) => {
  try {
    const reqData = req.body
    const value = await loginSchema.validateAsync(reqData);
    next();
  } catch (error) {
    res.status(400).send(error);

  }
}