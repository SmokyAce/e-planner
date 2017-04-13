import { schema } from 'normalizr';
import { omit } from 'lodash';

export const users = new schema.Entity('users', {}, {
    idAttribute    : 'uid',
    processStrategy: (entity) => {
        entity.events = {};
        return omit(entity, ['appName', 'authDomain', 'redirectEventId', 'stsTokenManager'])
    }
});
