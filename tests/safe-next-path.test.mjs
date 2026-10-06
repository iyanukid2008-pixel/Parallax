import assert from 'node:assert/strict';
import test from 'node:test';
import { safeNextPath } from '../src/lib/safeNextPath.js';

test('allows an in-app route and its query/hash', () => {
  assert.equal(safeNextPath('/issue/1?tab=proposal#apply'), '/issue/1?tab=proposal#apply');
});

for (const destination of [
  '//example.com',
  '/\\example.com',
  'https://example.com',
  'javascript:alert(1)',
  '/login?next=/issue/1',
]) {
  test(`rejects unsafe destination ${destination}`, () => {
    assert.equal(safeNextPath(destination), '/explore');
  });
}
