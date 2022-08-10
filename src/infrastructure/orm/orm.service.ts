import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ORMRepository } from './orm.repository';
import { UsersDto } from './dtos/users.dto';
@Injectable()
export class ORMService implements ORMRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly ormService: Repository<UsersEntity>,
  ) {}

  public async findOneByEmail(email): Promise<UsersEntity> {
    const response = await this.ormService.findOne({ where: { email: email } });
    return response;
  }

  public async createOne(body: any): Promise<UsersEntity[]> {
    const newUser = await this.ormService.create({ ...body });
    const saveduser = await this.ormService.save(newUser);
    return saveduser;
  }

  public async updateOne(
    set: UsersDto,
    where: string,
    params: UsersDto,
  ): Promise<void> {
    this.ormService
      .createQueryBuilder()
      .update(UsersEntity)
      .set(set)
      .where(where, params)
      .execute();
    return;
  }
}
