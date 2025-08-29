import { Request, Response, NextFunction } from 'express';
import { Item, items } from '../models/item';
import * as db from '../db/queries';

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

export const itemListGet = async (req: Request, res: Response) => {
  try {
    const items = await db.getAllItems();
    res.render('index', {
      title: 'Items',
      items,
      path: req.path,
    });
  } catch (error) {
    console.log('Error while getting items: ', error);
  }
};
