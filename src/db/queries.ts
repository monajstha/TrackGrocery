import pool from './pool';
import { Item, items } from 'src/models/item';
import { Category } from 'src/models/category';

export const getAllCategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
  } catch (error) {
    console.log('Error while getting Categories: ', error);
  }
};

export const insertNewCategory = async (name: String) => {
  try {
    await pool.query(`INSERT INTO categories (category_name) VALUES ($1)`, [
      name,
    ]);
  } catch (error) {
    console.log('Error while inserting new Category: ', error);
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

export const insertNewItem = async ({
  item_name,
  item_description,
  item_image,
  item_price,
  item_quantity,
  category_id,
}: Item) => {
  try {
    await pool.query(
      `INSERT INTO items (item_name, item_description, item_image, item_price, item_quantity, category_id ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        item_name,
        item_description,
        item_image,
        item_price,
        item_quantity,
        category_id,
      ],
    );
  } catch (error) {
    console.log('Error while inserting new Category: ', error);
  }
};
