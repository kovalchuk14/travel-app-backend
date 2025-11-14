import Joi from 'joi';

export const patchUserSchema = Joi.object({
    name: Joi.string().trim().min(3).max(32),
    email: Joi.string().email().trim().max(64),
    password: Joi.string().min(8).max(128),
    description: Joi.string().max(2500),
}).min(1)
    .messages({
        'object.min': 'At least one field must be provided for update',
    });

