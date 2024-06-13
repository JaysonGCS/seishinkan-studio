import type { Logger } from 'pino';

import pino from 'pino';

export const logger: Logger = pino({
  redact: [], // prevent logging of sensitive data
  transport: {
    options: {
      colorize: true,
    },
    target: 'pino-pretty',
  },
});
