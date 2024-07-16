import type { Context } from 'elysia';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';
import log from 'utils/log.utils.ts';
import webhookRoutes from 'root/routes/webhook.routes.ts';
import { sequelize } from 'root/database/models/index.ts';

export type BunContext = Context;

const app = new Elysia();

app
  .onStop(() => {
    log.warn('🦊 Elysia is shutting down...');
  })

  .onStart(async () => {
    log.info('🦊 Elysia is starting...');
    await sequelize.authenticate();
  })

  .onError(({ error, set }) => {
    log.error('Error', error);
    return formatErrorsUtils(error, { set, status: 500 });
  })

  .onBeforeHandle((ctx) => {
    /**
     * If the body is empty, set it to an empty object elysia parsing errors
     */
    if (!ctx.body) ctx.body = {};
  })

  .use(
    cors({
      // Only allow the origin to be the production domain and its subdomains.
      origin: '*',
      // Only allow the following headers.
      allowedHeaders: ['Authorization', 'content-type', 'x-forwarded-for'],
      // Allow the following methods.
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    }),
  )

  .get('/status', () => ({ success: true }))
  .group(<''>'/webhooks', <any>webhookRoutes)

  .listen(Bun.env.PORT);

if (app.server) log.info(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port}`);
