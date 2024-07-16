import type { Elysia } from 'elysia';
import hubspotHandler from 'root/handlers/hubspot.handler.ts';

export default (app: Elysia): Elysia => {
  /**
   * Handles the HubSpot webhooks
   */
  app.get('/hubspot', hubspotHandler);

  /**
   * Handles the Notion webhooks
   */
  app.get('/notion', () => ({ success: true }));

  return app;
};
