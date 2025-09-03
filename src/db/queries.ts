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
    const query = `
        INSERT INTO categories (
        category_name
        ) VALUES ($1)
    `;
    const values = [name];
    await pool.query(query, values);
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
    let values = [];
    if (category) {
      query += ' WHERE category_id = $1';
      values.push(category);
    }
    const { rows } = await pool.query(query, values);
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
    const query = `
      INSERT INTO items (
        item_name,
        item_description,
        item_image,
        item_price, 
        item_quantity, 
        category_id 
        ) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [
      item_name,
      item_description,
      item_image,
      item_price,
      item_quantity,
      category_id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.log('Error while inserting new Item: ', error);
  }
};

export const getItemDetails = async (item_id: string) => {
  try {
    const query = `
        SELECT * FROM items
        WHERE
        item_id = $1`;
    const values = [item_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.log('Error while updating item: ', error);
  }
};

export const updateItem = async ({
  item_id,
  item_name,
  item_description,
  item_image,
  item_price,
  item_quantity,
  category_id,
}: Item) => {
  try {
    const query = `
        UPDATE items
        SET 
            item_name = $1,
            item_description = $2,
            item_image = $3,
            item_price = $4,
            item_quantity = $5,
            category_id = $6,
            updated_at = NOW()
        WHERE item_id = $7`;
    const values = [
      item_name,
      item_description,
      item_image,
      item_price,
      item_quantity,
      category_id,
      item_id,
    ];
    await pool.query(query, values);
  } catch (error) {
    console.log('Error while updating Item: ', error);
  }
};

export const deleteItem = async (item_id: any) => {
  try {
    const query = `
        DELETE FROM items
        WHERE
        item_id = $1`;
    const values = [item_id];
    await pool.query(query, values);
  } catch (error) {
    console.log('Error while deleting item from db:', error);
  }
};
