import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBoardClassDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    boardId: number;
  
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
