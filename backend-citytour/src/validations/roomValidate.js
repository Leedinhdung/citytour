import Joi from "joi";

const baseSchema = {
	cruise_id: Joi.string(),
	name: Joi.string(),
	slug: Joi.string(),
	price: Joi.number(),
	area: Joi.number(),
	features: Joi.array().items(Joi.string()),
	max_guests: Joi.number(),
	image: Joi.string().uri(),
	thumbnail: Joi.array().items(Joi.string().uri()),
	status: Joi.string().valid("available", "booked", "maintenance"),
	isDeleted: Joi.date().allow(null).default(null),
};

const createRoomSchema = Joi.object({
	cruise_id: Joi.string().required(),
	name: Joi.string().min(5).required(),
	slug: Joi.string().required(),
	price: Joi.number().required(),
	area: Joi.number().required(),
	features: Joi.array().items(Joi.string()).required(),
	max_guests: Joi.number().required(),
	image: Joi.string().uri().required(),
	thumbnail: Joi.array().items(Joi.string().uri()).required(),
	status: baseSchema.status, // optional
	isDeleted: baseSchema.isDeleted, // optional
});

const updateRoomSchema = Joi.object({
	...baseSchema,
	_id: Joi.any().strip(),
	__v: Joi.any().strip(),
}).min(1);

export default { createRoomSchema, updateRoomSchema };
