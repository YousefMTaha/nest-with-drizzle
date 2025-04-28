import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSkuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  skuCode?: string;

  @IsString()
  category: string;

  @IsString()
  subcategory: string;

  @IsString()
  brandName: string;

  @Type(() => Number)
  @IsNumber({},{message:"Branch ID required and must be a number"})
  branchId: number;

  @IsOptional()
  @IsString()
  barcodeData?: string;

  @IsOptional()
  @IsString()
  qrCodeData?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
