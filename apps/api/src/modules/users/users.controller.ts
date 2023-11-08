import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser, FileResponseDto, FileUploadDto, PathDto, Utils } from 'src/common';
import { UtilsService } from '../utils/utils.service';
import { Role } from './enum/role.enum';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'User registerd successfully.', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users list' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.usersService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 403, description: 'User not found.', type: User })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { password, ...user } = await this.usersService.findOne(+id);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiBody({
    description: 'User avatar',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'User avatar uploaded successfully',
    type: FileResponseDto,
  })
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('avatars'),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
    if (user.role === Role.User) {
      await this.usersService.removeAvatar(user.id);
      await this.usersService.update(user.id, { avatar: file.path });

      return file;
    }
    return file;
  }

  @ApiOperation({ summary: 'Remove user avatar' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: PathDto })
  @Put('avatar/remove')
  async removeImage(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
