import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export const visitorCookie = 'web3_course_visitor';
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;

export function createVisitCounter(filename) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec(`
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      visitors INTEGER NOT NULL,
      pageViews INTEGER NOT NULL
    );
    INSERT OR IGNORE INTO visits VALUES (1, 0, 0);
    CREATE TABLE IF NOT EXISTS visitor_ids (id TEXT PRIMARY KEY);
  `);
  const find = db.prepare('SELECT 1 FROM visitor_ids WHERE id = ?');
  const register = db.prepare('INSERT INTO visitor_ids VALUES (?)');
  const increment = db.prepare('UPDATE visits SET visitors = visitors + ?, pageViews = pageViews + 1 WHERE id = 1');
  const totals = db.prepare('SELECT visitors, pageViews FROM visits WHERE id = 1');

  return {
    record(candidate) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const known = typeof candidate === 'string' && uuid.test(candidate) && find.get(candidate);
        const visitorId = known ? candidate : randomUUID();
        if (!known) register.run(visitorId);
        increment.run(known ? 0 : 1);
        const result = { visitorId, ...totals.get() };
        db.exec('COMMIT');
        return result;
      } catch (error) {
        db.exec('ROLLBACK');
        throw error;
      }
    },
    close: () => db.close(),
  };
}
