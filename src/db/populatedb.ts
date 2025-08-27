import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

// Creating Categories table
const SQL_CREATE_TABLE_CATEGORIES = `
  CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

// Insert query for categories
const SQL_INSERT_QUERY_CATEGORIES = `INSERT INTO categories (category_name) VALUES ($1)`;

// Dummy Categories
const CATEGORIES = ['Bakery', 'Dairy', 'Produce', 'Meat', 'Pantry'];

// Creating Subcategories table
const SQL_CREATE_TABLE_SUBCATEGORIES = `
  CREATE TABLE IF NOT EXISTS subcategories (
    subcategory_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    subcategory_name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(category_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

// Insert query for subcategories
const SQL_INSERT_QUERY_SUBCATEGORIES = `INSERT INTO subcategories (subcategory_name, category_id) VALUES ($1, $2)`;

// Dummy Subcategories
const SUBCATEGORIES = [
  {
    name: 'Vegetables',
    category_id: 3,
  },
  {
    name: 'Fruits',
    category_id: 3,
  },
  {
    name: 'Dry Goods',
    category_id: 5,
  },
  {
    name: 'Canned Goods',
    category_id: 5,
  },
  {
    name: 'Baking',
    category_id: 5,
  },
  {
    name: 'Condiments and Spices',
    category_id: 5,
  },
];

const SQL_CREATE_TABLE_ITEMS = `
CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR(255) NOT NULL,
  item_description VARCHAR (255) NOT NULL,
  item_image VARCHAR(255) NOT NULL,
  item_price INTEGER NOT NULL,
  item_quantity INTEGER NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(category_id),
  subcategory_id INTEGER REFERENCES subcategories(subcategory_id) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const SQL_INSERT_QUERY_ITEMS = `INSERT INTO items (item_name, item_description, item_image, item_price, item_quantity, category_id, subcategory_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const ITEMS = [
  {
    item_name: ['Bread', 'Croissants', 'Pie', 'Sugar'],
    item_description: ['My bread', 'My Croissants', 'My Pie', 'My Sugar'],
    item_image: [
      'https://media.istockphoto.com/id/1356634353/photo/sliced-bread-loaf-on-the-table.jpg?s=612x612&w=0&k=20&c=NuLDyFO2kUmEll11I2vV95vGPoQyfGhRkO2PeGtecD4=',
      'https://media.istockphoto.com/id/147987270/photo/fresh-baked-croissants.jpg?s=612x612&w=0&k=20&c=7fEdqVxlvRK80hpGGEMGyw-_Cpi1ipb1D2rTim5yTuI=',
      'https://media.istockphoto.com/id/450752471/photo/homemade-organic-apple-pie-dessert.jpg?s=612x612&w=0&k=20&c=6mwKTunGfRKFWyB_VUOGqXzcUMtBSCvg6JAQ3At2aWE=',
      'https://img.freepik.com/free-photo/world-diabetes-day-sugar-wooden-bowl-dark-surface_1150-26666.jpg?semt=ais_hybrid&w=740&q=80',
    ],
    item_price: [2, 3, 4, 3],
    item_quantity: [2, 3, 1, 2],
    category_id: 1,
    subcategory_id: null,
  },
  {
    item_name: 'Yogurt',
    item_description: 'I love Yogurt',
    item_image:
      'https://media.istockphoto.com/id/515777808/photo/yogurt.jpg?s=612x612&w=0&k=20&c=1xNf2q0hmndqAbqyTUUv6F_GbBhhCZkGHbiOERz91LE=',
    item_price: 3,
    item_quantity: 1,
    category_id: 2,
    subcategory_id: null,
  },
  {
    item_name: ['Broccoli', 'Cauliflower', 'Lettuce'],
    item_description: ['My Broccoli', 'My Cauliflower', 'My Lettuce'],
    item_image: [
      'https://media.istockphoto.com/id/1364035705/photo/fresh-broccoli-on-white-background.jpg?s=612x612&w=0&k=20&c=fEcEq65rKBmT8PltpAyg_-na0WomTJ6S6m04uXQQtJs=',
      'https://media.istockphoto.com/id/90634594/photo/close-up-of-several-heads-of-cauliflower.jpg?s=612x612&w=0&k=20&c=hpYY7BqSUNwM-oq26wNv5pGLSPf4HijXr3zA0J3yd0E=',
      'https://media.istockphoto.com/id/535910387/photo/ripe-organic-green-salad-romano.jpg?s=612x612&w=0&k=20&c=9GTcj_WqUk9LWkzUb6g4MCnLTPAapT_hNMZCHRd3C1U=',
    ],
    item_price: [3, 4, 5],
    item_quantity: [1, 2, 1],
    category_id: 5,
    subcategory_id: 1,
  },
];

const main = async () => {
  console.log('Seeding Database...');
  const client = new Client({
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  });
  try {
    await client.connect();

    // For Categories
    await client.query(SQL_CREATE_TABLE_CATEGORIES);
    for (let category of CATEGORIES) {
      await client.query(SQL_INSERT_QUERY_CATEGORIES, [category]);
    }

    // For Subcategories
    await client.query(SQL_CREATE_TABLE_SUBCATEGORIES);
    for (let subcategory of SUBCATEGORIES) {
      await client.query(SQL_INSERT_QUERY_SUBCATEGORIES, [
        subcategory.name,
        subcategory.category_id,
      ]);
    }

    // For Items
    await client.query(SQL_CREATE_TABLE_ITEMS);
    for (let item of ITEMS) {
      const {
        item_name,
        item_description,
        item_image,
        item_price,
        item_quantity,
        category_id,
        subcategory_id,
      } = item;
      if (
        Array.isArray(item_name) &&
        Array.isArray(item_price) &&
        Array.isArray(item_quantity)
      ) {
        for (let i = 0; i < item_name?.length; i++) {
          console.log(
            'INSIDE IF',
            item_name[i],
            item_description[i],
            item_image[i],
            item_price[i],
            item_quantity[i],
            category_id,
            subcategory_id,
          );

          await client.query(SQL_INSERT_QUERY_ITEMS, [
            item_name[i],
            item_description[i],
            item_image[i],
            item_price[i],
            item_quantity[i],
            category_id,
            subcategory_id,
          ]);
        }
      } else {
        console.log(
          'INSIDE ELSE',
          item_name,
          item_description,
          item_image,
          item_price,
          item_quantity,
          category_id,
          subcategory_id,
        );
        await client.query(SQL_INSERT_QUERY_ITEMS, [
          item_name,
          item_description,
          item_image,
          item_price,
          item_quantity,
          category_id,
          subcategory_id,
        ]);
      }
    }
    console.log('Seeding Completed');
  } catch (error) {
    console.log('Error seeding database', error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

main();
