import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingServices {
  constructor() {}

  async hashKey(key: string): Promise<string> {
    return await bcrypt.hash(key, Number(process.env.SALT_ROUNDS));
  }

  async compareKeys(key: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(key, hashed);
  }
}
