import { IsEmail,  IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContactDetailsDto {
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @ValidateNested() // to validate the contactDetails object
  @Type(() => ContactDetailsDto)
  contactDetails: ContactDetailsDto;
}
