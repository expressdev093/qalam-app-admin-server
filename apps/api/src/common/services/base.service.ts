import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/modules/utils/utils.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../base';

@Injectable()
export class BaseService<T extends BaseEntity, CDTO = {}, UDTO = {}> {
  protected readonly utilsService: UtilsService;

  constructor(private readonly repository: Repository<T>) {
    this.utilsService = new UtilsService();
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findAllBy(params: any) {
    const { _end, _start, _order, _sort, ...rest } = params;
    const options = await this.utilsService.parseParams<T>(params);

    if (_start && _end) {
      const data = await this.repository.findAndCount({});
      return {
        data: data[0],
        count: data[1],
      };
    }
    return this.repository.find({
      ...options,
    });
  }

  async findAllByAndCount(params: any) {
    const { _end, _start, _order, _sort, c_limit, ...rest } = params;
    const options = await this.utilsService.parseParams<T>(params);

    if (JSON.stringify(options.where) === '{}') {
      delete options.where;
    }

    if (JSON.stringify(options.order) === '{}') {
      delete options.order;
    }

    if (c_limit && parseInt(c_limit) === 1) {
      const data = await this.repository.find({
        ...options,
        take: c_limit,
      });
      return {
        count: 1,
        data: data.length > 0 ? data[0] : undefined,
      };
    } else {
      const data = await this.repository.findAndCount({
        ...options,
        take: c_limit ? c_limit : options.take,
      });
      return {
        data: data[0],
        count: data[1],
      };
    }
  }

  async findOne(id: number, params?: any) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    } as any);
  }

  async countBy(params: any) {
    const { _end, _start, _order, _sort, ...rest } = params;
    const options = await this.utilsService.parseParams<T>(params);
    if (JSON.stringify(options.where) === '{}') {
      delete options.where;
    }

    if (JSON.stringify(options.order) === '{}') {
      delete options.order;
    }

    const data = await this.repository.count({
      ...options,
    });
    return data;
  }

  async findOneByParams(id: number, params: any) {
    const { _end, _start, _order, _sort, ...rest } = params;
    const options = await this.utilsService.parseParams<T>(params);
    if (JSON.stringify(options.where) === '{}') {
      delete options.where;
    }

    if (JSON.stringify(options.order) === '{}') {
      delete options.order;
    }

    return this.repository.findOne({
      ...options,
      where: {
        id: id,
        ...options.where,
      },
    } as any);
  }

  async findOneBy(where?: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  async create(createDto: CDTO): Promise<T> {
    const createNew = this.repository.create(createDto as any);
    return this.repository.save(createNew as any);
  }

  async update(id: number, updateDto: UDTO): Promise<T> {
    const obj = await this.findOneBy({ id } as any);

    return this.repository.save({ ...obj, ...updateDto });
  }

  async remove(id: number): Promise<T> {
    const obj = await this.findOneBy({ id } as any);
    return await this.repository.remove(obj);
  }

  async count(where?: FindOptionsWhere<T>): Promise<number> {
    return this.repository.countBy(where);
  }
}
