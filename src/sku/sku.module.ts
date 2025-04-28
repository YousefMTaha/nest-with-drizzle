import { Module } from '@nestjs/common';
import { SKUController } from './sku.controller';
import { SKUService } from './sku.service';
import { InventoryBranchModule } from 'src/inventory-branch/inventory-branch.module';

@Module({
  imports: [InventoryBranchModule],
  controllers: [SKUController],
  providers: [SKUService],
  exports: [SKUService],
})
export class SKUModule {}
