import { schema } from 'normalizr';

const user = new schema.Entity('users', {}, { idAttribute: 'uid' });

export const usersSchema = user;
