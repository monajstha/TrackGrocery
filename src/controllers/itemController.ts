import { Request, Response, NextFunction } from 'express';
import { Item, items } from '../models/item';

// Create an item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quantity, category_id, subcategory_id } =
      req.body;
    const newItem = {
      name,
      description,
      price,
      quantity,
      category_id,
      subcategory_id,
    };
    // items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};
