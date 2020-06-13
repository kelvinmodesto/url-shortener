import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import MongoDBStrategy from './mongoDBStrategy.ts';

const mongoDBStrategy = new MongoDBStrategy('address');

const MOCK_ADDRESS = {
  address: 'http://deno.land',
  encodedAddress: 'abc123456'
};

Deno.test('check if a single address was successfully created', async () => {
  await mongoDBStrategy.create(MOCK_ADDRESS);

});

Deno.test('check if address was successfully read', async () => {

});

Deno.test('check if address was successfully updated', async () => {

});

Deno.test('check if address was successfully deleted', async () => {

});
