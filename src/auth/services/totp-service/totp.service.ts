import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

interface TOTPSecret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

@Injectable()
export class TotpService {
  generateSecret(email: string): TOTPSecret {
    const secret = speakeasy.generateSecret({
      name: `my_app {${email}`,
      length: 20,
    });
    return secret;
  }

  generateQrCode(otpauthurl: string) {
    return qrcode.toDataUrl(otpauthurl);
  }

  /**
   *
   * @param secret totpSecret
   * @param token
   * @returns
   */
  verifyOtp(secret: string, token: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}
