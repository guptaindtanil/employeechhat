import userModel from '@modules/users/schema';

export const checkUniqueEmail = async (email: string): Promise<boolean> => {
  const condition = {
    email: {
      // eslint-disable-next-line no-useless-escape
      $regex: new RegExp('^' + email.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i'),
    },
  };

  const emailCount = await userModel.countDocuments(condition);

  return emailCount > 0 ? false : true;
};
