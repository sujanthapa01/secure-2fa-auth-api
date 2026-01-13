import {PrismaService} from "./prisma.service"
import { Module} from "@nestjs/common"
import {ConfigModule} from '@nestjs/config'

@Module({
    imports:[ConfigModule],
    providers:[PrismaService],
    exports:[PrismaService]
})

export class PrismaModule { }