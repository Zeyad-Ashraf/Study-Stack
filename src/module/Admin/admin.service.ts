import { Injectable } from '@nestjs/common';
import { sessionsRepoServices } from 'src/DB/repo/sessionsRep';
import { createSessionDto } from './dto/adminDto';

@Injectable()
export class AdminServices {
  constructor(private readonly sessionRepository: sessionsRepoServices,

  ) {}

  async addSession(data: createSessionDto): Promise<object> {
    const uploadSession = await 
  }
}
