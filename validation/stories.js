import Joi from 'joi';

export const createStorySchema = Joi.object({
  storyImage: Joi.binary()
    .max(2 * 1024 * 1024)
    .required()
    .messages({
      'binary.base': 'The storyImage must be a valid file',
      'binary.max': 'The file size cannot exceed 2MB',
      'any.required': 'The storyImage field is required',
    }),
  title: Joi.string().max(80).required().messages({
    'string.max': 'The title cannot exceed 80 characters',
    'any.required': 'The title field is required',
  }),
  description: Joi.string().max(2500).required().messages({
    'string.max': 'The description cannot exceed 2500 characters',
    'any.required': 'The title field is required',
  }),
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid categoryId format',
      'any.required': 'The category field is required',
    }),
});

export const updateStorySchema = Joi.object({
  storyImage: Joi.binary()
    .max(2 * 1024 * 1024)
    .optional()
    .messages({
      'binary.base': 'The storyImage must be a valid file',
      'binary.max': 'The file size cannot exceed 2MB',
    }),
  title: Joi.string().max(80).optional().messages({
    'string.max': 'The title cannot exceed 80 characters',
  }),
  description: Joi.string().max(2500).optional().messages({
    'string.max': 'The description cannot exceed 2500 characters',
  }),
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid categoryId format',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });
