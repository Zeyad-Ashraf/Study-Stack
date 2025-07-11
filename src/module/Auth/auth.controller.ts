import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  ConfirmEmailDto,
  ForgetPassDto,
  LoginDto,
  ResetPassDto,
  UserDto,
} from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signUp(@Body() data: UserDto): Promise<object> {
    return await this.authService.signUp(data);
  }

  @Post('confirmEmail')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async confirmEmail(@Body() data: ConfirmEmailDto): Promise<object> {
    return await this.authService.verifyEmail(data);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() data: LoginDto): Promise<object> {
    return await this.authService.login(data);
  }

  @Post('forgetPass')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async forgetPassword(@Body() data: ForgetPassDto): Promise<object> {
    return await this.authService.forgetPass(data);
  }

  @Post('resetPass')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async ResetPass(@Body() data: ResetPassDto): Promise<object> {
    return await this.authService.resetPass(data);
  }

  @Post('refreshToken')
  @HttpCode(200)
  async refreshToken(@Req() req: Request): Promise<object> {
    return await this.authService.refreshToken(req);
  }
}
