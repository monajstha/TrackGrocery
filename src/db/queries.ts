import pool from './pool';
import { Item, items } from 'src/models/item';
import { Category } from 'src/models/category';

export const getAllCategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories');
    console.log({ rows });
    return rows;
  } catch (error) {
    console.log('Error while getting Categories: ', error);
  }
};

export const getAllSubcategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM subcategories');
    return rows;
  } catch (error) {
    console.log('Error while getting Subcategories: ', error);
  }
};

export const getAllItems = async (category: any) => {
  try {
    let query = 'SELECT * FROM items';
    let params = [];
    if (category) {
      query += ' WHERE category_id = $1';
      params.push(category);
    }
    const { rows } = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log('Error while getting Items: ', error);
  }
};
