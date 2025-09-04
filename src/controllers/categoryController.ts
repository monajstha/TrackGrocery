import { Request, Response, NextFunction } from 'express';
import { Category } from 'src/models/category';
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
    res.status(201).redirect('/categories');
  } catch (error) {
    next(error);
  }
};

// Update Category Form Get
export const categoryUpdateFormGet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category_id } = req?.params;
    if (!category_id) return;
    const categoryDetails = await db.getCategoryDetails(category_id);
    res.render('updateCategory', {
      title: 'Categories',
      path: req.baseUrl + req.path,
      categoryDetails,
    });
  } catch (error) {
    console.log('Error while getting update category form: ', error);
  }
};

// Update category
export const categoryUpdatePut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category_id } = req.params;
    await db.updateCategory({ category_id, ...req.body });
    res.status(201).redirect('/categories');
  } catch (error) {
    next(error);
  }
};

// Get all categories
export const categoryListGet = async (req: Request, res: Response) => {
  try {
    const categories = await db.getAllCategories();
    const categoriesWithCount = await Promise.all(
      categories?.map(async (cat) => {
        const { count } = await db.categoryReferencedByItemsCount(
          cat.category_id,
        );
        return {
          ...cat,
          item_count: count,
        };
      }),
    );
    res.render('categories', {
      title: 'Categories',
      categories: categoriesWithCount,
      path: req.baseUrl + req.path,
    });
  } catch (error) {
    console.log('Error while getting categories: ', error);
  }
};

// Delete category
export const categoryDelete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category_id } = req.params;
    await db.deleteCategory(category_id);
    res.status(200).redirect('/categories');
  } catch (error) {
    console.log('Error while deleting category: ', error);
    next(error);
  }
};
