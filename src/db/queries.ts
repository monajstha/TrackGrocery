import pool from './pool';
import { Item, items } from 'src/models/item';

export const getAllCategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories');
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

export const getAllItems = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
  } catch (error) {
    console.log('Error while getting Items: ', error);
  }
};
