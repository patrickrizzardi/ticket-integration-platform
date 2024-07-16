/* eslint-disable @typescript-eslint/naming-convention */
declare module 'bun' {
  interface LogEnv {
    /**
     * This defaults to `info` if not set.
     */
    LOG_LEVEL?: string;

    /**
     * This defaults to `console` if not set.
     * You can add multiple transports by separating them with a comma.
     * For example: `LOG_TRANSPORTS=console,datadog,file`
     */
    LOG_TRANSPORTS?: 'console' | 'datadog' | 'file';

    /**
     * This defaults to `./storage/logs/app.log` if not set.
     */
    LOG_FILE?: string;

    /**
     * This is unused if you don't add `datadog` to `LOG_TRANSPORTS`.
     * If you use `datadog` as a transport, you must set this.
     */
    LOG_DATADOG_API_KEY?: string;
  }

  export interface Env extends LogEnv {
    NODE_ENV?: string;
    PORT: string;

    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_USER: string;
    DATABASE_PORT: string;
    DATABASE_HOST: string;
  }
}
