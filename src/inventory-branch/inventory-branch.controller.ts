import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { InventoryBranchService } from './inventory-branch.service';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';

@ApiTags('inventory-branch')
@Controller('inventory-branch')
export class InventoryBranchController {
  constructor(private readonly branchService: InventoryBranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory branch' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'location', 'contactDetails'],
      properties: {
        name: { type: 'string', example: 'Main Warehouse' },
        location: { type: 'string', example: 'New York' },
        contactDetails: {
          type: 'object',
          required: ['phone', 'email', 'address'],
          properties: {
            phone: { type: 'string', example: '123-456-7890' },
            email: { type: 'string', example: 'warehouse@example.com' },
            address: { type: 'string', example: '123 Main St' },
          },
        },
      },
    },
  })
  async create(@Body() body: CreateBranchDto) {
    return this.branchService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory branches' })
  async findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific inventory branch' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID of the inventory branch to retrieve',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an inventory branch' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID of the inventory branch to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Warehouse' },
        location: { type: 'string', example: 'Chicago' },
        contactDetails: {
          type: 'object',
          properties: {
            phone: { type: 'string', example: '123-456-7890' },
            email: { type: 'string', example: 'updated@example.com' },
            address: { type: 'string', example: '456 New St' },
          },
        },
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(id, updateBranchDto);
  }
}
