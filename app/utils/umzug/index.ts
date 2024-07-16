/* eslint-disable max-classes-per-file */
import fs from 'fs';
import path from 'path';
import type Sequelize from '@sequelize/core';
import type { CommandLineParserOptions, MigrationFn, Promisable } from 'umzug';
import { SequelizeStorage, Umzug, UmzugCLI } from 'umzug';
import { sequelize } from 'root/database/models/index.ts';
import log from 'utils/log.utils.ts';

class MyUmzugCLI extends UmzugCLI {
  override async execute(): Promise<boolean> {
    try {
      await super.executeWithoutErrorHandlingAsync();
      return true;
    } catch (error) {
      log.error('Error running migrations', error);
      return false;
    }
  }
}

class MyUmzug extends Umzug {
  getCLI(options?: CommandLineParserOptions): MyUmzugCLI {
    return new MyUmzugCLI(this, options);
  }
}

const migrator = new MyUmzug({
  migrations: { glob: path.join(import.meta.dir, '../../database/migrations/*.ts') },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  create: {
    template: (filepath): Promisable<Array<[string, string]>> => [[filepath, fs.readFileSync(path.join(import.meta.dir, 'migrationTemplate.ts')).toString()]],
  },
});

export type Migration = MigrationFn<Sequelize>;
export { migrator };

try {
  await migrator.runAsCLI();
  process.exit(0);
} catch (error) {
  log.error('Error running migrations', error);
  process.exit(1);
}
