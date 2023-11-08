import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateBoardClassDto } from './dto/create-board-class.dto';
import { UpdateBoardClassDto } from './dto/update-board-class.dto';
import { BoardClass } from './entities/board-class.entity';

@Injectable()
export class BoardClassesService extends BaseService<BoardClass , CreateBoardClassDto, UpdateBoardClassDto> {

  constructor(
    @InjectRepository(BoardClass)
    private readonly boardClassRepository: Repository<BoardClass>
  ) {
    super(boardClassRepository)
  }
 
}
