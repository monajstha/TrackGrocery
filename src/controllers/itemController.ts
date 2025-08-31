import { Request, Response, NextFunction } from 'express';
import { Item, items } from '../models/item';
import * as db from '../db/queries';

// Get Add New Item Form
export const newItemFormGet = async (req: Request, res: Response) => {
  try {
    console.log('path', req.path);
    const categories = await db.getAllCategories();
    res.render('addNewItem', {
      title: 'Items',
      categories,
      path: req.path,
    });
  } catch (error) {
    console.log('Error while getting items: ', error);
  }
};

// Create an item
export const newItemPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('new item', req.body);
    await db.insertNewItem(req.body);
    res.status(201).redirect('/item/new');
  } catch (error) {
    next(error);
  }
};

export const itemListGet = async (req: Request, res: Response) => {
  try {
    const categories = await db.getAllCategories();
    const { category } = req.query;
    const items = await db.getAllItems(category);

    res.render('index', {
      title: 'Items',
      items,
      categories,
      path: req.path,
      selectedCategory: category,
    });
  } catch (error) {
    console.log('Error while getting items: ', error);
  }
};
