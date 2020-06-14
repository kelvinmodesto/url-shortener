import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

import MongoDBStrategy from './mongoDBStrategy.ts';

const mongoDBStrategy = new MongoDBStrategy('address');
const db = mongoDBStrategy.getClient().database(mongoDBStrategy.getDatabase());
const address = db.collection('address');

const dateNow = Date.now();
const MOCK_ADDRESS = {
  URL: 'http://deno.land',
  encodedURL: 'abc123456',
  date: dateNow
};
const MOCK_SECOND_ADDRESS = {
  URL: 'http://node.org',
  encodedURL: 'node123',
  date: dateNow
};

const cleanCollection = async () => {
  await address.deleteMany({});
};

Deno.test('check if database is really connected', async () => {
  assertEquals(await mongoDBStrategy.isConnected(), true);
});

Deno.test('check if was successfully insert one', async () => {
  await cleanCollection();

  const insertId: ObjectId = await mongoDBStrategy.create(MOCK_ADDRESS);

  assertEquals(Object.keys(insertId), ["$oid"]);
  const addressId = await address.findOne({
    _id: ObjectId(insertId.$oid)
  });

  assertEquals(addressId, {
    _id: insertId,
    URL: 'http://deno.land',
    encodedURL: 'abc123456',
    date: dateNow
  });
});

Deno.test('check if was successfully insert many', async () => {
  await cleanCollection();

  await mongoDBStrategy.create([MOCK_ADDRESS, MOCK_SECOND_ADDRESS], true);

  const addresses = await address.find({
    date: dateNow
  });
  assertEquals(addresses.length, 2);

});

Deno.test('check if was successfully read one', async () => {
  await cleanCollection();

  const insertId: ObjectId = await address.insertOne(MOCK_ADDRESS);

  const addressId = await mongoDBStrategy.read({ _id: ObjectId(insertId.$oid) });

  assertEquals(addressId, {
    _id: insertId,
    URL: 'http://deno.land',
    encodedURL: 'abc123456',
    date: dateNow
  });
});

Deno.test('check if was successfully read many', async () => {
  await cleanCollection();

  await address.insertMany([MOCK_ADDRESS, MOCK_SECOND_ADDRESS]);

  const addresses = await mongoDBStrategy.read({ date: dateNow }, true);

  assert(addresses instanceof Array);
  assertEquals(addresses.length, 2);

});

Deno.test('check if was successfully update one', async () => {
  await cleanCollection();

  const insertId: ObjectId = await address.insertOne(MOCK_ADDRESS);
  const result = await mongoDBStrategy.update(insertId.$oid, {
    URL: 'https://nodejs.org/',
    encodedURL: 'node123',
  });
  const addressId = await address.findOne({
    _id: ObjectId(insertId.$oid)
  });

  assertEquals(result.matchedCount, 1);
  assertEquals(result.modifiedCount, 1);
  assertEquals(addressId, {
    _id: insertId,
    URL: 'https://nodejs.org/',
    encodedURL: 'node123',
    date: dateNow
  });
});

Deno.test('check if was successfully delete one', async () => {
  await cleanCollection();

  const insertId: ObjectId = await address.insertOne(MOCK_ADDRESS);
  assertEquals(Object.keys(insertId), ["$oid"]);

  const addressId = await address.findOne({
    _id: ObjectId(insertId.$oid)
  });
  const result = await mongoDBStrategy.delete(addressId.$oid)
  assertEquals(result, 1);
});
