import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import next from 'next';
import nextBuild from 'next/dist/build';
import path from 'path';

import { getPayloadClient } from './getPayload';

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const server = express();

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      email: {
        fromAddress: process.env.EMAIL_FROM ?? '',
        fromName: process.env.EMAIL_NAME ?? '',
        transportOptions: {
          auth: {
            pass: process.env.EMAIL_SERVER_PASSWORD,
            user: process.env.EMAIL_SERVER_USER,
          },
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          requireTLS: true,
          secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for port 465, false (the default) for 587 and others
        },
      },
      express: server,
      onInit: (newPayload) => {
        newPayload.logger.info(
          `Payload Admin URL: ${newPayload.getAdminURL()}`,
        );
      },
      secret: process.env.PAYLOAD_SECRET || '',
    },
  });

  if (process.env.NEXT_BUILD) {
    try {
      server.listen(PORT, async () => {
        payload.logger.info(`Next.js is now building...`);
        // Related discussion: https://github.com/vercel/next.js/discussions/46544
        await nextBuild(
          path.join(__dirname, '../'),
          undefined,
          undefined,
          false,
          undefined,
          undefined,
          undefined,
          'compile',
        );
        process.exit();
      });
    } catch (e) {
      process.exit();
    }
    return;
  }

  const nextApp = next({ dev });

  const nextHandler = nextApp.getRequestHandler();

  server.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started');

    server.listen(PORT, () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`,
      );
    });
  });
};

start();
