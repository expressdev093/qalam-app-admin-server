import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
