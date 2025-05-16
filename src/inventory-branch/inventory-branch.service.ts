import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { and, eq, ne } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';

@Injectable()
export class InventoryBranchService {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  private async checkBranchName(name: string) {
    const existingBranch = await this.db
      .select()
      .from(schema.inventoryBranches)
      .where(eq(schema.inventoryBranches.name, name));
    if (existingBranch.length > 0) {
      throw new ConflictException('Branch name already exists');
    }
  }
  async create(createBranchDto: CreateBranchDto) {
    await this.checkBranchName(createBranchDto.name);
    const [branch] = await this.db
      .insert(schema.inventoryBranches)
      .values(createBranchDto as any)
      .returning();
    return branch;
  }

  async findAll() {
    return await this.db.select().from(schema.inventoryBranches);
  }

  async findById(id: number) {
    const [branch] = await this.db
      .select()
      .from(schema.inventoryBranches)
      .where(eq(schema.inventoryBranches.id, id));

    if (!branch) {
      throw new NotFoundException(`Branch with ID "${id}" not found`);
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const updateData = {
      ...updateBranchDto,
      updatedAt: new Date(),
    } as any;

    if (updateBranchDto.name) {
      const isExist = await this.db.query.inventoryBranches.findFirst({
        where: and(
          eq(schema.inventoryBranches.name, updateBranchDto.name),
          ne(schema.inventoryBranches.id, id),
        ),
      });

      if (isExist) {
        throw new ConflictException('Name is already exist');
      }
    }

    const [updatedBranch] = await this.db
      .update(schema.inventoryBranches)
      .set(updateData)
      .where(eq(schema.inventoryBranches.id, id))
      .returning();

    if (!updatedBranch) {
      throw new NotFoundException(`Branch with ID "${id}" not found`);
    }
    return updatedBranch;
  }
}
