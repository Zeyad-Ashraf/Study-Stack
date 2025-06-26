import { ConflictException, Injectable } from '@nestjs/common';
import { HashingServices, TokenService } from 'src/common';
import { StudentInformationRepo, User, UserRepoServices } from 'src/DB';
import { UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingServices: HashingServices,
    private readonly tokenService: TokenService,
    private readonly userModel: UserRepoServices,
    private readonly infoModel: StudentInformationRepo,
  ) {}

  async signUp(data: UserDto): Promise<object> {
    const { firstName, lastName, email, password, level } = data;
    const findUser = await this.userModel.findOne({
      email,
    });

    if (findUser) throw new ConflictException('User already exists');

    const hashedPassword = await this.hashingServices.hashKey(password);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const createdUser: User = await this.userModel.create(newUser);

    const studendInformation = {
      userId: createdUser.id as number,
      student_level: level as string,
    };

    await this.infoModel.create(studendInformation);

    return { message: 'Success' };
  }
}
