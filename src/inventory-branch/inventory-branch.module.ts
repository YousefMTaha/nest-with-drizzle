import { Module } from '@nestjs/common';
import { InventoryBranchController } from './inventory-branch.controller';
import { InventoryBranchService } from './inventory-branch.service';

@Module({
  controllers: [InventoryBranchController],
  providers: [InventoryBranchService],
  exports: [InventoryBranchService],
})
export class InventoryBranchModule {}
