import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, Not } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginProvider } from './enum/login-provider.enum';
import { Role } from './enum/role.enum';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = createUserDto.password
      ? await bcrypt.hash(createUserDto.password, 10)
      : null;
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  findOneBy(where?: FindOptionsWhere<User>) {
    return this.userRepository.findOneByOrFail(where);
  }

  async findAll(params: any) {
    const { _end, _start, ...rest } = params;
    const options = await this.utilsService.parseParams<User>({ ...params, role_ne: Role.Admin });

    if (_start && _end) {
      const data = await this.userRepository.findAndCount({
        ...options,
      });
      return {
        data: data[0],
        count: data[1],
      };
    }
    return this.userRepository.find({
      ...options,
    });
  }

  async findAllByAndCount(params: any) {
    const { _end, _start, _order, _sort, ...rest } = params;
    const options = await this.utilsService.parseParams<User>(params);

    const data = await this.userRepository.findAndCount({
      ...options,
    });
    return {
      data: data[0],
      count: data[1],
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { password, ...body } = updateUserDto;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    return this.userRepository.save({
      ...user,
      ...body,
      password: password ? hashedPassword : hashedPassword,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user.avatar) {
      await this.utilsService.unlinkAsync(user.avatar);
    }
    return this.userRepository.remove(user);
  }

  async removeAvatar(id: number) {
    const user = await this.findOne(id);
    if (user.avatar) {
      await this.utilsService.unlinkAsync(user.avatar);
    }
  }
}
