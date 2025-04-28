import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get<string>('DB_URL'),
        });

        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DB'],
})
export class DbModule {}
