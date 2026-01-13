import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';


type TAdmin = {
    AdminId: string
    name: string
    email: string
    role: string
    createdAt: Date
}


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * 
     * @param registerDto {email, password, name}
     * @returns 
     */

    async createAdmin(registerDto: RegisterDto): Promise<TAdmin> {
        const { email, password, name } = registerDto;

        if (!email || password) {
            throw new UnauthorizedException(`email and password is required`);
        }

        try {
            const hash = await bcrypt.hash(password, 10);

            const admin = await this.prisma.admin.create({
                data: {
                    name: name,
                    email: email,
                    password: hash,
                    role: 'ADMIN',
                },
            });

            return {
                AdminId: admin.adminId,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                createdAt: admin.createdAt,
            };
        } catch (error) {
            if (
                error instanceof ConflictException ||
                error instanceof BadRequestException
            ) {
                throw error;
            }

            throw new InternalServerErrorException(
                'omething went wrong while registering the admin',
            );
        }
    }
}
