import {PrismaService} from "./prisma.service"
import {Global, Module} from "@nestjs/common"

@Module({
    providers:[PrismaService],
    exports:[PrismaService]
})

export class PrismaModule { }