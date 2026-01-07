import Dexie from 'dexie';

export const db = new Dexie('FirmouDB');

db.version(1).stores({
    orcamentos: '++id, cliente, data, status, total',
    config: 'id, logo, cor_tema'
});

export default db;
