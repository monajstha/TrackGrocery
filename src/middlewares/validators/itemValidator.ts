// validators/itemValidator.ts
import { body } from 'express-validator';

export const validateNewItem = [
  body('item_name')
    .trim()
    .notEmpty()
    .withMessage('Item name is required.')
    .isLength({ max: 255 })
    .withMessage('Item name must not exceed 255 characters.'),

  body('item_description')
    .trim()
    .notEmpty()
    .withMessage('Item description is required.')
    .isLength({ max: 255 })
    .withMessage('Description must not exceed 255 characters.'),

  body('item_price')
    .notEmpty()
    .withMessage('Item price is required.')
    // allow decimal values with up to 2 fractional digits
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Item price must be a number with up to 2 decimal places.')
    .custom((val) => parseFloat(val) > 0)
    .withMessage('Item price must be greater than 0.'),

  body('item_quantity')
    .notEmpty()
    .withMessage('Item quantity is required.')
    .isInt({ min: 0 })
    .withMessage('Item quantity must be an integer 0 or more.'),

  body('category_id')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer if provided.'),

  // Validate the uploaded file using req in custom validator
  body('item_image').custom((_, { req }) => {
    // multer will set req.file when using upload.single('item_image')
    const file = (req as any).file;
    if (!file) {
      throw new Error('Item image is required.');
    }

    // mime check (in case fileFilter allowed/returned false)
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.mimetype)) {
      throw new Error('Only JPEG, PNG, WEBP or GIF images are allowed.');
    }

    // // size check (multer already enforces limits, but extra check here)
    // if (file.size > 2 * 1024 * 1024) {
    //   throw new Error('Image must be smaller than 2MB.');
    // }

    return true;
  }),
];
