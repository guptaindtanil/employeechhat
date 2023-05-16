import mongoose from 'mongoose';
import userModel from '@modules/users/schema';
import { IUser } from '@modules/users/model';

export const getAllUserDetails = async (id: string): Promise<IUser[] | null> => {
  const condition = { _id: { $ne: new mongoose.Types.ObjectId(id) } };
  const selection = {
    _id: 1,
    name: 1,
    email: 1,
    phonenumber: 1
  };
  const userDetails = await userModel.find(condition, selection);
  return userDetails;
};
