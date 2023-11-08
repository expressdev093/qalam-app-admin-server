import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { BaseEntity } from 'src/common';
import * as XLSX from 'xlsx';
import { join } from 'path';
import {
  Between,
  Equal,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';

export type CrudOperators =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'gt'
  | 'lte'
  | 'gte'
  | 'in'
  | 'nin'
  | 'like'
  | 'ilike'
  | 'ncontains'
  | 'containss'
  | 'ncontainss'
  | 'between'
  | 'nbetween'
  | 'null'
  | 'nnull'
  | 'startswith'
  | 'nstartswith'
  | 'startswiths'
  | 'nstartswiths'
  | 'endswith'
  | 'nendswith'
  | 'endswiths'
  | 'nendswiths'
  | 'or'
  | 'and';

interface Condition {
  name: string;
  condition: CrudOperators;
  value: any;
}
@Injectable()
export class UtilsService {
  private logger = new Logger(UtilsService.name);
  public unlinkAsync = async (filePath?: string): Promise<boolean> => {
    if (filePath === undefined || filePath === null) return false;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    } else {
      return false;
    }
  };

  public getCondtitons = (query: any, isCamel: boolean = false) => {
    const { _start, _end, ...rest } = query;
    const conditions: Condition[] = [];
    if (Object.keys(rest).length !== 0) {
      for (const key in rest) {
        const fieldName = key.split('_')[0];
        const condition = key.split('_')[1];
        const value = rest[key];
        conditions.push({
          name: isCamel ? fieldName : this.camelToUnderscore(fieldName),
          condition: Array.isArray(value) ? 'in' : ((condition ?? 'eq') as any),
          value: value === 'true' ? true : value === 'false' ? false : value,
        });
      }
    }
    return conditions;
  };

  public camelToUnderscore(str: string) {
    return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  }

  public getSort = (order: string, sort: string) => {
    if (order == undefined || sort === undefined) return [];
    const orders = order.split(',');
    const sorts = sort.split(',');

    const sortValues = orders.map((o, index) => ({
      order: o.toString().toUpperCase(),
      sort: sorts[index], //this.camelToUnderscore(sorts[index]),
    }));

    return sortValues;
  };

  public findEntitiesWithCondition = async <ET extends BaseEntity>(
    params: any,
    repo: Repository<ET>,
  ): Promise<SelectQueryBuilder<ET>> => {
    const { _end, _start, _order, _sort, relations, ...rest } = params;

    const conditions = this.getCondtitons(rest);
    const queryBuilder = repo.createQueryBuilder(repo.metadata.targetName);
    conditions.forEach((condition) => {
      switch (condition.condition) {
        case 'eq':
          if (condition.value === true || condition.value === false)
            queryBuilder.andWhere(`${condition.name} = ${condition.value}`);
          else queryBuilder.andWhere(`${condition.name} = :value`, { value: condition.value });
          break;
        case 'ne':
          queryBuilder.andWhere(`${condition.name} != :value`, { value: condition.value });
          break;
        case 'gt':
          queryBuilder.andWhere(`${condition.name} > :value`, { value: condition.value });
          break;
        case 'lt':
          queryBuilder.andWhere(`${condition.name} < :value`, { value: condition.value });
          break;
        case 'gte':
          queryBuilder.andWhere(`${condition.name} >= :value`, { value: condition.value });
          break;
        case 'lte':
          queryBuilder.andWhere(`${condition.name} <= :value`, { value: condition.value });
          break;
        case 'like':
          queryBuilder.andWhere(`${condition.name} LIKE :value`, { value: `%${condition.value}%` });
          break;
        case 'in':
          queryBuilder.andWhere(`${condition.name} IN (:...values)`, { values: condition.value });
          break;
        case 'between':
          queryBuilder.andWhere(`${condition.name} BETWEEN :lower AND :upper`, {
            lower: condition.value.lower,
            upper: condition.value.upper,
          });
          break;
        default:
          queryBuilder.andWhere(`${condition.name} = :value`, { value: condition.value });
          break;
      }
    });

    this.getSort(_order, _sort).forEach(({ order, sort }) => {
      queryBuilder.orderBy(sort, order as any);
    });

    if (_start && _end) {
      queryBuilder.skip(_start);
      queryBuilder.take(_end);
    }

    return queryBuilder;
  };

  public getRelations(_relations?: string) {
    return _relations ? _relations?.split('_') : [];
  }

  async parseParams<T>(params: any): Promise<FindManyOptions<T>> {
    const { _end, _start, _order, _sort, c_limit, relations: _relations, ...rest } = params;
    const conditions = this.getCondtitons(rest, true);
    const whereCondition: FindOptionsWhere<T> = {};
    const order: FindOptionsOrder<T> = {};
    const relations: FindOptionsRelationByString | FindOptionsRelations<T> =
      this.getRelations(_relations);

    conditions
      .filter((conditions) => conditions.value !== '')
      .forEach((condition) => {
        switch (condition.condition) {
          case 'eq':
            if (
              typeof condition.value === 'string' &&
              condition.value.includes('lower') &&
              condition.value.includes('upper')
            ) {
              const cond = JSON.parse(condition.value);
              console.log(cond);
              whereCondition[condition.name] = Between(cond.lower, cond.upper);
            } else {
              whereCondition[condition.name] = Equal(condition.value);
            }

            break;
          case 'ne':
            whereCondition[condition.name] = Not(condition.value);
            break;
          case 'lt':
            whereCondition[condition.name] = LessThan(condition.value);
            break;
          case 'lte':
            whereCondition[condition.name] = LessThanOrEqual(condition.value);
            break;
          case 'gt':
            whereCondition[condition.name] = MoreThan(condition.value);
            break;
          case 'gte':
            whereCondition[condition.name] = MoreThanOrEqual(condition.value);
            break;
          case 'like':
            whereCondition[condition.name] = Like(`%${condition.value}%`);
            break;
          case 'ilike':
            whereCondition[condition.name] = ILike(`%${condition.value}%`);
            break;
          case 'between':
            whereCondition[condition.name] = Between(condition.value.lower, condition.value.upper);
            break;
          case 'in':
            whereCondition[condition.name] = In(condition.value);
            break;
          default:
            throw new Error(`Unsupported operation: ${condition.condition}`);
        }
      });

    const pagintaion =
      _start && _end
        ? {
            skip: _start,
            take: _end,
          }
        : {};

    this.getSort(_order, _sort).forEach(({ order: o, sort }) => {
      order[sort] = o;
    });

    return {
      where: whereCondition,
      ...pagintaion,
      order,
      relations,
    };
  }

  async readXlsxFile(file: string) {
    const filePath = join(__dirname, '..', file);
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const transformData = jsonData.map((question: any) => {
      const { Question, Answer, DetailAnswer, ...restQuestion } = question;
      const options = [];
      Object.keys(restQuestion).forEach((key) => {
        const isCorrect = key.toLocaleLowerCase() === Answer.toLocaleLowerCase();
        options.push({
          text: restQuestion[key],
          detailAnswer: isCorrect ? DetailAnswer : null,
          isCorrect: isCorrect,
          quizMcqId: 0,
        });
      });
      const quizMcq: any = {
        quizId: 0,
        text: Question,
        options: options,
      };
      return quizMcq;
    });
    return transformData;
    //return filePath;
  }

  async readXlsxQuestionFile(file: string, exerciseId: number) {
    const filePath = join(__dirname, '..', file);
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData.map(({ Question, Answer, Type }: any) => ({
      text: Question,
      answer: Answer,
      type: Type,
      exerciseId,
    }));
  }
}
