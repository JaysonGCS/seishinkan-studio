import type { InitOptions } from 'payload/config';
import type { Payload } from 'payload/dist/payload';

import dotenv from 'dotenv';
import path from 'path';
import payload from 'payload';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cached = global.payload;

if (!cached) {
  cached = global.payload = { client: null, promise: null };
}

interface Args {
  initOptions?: Partial<InitOptions>;
  seed?: boolean;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      local: initOptions?.express ? false : true,
      secret: process.env.PAYLOAD_SECRET,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return await cached.client;
};
