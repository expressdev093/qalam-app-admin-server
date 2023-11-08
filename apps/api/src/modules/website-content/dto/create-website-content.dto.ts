import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WebsiteContentType } from '../enum/website-content-type.enum';

export class CreateWebsiteContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(WebsiteContentType)
  type: WebsiteContentType;
}
