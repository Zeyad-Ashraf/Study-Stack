import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models';
import { DbRepoServices } from './mainRepo';
import { Model } from 'sequelize-typescript';

export class UserRepoServices extends DbRepoServices<User> {
  constructor(
    @InjectModel(User)
    private readonly UserModel: typeof User,
  ) {
    super(UserModel as unknown as typeof Model & typeof User);
  }
}
