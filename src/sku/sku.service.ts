import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { eq, like, or } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { CreateSkuDto } from './dtos/Create-SKU.dto';
import * as bwipjs from 'bwip-js';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class SKUService {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  private async generateBarcodeData(skuCode: string): Promise<string> {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',
      text: skuCode,
      scale: 3,
      height: 10,
      includetext: true,
    });
    return `data:image/png;base64,${png.toString('base64')}`;
  }

  private async generateQRCodeData(skuCode: string): Promise<string> {
    const qrData = await QRCode.toDataURL(skuCode);
    return qrData;
  }

  private async checkSKUCodeUniqueness(skuCode: string) {
    const existingSku = await this.db.query.skus.findFirst({
      where: eq(schema.skus.skuCode, skuCode),
    });
    if (existingSku) {
      throw new ConflictException('SKU code already exists');
    }
  }

  async create(createSkuDto: CreateSkuDto) {
    let skuCode = createSkuDto.skuCode;
    if (skuCode) {
      await this.checkSKUCodeUniqueness(skuCode);
    } else {
      skuCode = uuidv4();
    }
    const barcodeData = await this.generateBarcodeData(skuCode);
    const qrCodeData = await this.generateQRCodeData(skuCode);

    const skuData = {
      name: createSkuDto.name,
      skuCode,
      category: createSkuDto.category,
      subcategory: createSkuDto.subcategory,
      brandName: createSkuDto.brandName,
      branchId: createSkuDto.branchId,
      barcodeData,
      qrCodeData,
    };

    const [sku] = await this.db.insert(schema.skus).values(skuData).returning();

    return sku;
  }

  async search(query: string) {
    const result = await this.db.query.skus.findMany({
      where: or(
        like(schema.skus.name, `%${query}%`),
        like(schema.skus.skuCode, `%${query}%`),
        like(schema.skus.category, `%${query}%`),
      ),
    });

    if (result.length === 0) {
      throw new NotFoundException(`No SKU found with query "${query}"`);
    }
    return result;
  }

  async deactivate(id: number) {
    const updateData = {
      isActive: false,
      updatedAt: new Date(),
    };

    const [sku] = await this.db
      .update(schema.skus)
      .set(updateData as any)
      .where(eq(schema.skus.id, id))
      .returning();

    if (!sku) {
      throw new NotFoundException(`SKU with ID "${id}" not found`);
    }

    if (!sku.isActive) {
      throw new BadRequestException(`SKU already deactivated`);
    }

    return sku;
  }

 
}
