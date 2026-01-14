# RoleBaseLogin — Secure Login Backend

A focused NestJS + Prisma backend implementing a secure login system with email/password authentication, TOTP two-factor authentication (2FA), QR code (otpauth) generation for authenticator apps, and JWT issuance.

## Key capabilities
- Email + password authentication (secure hashing & validation)  
- TOTP-based 2FA (RFC 6238 compatible)  
- QR code / otpauth URL generation for authenticator apps  
- OTP verification required before completing login  
- JWT access & refresh token issuance on successful authentication

## Watch — Test & Run Tutorial
<p>
<a href="https://youtu.be/OMe6xf62FTA?si=ptwydQtfAS5gyp06" target="_blank" rel="noopener noreferrer" aria-label="Watch the RoleBaseLogin tutorial">
  <img src="https://img.youtube.com/vi/OMe6xf62FTA/hqdefault.jpg" alt="RoleBaseLogin tutorial" style="max-width:560px;width:100%;height:auto;border:1px solid #ddd" />
</a>
</p>
(Click the thumbnail to open the tutorial on YouTube.)

## Login flow (step-by-step)
1. Client submits email + password to `/auth/login`.  
2. Server validates credentials; if 2FA is enforced or being set up, server returns a pending-login state or an otpauth URL for setup.  
3. Client displays the QR (otpauth URL) for setup or prompts the user to enter a TOTP.  
4. Client submits TOTP to `/auth/verify-otp`.  
5. Server verifies the OTP; on success, server issues:
   - short-lived JWT access token
   - longer-lived refresh token

## Quick start
- Install:
```bash
pnpm install
```
- Configure:
```bash
cp .env.example .env
# set DATABASE_URL and JWT_SECRET in .env
```
- Run dev:
```bash
pnpm run start:dev
```
- Run tests:
```bash
pnpm run test
```

## Required environment variables
- DATABASE_URL — Prisma database connection string  
- JWT_SECRET — secret for signing access/refresh tokens

## Login-related project structure
- src/auth/
  - auth.controller.ts        — login & OTP endpoints  
  - auth.service.ts           — credential validation & session flow  
  - twofactor.service.ts      — TOTP generation, verification, otpauth URL / QR helpers  
  - jwt.service.ts            — access & refresh token helpers  
  - dto/                      — request/response DTOs  
- prisma/
  - schema.prisma             — user and auth-related models  
- test/
  - auth/                     — tests for login & 2FA flows

## Notes
- TOTP is compatible with common authenticator apps (Google Authenticator, Authy).  
- Server generates an otpauth:// URL which can be rendered as a QR image client- or server-side.  
- OTP verification is required before issuing JWTs to ensure 2FA is enforced.

## Credits
- Author & tutorial: [sujanthapa01](https://github.com/sujanthapa01) — video tutorial linked above.

License: MIT
