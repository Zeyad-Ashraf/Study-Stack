import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminServices } from './admin.service';
import { Auth, EnumRole } from 'src/common';
import { createSessionDto } from './dto/adminDto';

@Controller()
export class AdminController {
  constructor(private readonly adminServices: AdminServices) {}

  @Post('addSession')
  @HttpCode(200)
  @Auth(EnumRole.admin)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addSession(@Body() data: createSessionDto): Promise<object> {
    return await this.adminServices.addSession(data);
  }
}
