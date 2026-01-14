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
    name: `RoleBaseAuth:${email}`,
    length: 20,
  });

  return {
    ascii: secret.ascii,
    hex: secret.hex,
    base32: secret.base32,
    otpauth_url: secret.otpauth_url!,
  };
}

  async generateQrCode(otpauthurl: string) {
    try {
      return await qrcode.toDataURL(otpauthurl);
    } catch (error) {
      throw new Error(`QR Code generation failed: ${error.message}`)
    }
  }

    buildOtpAuthUrl(email: string, secret: string): string {
    return speakeasy.otpauthURL({
      issuer: 'RoleBaseAuth',
      label: email,
      encoding: 'base32',
      secret,
    });
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
