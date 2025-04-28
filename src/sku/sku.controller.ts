import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SKUService } from './sku.service';
import { CreateSkuDto } from './dtos/Create-SKU.dto';
import { InventoryBranchService } from 'src/inventory-branch/inventory-branch.service';

@ApiTags('sku')
@Controller('sku')
export class SKUController {
  constructor(
    private readonly skuService: SKUService,
    private readonly inventoryService: InventoryBranchService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new SKU' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'category', 'subcategory', 'brandName', 'branchId'],
      properties: {
        name: { type: 'string', example: 'iPhone 13' },
        branchId: { type: 'number', example: 1 },
        category: { type: 'string', example: 'Electronics' },
        subcategory: { type: 'string', example: 'Phones' },
        brandName: { type: 'string', example: 'Apple' },
        skuCode: { type: 'string', example: 'ELE-APP-000001' },
      },
    },
  })
  async create(@Body() body: CreateSkuDto) {
    // check if the branch id exist or not
    await this.inventoryService.findById(body.branchId);

    return this.skuService.create(body);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search SKUs with filters' })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'Search query for SKUs by name, category,SKU code',
  })
  async search(@Query('query') query: string) {
    return this.skuService.search(query);
  }

  @Put('deactivate/:id')
  @ApiOperation({ summary: 'Deactivate a SKU' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID of the SKU to deactivate',
  })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.deactivate(id);
  }
}
