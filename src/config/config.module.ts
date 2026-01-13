import { envValidationSchima } from "./env.validation"
import superAdminConfig from "./super-admin.config"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [superAdminConfig],
            validationSchema: envValidationSchima
        })
    ]
})

export class AppConfigModule {}