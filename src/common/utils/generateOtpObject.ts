import { Injectable } from '@nestjs/common';
import { HashingServices } from '../security';

interface OtpInterface {
  nonHashedOtp: string;
  otp: string;
  createdAt: Date;
  expireAt: Date;
}

@Injectable()
export class GenerateOtpObject {
  constructor(private readonly hashingService: HashingServices) {}

  async createOtpObject(): Promise<OtpInterface> {
    const otp = Math.random().toString(36).slice(2, 8);
    const now = new Date();
    const hashedOtp = await this.hashingService.hashKey(otp);

    return {
      nonHashedOtp: otp,
      otp: hashedOtp,
      createdAt: now,
      expireAt: new Date(now.getTime() + 10 * 60 * 1000), // 10 minutes expiration
    };
  }
}
