import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService extends BaseService<Board, CreateBoardDto , UpdateBoardDto> {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository : Repository<Board>
  ){
    super(boardRepository)
  }
 
}
