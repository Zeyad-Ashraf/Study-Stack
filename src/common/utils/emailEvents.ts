import { sendEmailService } from '../services/nodeMailer';
import { EventEmitter } from 'events';
import {
  htmlTemplateForConfirmation,
  htmlTemplateForSlientRegister,
} from '../templates';

export const eventEmitter = new EventEmitter();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
eventEmitter.on('otpMail', async ({ otp, email, subject, forWhat }) => {
  const html = htmlTemplateForConfirmation(otp, subject, forWhat);
  try {
    await sendEmailService({
      to: email as string,
      subject: subject as string,
      html: html,
    });
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
eventEmitter.on('CoverMail', async ({ email, letter, subject }) => {
  const html = htmlTemplateForSlientRegister(letter, subject);
  try {
    await sendEmailService({
      to: email as string,
      subject: subject as string,
      html: html,
    });
  } catch (error) {
    console.error('Error sending Mail:', error);
  }
});
