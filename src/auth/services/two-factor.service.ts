import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFactorService {
  generateSecret(username: string) {
    return speakeasy.generateSecret({
      name: `Lanakod's Blog - ${username}`,
    });
  }
  async generateQrCode(url: string) {
    const qrcodeImage = await qrcode.toDataURL(url);
    return { image: qrcodeImage };
  }
  async verifyToken(secret: string, token: string) {
    const isValid = speakeasy.totp.verify({
      secret,
      token,
      encoding: 'ascii',
    });
    return { isValid };
  }
}
