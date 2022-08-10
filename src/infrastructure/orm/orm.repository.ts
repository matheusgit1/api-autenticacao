import { UsersEntity } from './entities/users.entity';
import { UsersDto } from './dtos/users.dto';

export interface ORMRepository {
  findOneByEmail: (email) => Promise<UsersEntity>;
  createOne: (body: UsersEntity) => Promise<UsersEntity[]>;
  updateOne(set: UsersDto, where: string, params: UsersDto): Promise<void>;
}
