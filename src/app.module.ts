import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoryBranchModule } from './inventory-branch/inventory-branch.module';
import { SKUModule } from './sku/sku.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    InventoryBranchModule,
    SKUModule,
  ],
})
export class AppModule {}
