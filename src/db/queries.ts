import pool from "./pool";

export const getAllCategories = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  } catch (error) {}
};
