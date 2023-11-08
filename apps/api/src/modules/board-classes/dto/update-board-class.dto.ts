import { PartialType } from '@nestjs/swagger';
import { CreateBoardClassDto } from './create-board-class.dto';

export class UpdateBoardClassDto extends PartialType(CreateBoardClassDto) {}
