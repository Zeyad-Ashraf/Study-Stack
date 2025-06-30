import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  EnumRole,
  eventEmitter,
  GenerateOtpObject,
  HashingServices,
  TokenService,
} from 'src/common';

import { StudentInformationRepo, User, UserRepoServices } from 'src/DB';

import {
  ConfirmEmailDto,
  ForgetPassDto,
  LoginDto,
  ResetPassDto,
  UserDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingServices: HashingServices,
    private readonly tokenService: TokenService,
    private readonly userModel: UserRepoServices,
    private readonly infoModel: StudentInformationRepo,
    private readonly otpService: GenerateOtpObject,
  ) {}

  async signUp(data: UserDto): Promise<object> {
    const { firstName, lastName, email, password, level } = data;
    if (!firstName || !lastName || !email || !password || !level)
      throw new BadRequestException('All fields are required');

    const findUser = await this.userModel.findOne({
      email,
    });

    // Generate a random OTP
    const otpObject = await this.otpService.createOtpObject();
    const hashedOtp = {
      otp: otpObject.otp,
      createdAt: otpObject.createdAt,
      expireAt: otpObject.expireAt,
    };

    if (findUser) {
      await this.userModel.findOneAndUpdateByEmail(
        { email },
        {
          otp: hashedOtp,
        },
      );

      eventEmitter.emit('CoverMail', {
        email,
        letter:
          'Some one tried to register with your email address, reset your password if it was not you.',
        subject: 'Cover Mail for Silent Register',
      });

      return { message: 'success' };
    }

    const hashedPassword = await this.hashingServices.hashKey(password);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp: hashedOtp,
    };

    const createdUser: User = await this.userModel.create(newUser);

    const studentInformation = {
      userId: createdUser.id as number,
      student_level: level as string,
    };

    await this.infoModel.create(studentInformation);

    eventEmitter.emit('otpMail', {
      otp: otpObject.nonHashedOtp,
      email,
      subject: 'Email Verification OTP',
      forWhat: 'confirm your email address',
    });

    return { message: 'success' };
  }

  async verifyEmail(data: ConfirmEmailDto): Promise<object> {
    const { email, otp } = data;
    if (!email || !otp)
      throw new BadRequestException('Email and OTP are required');

    const user = await this.userModel.findOne({
      email,
      confirmed: false,
    });

    if (!user)
      throw new NotFoundException('Email not found or already confirmed');

    if (
      !(await this.hashingServices.compareKeys(otp, user.otp.otp)) ||
      (user.otp.expireAt as Date) < new Date()
    )
      throw new BadRequestException('Invalid OTP');

    const updatedUser = await this.userModel.findOneAndUpdateByEmail(
      { email },
      {
        confirmed: true,
        otp: {
          otp: '',
          createdAt: null,
          expireAt: null,
        },
      },
    );

    if (!updatedUser)
      throw new NotFoundException('User not found or update failed');

    const access_token = await this.tokenService.generateToken(
      {
        id: updatedUser.id as number,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        secret: process.env.JWT_ACCESS_SECRET_USERS,
      },
    );
    const refresh_token = await this.tokenService.generateToken(
      {
        id: updatedUser.id as number,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        secret: process.env.JWT_REFRESH_SECRET_USERS,
      },
    );

    return { message: 'success', access_token, refresh_token };
  }

  async login(data: LoginDto): Promise<object> {
    const { email, password } = data;
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

    const user = await this.userModel.findOne({
      email,
      confirmed: true,
    });

    if (!user) {
      // used for avoiding Timing Attacks if the email is not found
      await this.hashingServices.hashKey(password);
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!(await this.hashingServices.compareKeys(password, user.password)))
      throw new UnauthorizedException('Invalid email or password');

    const Access_SECRET_KEY =
      user.role === EnumRole.admin
        ? process.env.JWT_ACCESS_SECRET_ADMIN
        : process.env.JWT_ACCESS_SECRET_USERS;

    const Refresh_SECRET_KEY =
      user.role === EnumRole.admin
        ? process.env.JWT_REFRESH_SECRET_ADMIN
        : process.env.JWT_REFRESH_SECRET_USERS;

    const access_token = await this.tokenService.generateToken(
      {
        id: user.id as number,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        secret: Access_SECRET_KEY,
      },
    );
    const refresh_token = await this.tokenService.generateToken(
      {
        id: user.id as number,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        secret: Refresh_SECRET_KEY,
      },
    );

    return { message: 'success', access_token, refresh_token };
  }

  async forgetPass(data: ForgetPassDto): Promise<object> {
    const { email } = data;

    // Generate a random OTP
    const otpObject = await this.otpService.createOtpObject();
    const hashedOtp = {
      otp: otpObject.otp,
      createdAt: otpObject.createdAt,
      expireAt: otpObject.expireAt,
    };

    await this.userModel.findOneAndUpdateByEmail(
      {
        email,
        confirmed: true,
      },
      {
        otp: hashedOtp,
        confirmed: false,
      },
    );

    eventEmitter.emit('otpMail', {
      otp: otpObject.nonHashedOtp,
      email,
      subject: 'Forget Password OTP',
      forWhat: 'Reset Password OTP',
    });

    return { message: 'success' };
  }

  async resetPass(data: ResetPassDto): Promise<object> {
    const { email, code, NewPass } = data;
    if (!email || !code || !NewPass)
      throw new BadRequestException('All Feilds Required');

    const user = await this.userModel.findOne({ email, confirmed: false });

    if (!user) {
      // to avoid Timing Attack
      await this.hashingServices.compareKeys(
        code,
        await this.hashingServices.hashKey(code),
      );
      return { message: 'success' };
    }

    if (!(await this.hashingServices.compareKeys(code, user.otp.otp)))
      throw new BadRequestException('Invalid OTP');

    await this.userModel.findOneAndUpdateByEmail(
      { email },
      {
        password: await this.hashingServices.hashKey(NewPass),
        confirmed: true,
        otp: {
          otp: '',
          createdAt: null,
          expireAt: null,
        },
      },
    );

    const Access_SECRET_KEY =
      user.role === EnumRole.admin
        ? process.env.JWT_ACCESS_SECRET_ADMIN
        : process.env.JWT_ACCESS_SECRET_USERS;

    const Refresh_SECRET_KEY =
      user.role === EnumRole.admin
        ? process.env.JWT_REFRESH_SECRET_ADMIN
        : process.env.JWT_REFRESH_SECRET_USERS;

    const access_token = await this.tokenService.generateToken(
      {
        id: user.id as number,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        secret: Access_SECRET_KEY,
      },
    );
    const refresh_token = await this.tokenService.generateToken(
      {
        id: user.id as number,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        secret: Refresh_SECRET_KEY,
      },
    );
    return { message: 'success', access_token, refresh_token };
  }

  // async resendOtp(data: ResendOTPDto): Promise<Object> {
  //   const { token } = data;
  //   if (!token) throw new BadRequestException('All Feilds Required');
  //   return { message: 'success' };
  // }
  // async refreshToken(data: ResetPassDto): Promise<object> {
  //   return { message: 'success', access_token };
  // }
}
