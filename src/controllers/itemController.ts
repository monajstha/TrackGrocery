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
    console.log('Error while getting new item form: ', error);
  }
};

// Create an item
export const newItemPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image path', image_path, 'File:', req.file);
    await db.insertNewItem({ ...req.body, item_image: image_path });
    res.status(201).redirect('/item/new');
  } catch (error) {
    next(error);
  }
};

// Get items
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

// Get update item form
export const itemUpdateFormGet = async (req: Request, res: Response) => {
  try {
    const { item_id } = req?.params;
    if (!item_id) return;
    const categories = await db.getAllCategories();
    const itemDetails = await db.getItemDetails(item_id);
    res.render('updateItem', {
      title: 'Items',
      categories,
      path: req.path,
      itemDetails,
    });
  } catch (error) {
    console.log('Error while getting update item form: ', error);
  }
};

// Update an item
export const itemUpdatePut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { item_id } = req.params;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image path', image_path, 'File:', req.file);
    await db.updateItem({ item_id, ...req.body, item_image: image_path });
    res.status(200).redirect('/');
  } catch (error) {
    next(error);
    console.log('Error while updating item: ', error);
  }
};
