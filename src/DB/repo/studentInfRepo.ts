import { InjectModel } from '@nestjs/sequelize';
import { StudentInformation } from '../models/StudentInformation.model';
import { DbRepoServices } from './mainRepo';
import { Model } from 'sequelize-typescript';

export class StudentInformationRepo extends DbRepoServices<StudentInformation> {
  constructor(
    @InjectModel(StudentInformation)
    private readonly StudentModel: typeof StudentInformation,
  ) {
    super(StudentModel as unknown as typeof Model & typeof StudentInformation);
  }
}
