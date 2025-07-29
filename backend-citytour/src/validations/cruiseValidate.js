import Joi from "joi";

const baseCruiseSchema = {
	name: Joi.string(),
	slug: Joi.string(),
	operator: Joi.string(),
	trip: Joi.string(),
	stars: Joi.number().min(1).max(5),
	startDate: Joi.date(),
	endDate: Joi.date(),
	base_price: Joi.number(),
	launch_year: Joi.number(),
	cabin_count: Joi.number(),
	description: Joi.string(),
	introduction: Joi.string(),
	location: Joi.string(),
	features: Joi.array().items(Joi.string()),
	thumbnail: Joi.string().uri(),
	gallery: Joi.array().items(Joi.string().uri()),
	status: Joi.string().valid("available", "full", "closed"),
	isDeleted: Joi.date().allow(null).default(null),
};

const createCruiseSchema = Joi.object({
	name: Joi.string().min(3).required(),
	slug: Joi.string().required(),
	operator: Joi.string().required(),
	trip: Joi.string().required(),
	stars: Joi.number().min(1).max(5).required(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	base_price: Joi.number().required(),
	launch_year: Joi.number().required(),
	cabin_count: Joi.number().required(),
	description: Joi.string().required(),
	introduction: Joi.string().required(),
	location: Joi.string().required(),
	features: Joi.array().items(Joi.string()).required(),
	thumbnail: Joi.string().uri().required(),
	gallery: Joi.array().items(Joi.string().uri()).required(),
	status: baseCruiseSchema.status, // optional
	isDeleted: baseCruiseSchema.isDeleted, // optional
});

const updateCruiseSchema = Joi.object({
	...baseCruiseSchema,
	_id: Joi.any().strip(),
	__v: Joi.any().strip(),
}).min(1);

export default { createCruiseSchema, updateCruiseSchema };
