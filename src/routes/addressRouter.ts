import { Router } from 'https://deno.land/x/oak/mod.ts'

import { AddressController } from '../controllers/addressController.ts';
import MongoDBStrategy from '../db/mongoDBStrategy.ts';

const mongoDBStrategy = new MongoDBStrategy('address');
const addressRouter = () => {
  const addressController = new AddressController(Router(), mongoDBStrategy);
  return addressController.router;
};

export default addressRouter;
