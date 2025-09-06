import * as db from '@db/queries';
import { Request, Response, NextFunction } from 'express';

// Check credentials
export const checkCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    if (username && password) {
      const adminDetails = await db.getAdminCredentials();
      if (
        adminDetails.username === username &&
        adminDetails.password === password
      ) {
        return res.json({ success: true });
      }
    }
    return res
      .status(401)
      .json({ success: false, message: 'Invalid Credentials' });
  } catch (error) {
    next(error);
    console.log('Error on credentials: ', error);
  }
};
