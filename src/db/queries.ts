import pool from './pool';
import { Item, items } from 'src/models/item';
import { Category } from 'src/models/category';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
  } catch (error) {
    console.log('Error while getting Categories: ', error);
    throw error;
  }
};

export const getCategoryDetails = async (category_id: string) => {
  try {
    const query = `
        SELECT * FROM categories
        WHERE category_id = $1`;
    const values = [category_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
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

export const updateCategory = async ({
  category_id,
  category_name,
}: Category) => {
  try {
    const query = `
          UPDATE categories
          SET 
              category_name = $1,
              updated_at = NOW()
          WHERE category_id = $2`;
    const values = [category_name, category_id];
    await pool.query(query, values);
  } catch (error) {
    console.log('Error while updating Item: ', error);
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

export const categoryReferencedByItemsCount = async (category_id: any) => {
  try {
    const query = `
        SELECT 
        COUNT(*) 
        FROM 
        items
        WHERE 
        category_id = $1`;
    const values = [category_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.log(
      'Error while getting the number of items referenced to a category: ',
      error,
    );
  }
};

export const deleteCategory = async (category_id: any) => {
  try {
    const deletedCategoryReferenceNullQuery = `
        UPDATE items
        SET category_id = NULL
        WHERE category_id = $1
    `;

    const deleteCategoryQuery = `
          DELETE FROM categories
          WHERE
          category_id = $1`;
    const values = [category_id];
    await pool.query(deletedCategoryReferenceNullQuery, values);
    await pool.query(deleteCategoryQuery, values);
  } catch (error) {
    console.log('Error while deleting category from db:', error);
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
    query += ' ORDER BY item_id';
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
      typeof item_price === 'number' ? item_price.toFixed(2) : item_price,
      item_quantity,
      category_id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.log('Error while inserting new Item db: ', error);
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

export const getAdminCredentials = async () => {
  try {
    const query = `
            SELECT * FROM admin
            WHERE 
            admin_id = $1
            `;
    const values = [1];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.log('Error while getting admin credentials from db: ', error);
  }
};
