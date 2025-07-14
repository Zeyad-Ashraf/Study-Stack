import { InjectModel } from '@nestjs/sequelize';
import { DbRepoServices } from './mainRepo';
import { SessionInfo } from '../models';
import { Model } from 'sequelize-typescript';

export class sessionsRepoServices extends DbRepoServices<SessionInfo> {
  constructor(
    @InjectModel(SessionInfo) private readonly sessionInfo: SessionInfo,
  ) {
    super(sessionInfo as unknown as typeof Model & typeof SessionInfo);
  }
}
