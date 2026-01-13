import { Injectable,UnauthorizedException } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service"
import {RegisterDto} from "./dto/register.dto"

@Injectable()
export class AuthService {

constructor(private prisma: PrismaService){} 
 
async registerUser(registerDto: RegisterDto){
 const {email, password} = registerDto;

 if(!email || password){
    throw new UnauthorizedException(`Email and Password is required`)
 }

const user = 

}

}
