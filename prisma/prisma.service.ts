// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly config: ConfigService) {
        const dbUrl = config.get<string>('db.url')
        if (!dbUrl) {
            throw new Error('Missing DATABASE_URL environment variable!');
        }

        // Correct way: pass connection string directly to adapter
        const adapter = new PrismaPg({ connectionString: dbUrl });

        super({ adapter});
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
