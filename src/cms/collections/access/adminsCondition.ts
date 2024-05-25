import type { Condition } from 'payload/types';

import type { User } from '../../../payload-types';

import { checkRole } from './checkRole';

export const adminsCondition: Condition<User> = (data) => {
  return checkRole(['admin'], data);
};
