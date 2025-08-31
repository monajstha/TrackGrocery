import { Request, Response, NextFunction } from 'express';
import * as db from '../db/queries';

// Get category form
export const newCategoryFormGet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.render('addNewCategory', {
      title: 'Categories',
      path: req.path,
    });
  } catch (error) {
    console.log('Error while getting add new category form: ', error);
  }
};

// Create a cagegory
export const newCategoryPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category_name } = req.body;
    await db.insertNewCategory(category_name);
    res.status(201).redirect('/category/new');
  } catch (error) {
    next(error);
  }
};

// Get all categories
export const categoryListGet = async (req: Request, res: Response) => {
  try {
    const categories = await db.getAllCategories();

    res.render('header', {
      title: 'Categories',
      categories,
      path: req.path,
    });
  } catch (error) {
    console.log('Error while getting categories: ', error);
  }
};
