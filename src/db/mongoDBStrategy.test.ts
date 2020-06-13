import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import ContextStrategy from './contextStrategy.ts';
import MongoDBStrategy from './mongoDBStrategy.ts';

const mongoDBStrategy = new ContextStrategy(new MongoDBStrategy(MongoDBStrategy.connect(), 'address'));

Deno.test('test mongo', () => {
  assertEquals(1, 1);
});
